const router = require('express').Router()
const User = require('../schemas/user')

router.post('/reset', async (req, res)=> {
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = router