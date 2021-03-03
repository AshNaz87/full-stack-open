const Blog = require('../models/blog')
const User = require('../models/user')

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
  },
];

const initialUsers = [
  {
    username: 'AshNaz87',
    name: 'Ashraf Nazar',
    password: 'password'
  },
  {
    username: 'Bapi9808',
    name: 'Esra Nazar',
    password: 'cute baby'
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

const usersInDatabase = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  validBlog,
  unusedBlog,
  limitedBlog,
  nonExisitingId,
  blogsInDatabase,
  usersInDatabase
}
