# AoE2 guide app


Aim of developing app was to create a project that would

1. Test my ability to produce a coherent website using react + node.js, including all the usual cicd stuff.

2. Very a very usable UI. Ie minimize button presses to get to the core of the app.

Currently ...


App itself attempts to: 
Ohjelma pyrkii auttamaan keskitasoista tai tätä huonompaa pelaajaa Age of Empires II pelissä, tarjoamalla yksinkertaisia ohjeita.

Vinkit ja ohjeet halutaan tarjota:

- yksinkertaisessa, helposti ymmärrettävässä muodossa
- mahdollista käyttää ilman pelaajan ennakkovalmistelua
  - esim. kun pelaaja näkee vastustajansa valitseman civin, niin tiedon syöttäminen on yksinkertaista, ja ohjelma tarjoaa välittömästi ohjeita järkevässä aikajärjestyksessä
- Käytännössä siis halutaan antaa karkeita ohjeita mitä yksiköitä tulisi valmistaa, ja miten vastustajan yksikkövalintoihin tulisi reagoida yleisimmissä tapauksissa.

## Instructions

Valitsemalla yhden sivilisaation ja valitsemalla tämän jälkeen "Analyse with chosen specs" ohjaa sivulle jossa näytetään sivilisaation tehokas yksikkö ja muutama vaihtoehto tukevaksi yksiköksi.

Valitsemalla kaksi sivilisaatiota sivu näyttää vasemmalla ensimmäiseksi valitun sivilisaation tehokkaan yksikön, oikealla seuraavaksi valitun. Näitten alla on molempien osapuolten tukiyksiköt, ehdotukset huomioivat vastustajan tehokkaan yksikön. Sivu näyttää myös voittoprosentit sivilisaatioiden välillä 1v1 peleissä.

Uuden käyttäjän voi luoda suunnistamalla "Login or create new user" napista. Sivulta Userinfo voi valita suosikkisivilisaation itsellensä. Uusi valinta korvaa vanhan. Samalta sivulta voi myös poistaa käyttäjänsä.

About sivulla kerrotaan mistä voittoprosenttitilastot on kerätty ja miltä ajalta näytetyt tilastot ovat.

Ohjelma tarjoaa vivun voittoprosenttitilastojen päivittämiselle. Se tapahtuu lähettämällä GET osoitteeseen '/api/update'. Viestin sisällössä tulee olla avain "UPDATE_SECRET", jonka arvo on envissä asetettu halutuksi. Helpohko tapa kokeilla tätä on käyttää aoe-back/utils/requests/updateMatches.http tiedostoa, ja https://marketplace.visualstudio.com/items?itemName=humao.rest-client linkin vscode plugaria. UpdateMatchesiin on jätetty fly.io:ssa toimiva UPDATE_SECRET.

Matsit päivitetään erillisellä python scriptillä, koska ohjelman tekijä ei löytänyt kätevää, yhä päivitettyä kirjastoa tai muuta tapaa käsitellä .parquet tiedostoja javascriptillä.

## Other stuff
Unit rankings from https://aoe2-de-tools.herokuapp.com/civ-ranking/
Vs win percentages from https://aoestats.io/api-info/ 