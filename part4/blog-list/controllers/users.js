const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (_, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1, likes: 1 })

  response.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)

  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
