const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper.test')
const User = require('../models/user')
const app = require("../app");
const api = supertest(app);

describe('when there is a single user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sudo', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('can successfully create new user', async () => {
    const initialUsers = await helper.usersInDatabase()

    const newUser = {
      username: 'ZarBay95',
      name: 'Zarifa Bayat',
      password: 'sheberghan'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const finalUsers = await helper.usersInDatabase()
    expect(finalUsers).toHaveLength(initialUsers.length + 1)

    const usernames = finalUsers.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('cannot create new user if username already taken', async () => {
    const initialUsers = await helper.usersInDatabase()

    const newUser = {
      name: 'Superuser',
      username: 'root',
      password: 'sudo'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const finalUsers = await helper.usersInDatabase()
    expect(finalUsers).toHaveLength(initialUsers.length)
  })

  test('cannot create user if username length is less than 3 characters', async () => {
    const initialUsers = await helper.usersInDatabase()

    const newUser = {
      username: 'ab',
      name: 'Abby',
      password: 'abc'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      `username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`
    )

    const finalUsers = await helper.usersInDatabase()
    expect(finalUsers).toHaveLength(initialUsers.length)
  })
})

afterAll(() => mongoose.connection.close());
