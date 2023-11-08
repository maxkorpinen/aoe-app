## Featureita

- oma buildorder tekstimuodossa, tallennettuna käyttäjään?

- näytä matsidatan versio ts miltä aikaväliltä ja millä spekseillä se data näytetään ja mistä se on haettu

## Tehtäviä juttuja

- Miksi testit feilaa actionssissa mutta menee läpi omalla koneella?
  -> tsekkaa jumittaa ne vaan että pitääkö laittaa lisää waittia tms

  - AxiosError: The following error originated from your application code, not from Cypress. It was caused by an unhandled promise rejection.
    > Request failed with status code 404
    > !!!!-> testit actionssissa käyttänee fso-aoe-test kantaa jossa ei ole tuota annettua käyttäjää, joten varmista että se on siellä ennen testejä + korjaa loginservicen bugi

- BUGI: loginservice kippaa jos yrittää tehdä samalla nimellä uuden akkon

- eslint

- tee enemmän testejä

  - uus käyttäjätesti miten kannattaa tehdä?
  - muutenkin testihommien vieminen omaan testikantaan?

- varmista että matchupissa näytettävät supportunitit tulee oikein
