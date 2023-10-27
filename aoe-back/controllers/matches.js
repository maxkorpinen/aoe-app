const router = require('express').Router()
const fs = require('fs')

router.get('/winsagainst/', async(req, res)=> {
  const {civ1, civ2} = req.query
  console.log("CIVIT: ",civ1,civ2)
  console.log('Current directory: ' + process.cwd());
  var matchResults = JSON.parse(fs.readFileSync('./data/result.json', 'utf8'))
  let res1 = matchResults[civ1][civ2]
  let res2 = matchResults[civ2][civ1]
  res.send({'civ1wins':res1, 'civ2wins':res2})
})

/* router.get(':civ/:civ2', async (req, res) => {

}) */

module.exports = router