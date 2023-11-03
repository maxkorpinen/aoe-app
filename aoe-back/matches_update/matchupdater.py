import pandas as pd
import requests
from functools import reduce
import time
import json
from pathlib import Path

##
# 1. Hakee tiedoston johon on listattu eri dumpit matseista ja mistä nämä saa
# 2. Filtteröi muut kuin uusimman dumpin tiedot
# 3. Hakee ja tallentaa uusimmat players.parquet ja matches.parquet tiedostot
# 4. Lukee kirjoitetut tiedostot ja muodostaa niistä result.json tiedoston
# 5. Siirtää result.jsonin data kansioon ja ylikirjoittaa vanhan result.jsonin
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

res = requests.get(playersUrl)
with open(players_parq_loc, mode="wb") as file:
    file.write(res.content)

res = requests.get(matchesUrl)
with open(matches_parq_loc, mode="wb") as file:
    file.write(res.content)

##
# Luodaan json tiedosto
##
players = pd.read_parquet(players_parq_loc)
matches = pd.read_parquet(matches_parq_loc)

allcivs = players["civ"].unique()
solomatches = matches[matches["num_players"] <= 2]
soloplayers = players[players["game_id"].isin(solomatches.game_id)].sort_values(
    by=["game_id"]
)
solop = soloplayers.drop_duplicates(subset=("game_id", "civ"), keep=False)
solop = solop.reset_index()

dic = dic_creation(allcivs)

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

with open("result.json", "w") as fp:
    json.dump(dic, fp, indent=2)

Path("./result.json").replace("../data/result.json")


# Lokitetaan päivitys
date_range = newest["start_date"] + " - " + newest["end_date"]
curr_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
with open("../matches_update/updater_log.txt", "a+") as file:
    file.write(
        "Date range of matches:" + date_range + ". Time of writing: " + curr_time + "\n"
    )

print("end: ", time.time() - start_time)
