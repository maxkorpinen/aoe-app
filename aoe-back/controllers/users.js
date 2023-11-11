const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../schemas/user')

const { userExtractor } = require('../utils/middleware')

usersRouter.post('/', async (req, res, next) => {
  const {username, password} = req.body
  const saltrounds = 10
  const passwordHash = await bcrypt.hash(password, saltrounds)
  const user = new User({
    username,
    passwordHash
  })
  user.save().then(result => {
    res.status(201).json({username:result.username})
  }).catch(err => {
    next(err)
  })
})

usersRouter.put('/', userExtractor, async (req, res, next) => {
  const { username, token, favciv } = req.body
  console.log("username:", username, " token:", token, " favciv:", favciv, " req.token", req.token)
  if (!req.token) {
    console.log("no token")
    return res.status(401).json({error:"invalid token"})
  }

  let doc = await User.findOneAndUpdate({username: username}, {favciv: favciv})
  doc = await User.findOne({username:username})
  res.status(200).send(doc.favciv)
})

usersRouter.delete('/', userExtractor, async (req, res, next) => {
  if (!req.token) {
    console.log("no token")
    return res.status(401).json({error:"invalid token"})
  }
  const dbRes = await User.findByIdAndDelete(req.user._id)
  if(dbRes._id.equals(req.user._id)) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

module.exports = usersRouter