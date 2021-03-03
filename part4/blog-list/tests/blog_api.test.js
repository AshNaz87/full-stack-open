const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper.test')

let token

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())

  await Promise.all(promiseArray)
})

test('blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

describe('viewing a specific blog', () => {
  test('return a specific blog', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((blog) => blog.author)
    expect(contents).toContain('Ashraf Nazar')
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })
})

describe('addition of a blog', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('p@ssword', 10)

    const superUser = new User({
      username: 'sudo',
      passwordHash
    })

    await superUser.save()

    const response = await api
      .post('/api/login')
      .send({
        username: superUser.username,
        password: 'p@ssword'
      })
      .expect(200)

    token = response.body.token
    expect(token).toBeDefined()
    })

    test('a valid blog can be created if user is authorised', async () => {
      const newBlog = {
      title: 'Brand new blog',
      author: 'Cornelius Bundage',
      url: 'https://thecontender.com/cornelius-bundage'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDatabase()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const contents = finalBlogs.map((blogs) => blogs.title)
    expect(contents).toContain('Brand new blog')
  })

  test('a blog without a title cannot be added', async () => {
    const unused = helper.unusedBlog
    const finalBlogs = await helper.blogsInDatabase()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length)
  })

  test('returns 400 status code if `title`and `url` properties are omitted', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.limitedBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('cannot be added by unauthorised user', async () => {
    token = null

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.validBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  beforeAll(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('p@ssword', 10)
    const superUser = new User({
      username: 'sudo',
      passwordHash,
    })

    await superUser.save()

    const response = await api
      .post('/api/login')
      .send({
        username: superUser.username,
        password: 'p@ssword'
      })
      .expect(200)

    token = response.body.token
    expect(token).toBeDefined()
  })

  test('succeeds with status code 204 if user is authorised', async () => {
    const newBlog = {
      title: 'One more blog',
      author: 'Anonymous',
      url: 'https://question.everything'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await Blog.find({})

    const blogToRemove = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})

    expect(blogsAtStart).toHaveLength(3)
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('fails with status code 401 if user is unauthorised', async () => {
    const anotherBlog = new Blog({
      title: 'Blogging',
      author: 'Pseudo Coder',
      url: 'https://coder.com'
    })

    token = null

    await api
      .delete(`/api/blogs/${anotherBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

test('verify that unique property of blog posts is named `id`', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => mongoose.connection.close())
