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

const validBlog = {
  title: 'Async & Await',
  author: 'Ashraf Nazar',
  url: 'https://ashraf.dev/async-await',
  likes: 500
}

const unusedBlog = {
  author: 'Zarifa Bayat',
  url: 'https://example.com/blank',
  likes: 350
}

const limitedBlog = {
  title: 'This is a limited blog'
}

const nonExisitingId = async () => {
  const blog = new Blog({
    title: 'To be removed',
    author: 'John Doe',
    url: 'https://john.doe/remove',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  validBlog,
  unusedBlog,
  limitedBlog,
  nonExisitingId,
  blogsInDatabase
}
