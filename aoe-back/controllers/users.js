const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../schemas/user')

usersRouter.post('/', async (req, res, next) => {
  const {username, password} = req.body
  const saltrounds = 10
  const passwordHash = await bcrypt.hash(password, saltrounds)
  const user = new User({
    username,
    passwordHash
  })
  /* const savedUser = await user.save().catch(err => {
    console.log("username taken")
    res.status(400).json({
      error: 'username taken'
    })
    return
  }) */

  const savedUser = await user.save().catch(err => next(err))
  res.status(201).json(savedUser)
})

module.exports = usersRouter