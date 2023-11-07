# Fullstack open - projekti

Ohjelma käynnissä osoitteessa https://fso-aoe.fly.dev/

## AoE2 guide app

Ohjelma pyrkii auttamaan keskitasoista tai tätä huonompaa pelaajaa Age of Empires II pelissä, tarjoamalla yksinkertaisia ohjeita.

Vinkit ja ohjeet halutaan tarjota:

- yksinkertaisessa, helposti ymmärrettävässä muodossa
- mahdollista käyttää ilman pelaajan ennakkovalmistelua
  - esim. kun pelaaja näkee vastustajansa valitseman civin, niin tiedon syöttäminen on yksinkertaista, ja ohjelma tarjoaa välittömästi ohjeita järkevässä aikajärjestyksessä
- Käytännössä siis halutaan antaa karkeita ohjeita mitä yksiköitä tulisi valmistaa, ja miten vastustajan yksikkövalintoihin tulisi reagoida yleisimmissä tapauksissa.

## Käyttöohje

Ohjelma tarjoaa vivun ottelutilastojen päivittämiselle. Se tapahtuu lähettämällä GET osoitteeseen '/api/update'. Viestin sisällössä tulee olla avain "UPDATE_SECRET", jonka arvo on envissä asetettu halutuksi.

Matsit päivitetään erillisellä python scriptillä, koska ohjelman tekijä ei löytänyt kätevää, yhä päivitettyä, kirjastoa tai tapaa käsitellä .parquet tiedostoja javascriptillä.

## työaikakirjanpito

| päivä | aika | mitä tein                 |
| :---: | :--- | :------------------------ |
| 28.8. | 1.5  | projektin alustus yms     |
| 29.8. | 0.5  | ui pohdinta               |
|       | 1    | nappihommat ja sivu       |
|       | 0.5  | matchup+ui pohdinta       |
|       | 0.5  | suunnittelu               |
| 5.09. | 1.5  | yksikköikonien säätö      |
| 6.9.  | 0.5  | cypress                   |
| 6.9.  | 0.5  | cypress                   |
|  7.9  | 1.0  | mongo kanssasäätö         |
|       |      |                           |
| 11.9  | 5    | backin refaktorointi      |
|       |      | middlewarejudduja         |
|       |      | civit mongosta            |
|       | 0.5  | front korjailua           |
|       |      |                           |
| 14.9  | 3.5  | pari yksikkökuvaa,        |
|       |      | counterit näkyviin &      |
|       |      | yksikköarvoja             |
|       |      |                           |
| 17.9  | 2.5  | bäkkärin refaktorointia   |
|       |      | yms mongon pläräämistä    |
| 19.9  | 1.5  | backendtestejä            |
|       |      |                           |
| 22.9  | 2    | lisää backtestisäätöä     |
|       | 2    | workflown näperrys        |
|       |      |                           |
| 25.9  | 4    | github actionsin säätöä   |
|       |      | test fail -> pipefail.    |
|       | 0.5  | suunnittelu               |
|       |      |                           |
| 27.9  | 2    | Fly deployment on         |
| 28.9  | 2    | vaikeaa, jos on           |
| 29.9  | 1    | huolimaton                |
|       |      |                           |
| 2.10  | 1    | suunnittelu               |
|       | 5.25 | front matchup +           |
|       |      | refaktorointi             |
|       |      |                           |
| 3.10  | 0.5  | bugien korjailua          |
|       | 2.25 | refaktorointia, matchup   |
|       |      | supunit paremmin          |
|       | 2    | suunnittelu, matchup      |
|       |      | säätö jatkuu              |
|       |      |                           |
| 5.10  | 1    | reduxsäätö                |
|       |      |                           |
| 6.10  | 3    | reduxseikkailu jatkuu     |
|       | 0.75 | fronttisäätö              |
|       |      |                           |
| 9.10  | 7.5  | kirjautumissällää ja      |
|       |      | frontin loputon           |
|       |      | refaktorointi             |
|       |      |                           |
| 10.10 | 4    | frontin korjailua         |
|       |      | ja middlewaresäätöä       |
|       |      |                           |
| 11.10 | 4    |                           |
|       |      |                           |
| 17.10 | 3    | miten parquet tiedostoja  |
|       |      | luetaan jäsällä           |
|       |      |                           |
| 23.10 | 3    | parquetin pläräämistä     |
|       |      | pythonilla                |
|       |      |                           |
| 24.10 | 2    | matsidatan säätöä         |
|       |      |                           |
| 26.10 | 3    | Matchup win% fronttiin    |
|       |      |                           |
| 30.10 | 4    | Deploaminen onnistuu      |
|       |      | actionsista. Matsidatan   |
|       |      | päivittämisjuttuja        |
|       |      |                           |
| 31.10 | 3    | Matchupdater              |
|       |      |                           |
| 02.10 | 5    | Matchupdater jatkuu       |
|       |      |                           |
| 03.10 | 1.5  | Matchupdater viimeistely. |
|       | 3    | librematch.org tutkailu,  |
|       |      | suunnittelu, lokitus      |
|       |      |                           |
| 6.10  | 3.5  | frontin refaktorointi     |
|       |      |                           |
| 7.10  |      |                           |
|       |      |                           |

Yht: 97.25h 6.10. mennessä

## Muu

Yksiköitten rankingit kerätty https://aoe2-de-tools.herokuapp.com/civ-ranking/
Sivilisaatioiden väliset voittotilastot kerätty https://aoestats.io/api-info/
