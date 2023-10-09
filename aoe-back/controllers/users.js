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

usersRouter.put('/', async (req, res, next) => {
  const { username, token, favciv } = req.body

  /* User.find({username:username}).then(result => {
    console.log("usersrouter put",result)
  }) */
  let doc = await User.findOneAndUpdate({username: username}, {favciv: favciv})
  console.log(doc)
  doc = await User.findOne({username:username})
  console.log(doc)
})

module.exports = usersRouter