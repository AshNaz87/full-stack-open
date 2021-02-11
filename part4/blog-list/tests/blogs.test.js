const listHelper = require('../utils/list_helper')

const singleBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const multipleBlogs = [
  { 
    _id: "5a422a851b54a676234d17f7", 
    title: "React patterns", 
    author: "Michael Chan",       
    url: "https://reactpatterns.com/", 
    likes: 7, 
    __v: 0 
  }, 
  { 
    
    _id: "5a422aa71b54a676234d17f8", 
    title: "Go To Statement Considered Harmful", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5, 
    __v: 0 
  }, 
  { 
    _id: "5a422b3a1b54a676234d17f9", 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
    likes: 12, 
    __v: 0 
  }, 
  { 
    
    _id: "5a422b891b54a676234d17fa", 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, 
    __v: 0 
  }, 
  { 
    _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]

test('Dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {    
  test('returns likes from single blog, if blog list contains one blog', () => {
    const result = listHelper.totalLikes(singleBlog)
    expect(result).toBe(5)
  })
  
  test('returns likes from multiple blogs', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    expect(result).toBe(36)
  })
})

describe('Favourite blog', () => {
  const favBlog = { 
    _id: "5a422b3a1b54a676234d17f9", 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
    likes: 12, 
    __v: 0 
  }

  test('returns blog title with most likes', () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    expect(result).toEqual(favBlog)
  })

  describe('Author with most blogs', () => {    
    test('returns author with most number of blogs', () => {      
      const result = listHelper.mostBlogs(multipleBlogs)
      expect(result.get('author')).toBe('Robert C. Martin')
      expect(result.get('blogs')).toBe(3)
    })

    test('returns author and number of blogs if count is 1', () => {
      const result = listHelper.mostBlogs(singleBlog)
      expect(result.author).toBe('Edsger W. Dijkstra')
      expect(result.blogs).toBe(1)
    })

    test('returns message if blog list is empty', () => {
      const result = listHelper.mostBlogs({})
      expect(result).toBe('Blog list is empty')
    })
  })
})

describe('Most likes', () => {
  const onlyBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 5  
  }
  
  const authorWithMostLikes = {
    author: 'Edsger W. Dijkstra', 
    likes: 17
  }

  test('returns author with the most likes', () => {
    const result = listHelper.mostLikes(multipleBlogs)
    expect(result).toEqual(authorWithMostLikes)
  })

  test('returns author and no. of likes if blog count is 1', () => {
    const result = listHelper.mostLikes(singleBlog)
    expect(result).toEqual(onlyBlog)
  })
})