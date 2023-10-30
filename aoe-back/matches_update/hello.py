import pyarrow.parquet as pa
import pandas as pd
import time

matches = pd.read_parquet('matches.parquet')
players = pd.read_parquet('players.parquet')
allcivs = players['civ'].unique()
#print(allcivs, type(allcivs))
print("matches columns:",list(matches.columns.values))
print("players columns:",list(players.columns.values))
""" solomatches = matches[matches['num_players'] <= 2]
soloplayers = players[players['game_id'].isin( solomatches.game_id)]

#eth = soloplayers[soloplayers['civ'] =='ethiopians']
start = time.time()
print(start)
i = 0
for match in solomatches.game_id:
  ps = soloplayers[soloplayers['game_id']==match]
  i += 1
  if i == (len(solomatches.game_id)/10):
    print("--- %s seconds ---" % (time.time() - start))
    break """
atsteekkipelaajaidt = players[players['civ']=='aztecs'].game_id
print(players[players['game_id']isin(atsteekkipelaajaidt) & players['civ']=='hindustanis'])
  
  
""" print(eth.game_id)
print(eth.game_id.unique())
print("---------------")
print(len(eth.game_id))
print(len(eth.game_id.unique()))
# NOI ON ERI NUMEROT KOSKA MIRRORIT EAEAEAEA
# poistetaan mirrorit tiputtamalla kaikki rivit joista duplikaatti
eth = eth.drop_duplicates(subset=('game_id'), keep=False)
print(eth.game_id)
print("-------------")
print(eth.head()) """
""" i = 0
non_unique_eth_game_id = list(eth.game_id)
for uid in eth.game_id.unique():
  nuid = non_unique_eth_game_id[i]
  if nuid != uid:
    print("i:",i," ",nuid, " - ",uid)
  i += 1
  if i> 110:
    break
print("---------------")
print(eth[eth['game_id']=='250717613'])
print(eth.game_id.duplicated().value_counts()) """

#df.drop_duplicates(subset=['A', 'C'], keep=False)
#df2 = df[df['Courses'].duplicated() == True]
#kakka = eth[eth.duplicated('game_id')]
#print(kakka)
#print(kakka[kakka['game_id']=="250838306"])
#print(players[players['civ']=='ethiopians'])
#print(players.iloc[1])
#print(matches.iloc[4])

""" print("hello from pypypy")
f = open('pytthon.txt', "w+")
for i in range(10):
  f.write("This is line %d\r\n" % (i+1))
f.close() """

