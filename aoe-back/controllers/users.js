const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

const getTokenFrom = request => {
  const auth = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

usersRouter.put('/', async (req, res, next) => {
  // VAADI TOKENIA
  const { username, token, favciv } = req.body
  const decoToken = jwt.verify(getTokenFrom(req), process.env.SEKRET)
  if (!decodedToken.id) {
    return response.status(401).json({error:"invalid token"})
  }

  let doc = await User.findOneAndUpdate({username: username}, {favciv: favciv})
  doc = await User.findOne({username:username})
  //miten saadaan virheet kiinni ts jos ei onnistu nii lähetä jotain muuta?
  res.status(200) 
})

module.exports = usersRouter