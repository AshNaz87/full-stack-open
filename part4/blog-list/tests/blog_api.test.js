const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper.test')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
 
  await Promise.all(promiseArray)
})

test('blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)    
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('return a specific blog', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(blog => blog.author)
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

test('a valid blog can be added', async () => {  
  await api
    .post('/api/blogs')
    .send(helper.validBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const finalBlogs = await helper.blogsInDatabase()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)

  const contents = finalBlogs.map(blogs => blogs.title)
  expect(contents).toContain('Async & Await')
})

test('a blog without a title cannot be added', async () => {
  const unused = helper.unusedBlog
  const finalBlogs = await helper.blogsInDatabase()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDatabase()
  const blogToRemove = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToRemove.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDatabase()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).not.toContain(blogToRemove.title)
})

test('verify that unique property of blog posts is named `id`', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('returns 400 status code if `title`and `url` properties are omitted', async () => {
  await api
    .post('/api/blogs')
    .send(helper.limitedBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDatabase()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => mongoose.connection.close())
