import pandas as pd
import requests
from functools import reduce
import time
import json
from pathlib import Path
import pyarrow as pa
import pyarrow.parquet as pq

##
# 1. Hakee tiedoston johon on listattu eri dumpit matseista ja mistä nämä saa
# 2. Filtteröi muut kuin uusimman dumpin tiedot
# 3. Hakee ja tallentaa uusimmat players.parquet ja matches.parquet tiedostot
# 4. Lukee kirjoitetut tiedostot ja muodostaa niistä result.json tiedoston
# 5. Siirtää result.jsonin data kansioon ja ylikirjoittaa vanhan result.jsonin
# 6. Kirjoittaa updater_log.txt:iin päivityslokin
##
start_time = time.time()


# alustaa dictin johon asetetaan tulokset
def dic_creation(allcivs):
    ret = {}
    for civ in allcivs:
        ret[civ] = dict(zip(allcivs, [0] * len(allcivs)))
    return ret


matches_parq_loc = "../data/matches.parquet"
players_parq_loc = "../data/players.parquet"
url = "https://aoestats.io/api/db_dumps"  # Viikottaiset dumpit matseista
dumpsres = requests.get(url)
dumpsd = dumpsres.json()["db_dumps"]


def datecomp(a, b):
    if a["start_date"] > b["start_date"]:
        return a
    return b


newest = reduce(datecomp, dumpsd)

playersUrl = "https://aoestats.io" + newest["players_url"]
matchesUrl = "https://aoestats.io" + newest["matches_url"]

chunk_size = 1000
res = requests.get(playersUrl, stream=True)
with open(players_parq_loc, mode="wb") as file:
    for chunk in res.iter_content(chunk_size=chunk_size):
        file.write(chunk)

res = requests.get(matchesUrl, stream=True)
with open(matches_parq_loc, mode="wb") as file:
    for chunk in res.iter_content(chunk_size=chunk_size):
        file.write(chunk)

matchesparquet_file = pq.ParquetFile(matches_parq_loc)
matches = set()
switch = 0
for batch in matchesparquet_file.iter_batches(batch_size=chunk_size):
    chunk_df = pa.Table.from_batches([batch]).to_pandas(
        split_blocks=True, self_destruct=True
    )
    ids = chunk_df[chunk_df["num_players"] <= 2].game_id
    matches = matches.union(set(ids))

parquet_file = pq.ParquetFile("../data/players.parquet")
players = ""
switch = 0
for batch in parquet_file.iter_batches(batch_size=chunk_size):
    chunk_df = pa.Table.from_batches([batch]).to_pandas(
        split_blocks=True, self_destruct=True
    )
    if switch == 0:
        players = chunk_df[chunk_df["game_id"].isin(matches)]
        switch = 1
    else:
        players = pd.concat([players, chunk_df[chunk_df["game_id"].isin(matches)]])
players = players.sort_values(by=["game_id"])
players = players.drop_duplicates(subset=("game_id", "civ"), keep=False)
players = players.reset_index()

allcivs = players["civ"].unique()
dic = dic_creation(allcivs)
del allcivs
soloplayers = players[players["game_id"].isin(matches)].sort_values(by=["game_id"])

del players, matches
solop = soloplayers.drop_duplicates(subset=("game_id", "civ"), keep=False)
solop = solop.reset_index()

for i in range(0, len(solop.game_id), 2):
    first = solop.iloc[i]
    snd = solop.iloc[i + 1]
    if first.game_id != snd.game_id:
        print("ERROR, game ids don't match")
        break
    if first.winner:
        dic[first.civ][snd.civ] = dic[first.civ][snd.civ] + 1
    else:
        dic[snd.civ][first.civ] = dic[snd.civ][first.civ] + 1
del solop
with open("result.json", "w") as fp:
    json.dump(dic, fp, indent=2)

Path("./result.json").replace("../data/result.json")

# Lokitetaan päivitys
date_range = newest["start_date"] + " - " + newest["end_date"]
curr_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
with open("../matches_update/updater_log.txt", "a+") as file:
    file.write(
        "Date range of matches: "
        + date_range
        + ". Time of writing: "
        + curr_time
        + "\n"
    )

print("end: ", time.time() - start_time)
