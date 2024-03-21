require('dotenv').config()
const { spawn } = require('child_process')
const { getLastUpdate } = require('../utils/helpfuncs')
const fs = require('fs')
const Winstat = require('../schemas/winstats')
const router = require('express').Router()
const Civ = require('../schemas/civ')

router.get('/winsagainst/', async (req, res) => {
  res.send({ 'civ1wins': 'res1', 'civ2wins': 'res2' })
})

router.get('/update/', async (req, res) => {
  if (!process.env.UPDATE_SECRET === req.body.UPDATE_SECRET) {
    return res.status(401)
  }
  const pythonProcess = spawn('python', ['../matches_update/matchupdater.py'], {
    cwd: __dirname,
  });

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data}`)
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`)
  });
  
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`)
    if (code === 0) {
      //save the data to mongo
      const fsp = require('fs').promises
      fsp.readFile('./data/result.json', 'utf8')
      .then(data => {
        const jsonData = JSON.parse(data)
        const wins = new Winstat({
          data: data
        })
        return wins.save()
      })
      .then(result => {
        console.log("Save result:", result)
        res.status(201).json({"status": "ok"})
      })
      .catch(err => {
        console.error('An error occurred:', err)
        res.status(500).send('Error with saving the data')
      })
      //
      res.status(200).send('Python script completed successfully')
    } else {
      res.status(500).send('Python script failed')
    }
  })
  res.send('/update is called')
})

router.get('/updatetest/', async (req, res) => {
  console.log("TESTGO")
  //const id1 = req.params.id1
  //const id2 = req.params.id2
  /* Winstat.find({}).then(stats => {
    dada = JSON.parse(stats[0].data)
  //  console.log("statten: ",dada['hindustanis'])
  //  console.log("tpye:", typeof(dada))
  }) */
  const data = await Winstat.find({})
  const civ1 = await Civ.find({ _id:id1})
  const civ2 = await Civ.find({ _id:id2})
  const dada = JSON.parse(data[0].data)
  console.log(data)
  console.log(civ1,civ2)
  
  /* const fsp = require('fs').promises
  fsp.readFile('./data/result.json', 'utf8')
  .then(data => {
    const jsonData = JSON.parse(data)
    const wins = new Winstat({
      data: data
    })
    return wins.save()
  })
  .then(result => {
    console.log("Save result:", result)
    res.status(201).json({"status": "ok"})
  })
  .catch(err => {
    console.error('An error occurred:', err)
  }) */
})

router.get('/version', async (req, res) => {
  let version = await getLastUpdate()
  res.send({ 'version': version })
})

module.exports = router