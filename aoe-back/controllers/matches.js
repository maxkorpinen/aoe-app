const router = require('express').Router()
const fs = require('fs')

router.get('/winsagainst/', async(req, res)=> {
  const {civ1, civ2} = req.query
  var matchResults = JSON.parse(fs.readFileSync('./data/result.json', 'utf8'))
  let res1 = matchResults[civ1][civ2]
  let res2 = matchResults[civ2][civ1]
  res.send({'civ1wins':res1, 'civ2wins':res2})
})

module.exports = router