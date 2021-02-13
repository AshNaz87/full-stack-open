const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Turkmen blog",
    author: "Ashraf Nazar",
    url: "https://example.com/turkmens",
    likes: 150
  },
  {
    title: "Bodybuilding",
    author: "Ron Coleman",
    url: "https://example.com/body-building",
    likes: 500
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)    
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('return a specific blog', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(blog => blog.author)
  expect(contents).toContain('Ashraf Nazar')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async & Await',
    author: 'Ashraf Nazar',
    url: 'https://ashraf.dev/async-await',
    likes: 500
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Async & Await')
})

afterAll(() => mongoose.connection.close())
