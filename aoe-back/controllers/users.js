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
  // VAADI TOKENIA
  const { username, token, favciv } = req.body
  let doc = await User.findOneAndUpdate({username: username}, {favciv: favciv})
  doc = await User.findOne({username:username})
  //miten saadaan virheet kiinni ts jos ei onnistu nii lähetä jotain muuta?
  res.status(200) 
})

module.exports = usersRouter