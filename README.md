# AoE2 guide app


Aim of developing app was to create a project that would

1. Test my ability to produce a coherent website using react + node.js, including all the usual cicd stuff.

2. A compact UI. Ie minimize button presses to get to the core function of the app.

App itself attempts to: 
Help lower elo players in Age of Empires II, by giving simple unit instructions.

Tips and guides ought to be served in a:

- simple, easily understandable format
- Usable without preparation
  - Core use case is when a player enters a map loading screen and sees the opponents civilization, the player using Aoe-app can click two buttons and see what units approximately ought to be built and what units the opponent is likely to build

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