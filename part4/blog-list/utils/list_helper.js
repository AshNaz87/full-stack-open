const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((acc, curr) => acc + curr.likes, 0)

const favoriteBlog = blogs =>
  blogs.reduce((prev, curr) => {
    if (prev.likes > curr.likes) {
      return prev
    } else {
      return curr
    }
  }, 0)

const mostBlogs = blogs => {
  if (Object.keys(blogs).length === 0) return 'Blog list is empty'

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    }
  }

  const blogCount = blogs.reduce((count, entry) => {
    count[entry.author] = (count[entry.author] || 0) + 1
    return count
  }, {})
  return Object.keys(blogCount).reduce((prev, curr) => {
    let map = new Map()
    if (blogCount[prev] > blogCount[curr]) {
      return map.set('author', prev).set(prev, blogCount[prev])
    } else {
      return map.set('author', curr).set('blogs', blogCount[curr])
    }
  })
}

const mostLikes = blogs => {
  const hash = {}

  for (const blog of blogs) {
    if (hash.hasOwnProperty(blog.author)) {
      hash[blog.author] += blog.likes
    } else {
      hash[blog.author] = blog.likes
    }
  }
  
  const arr = []
  
  for (entry in hash) {
    arr.push({
      author: entry,
      likes: hash[entry]
    })
  }
  
  const maxLikes = Math.max(...arr.map(blog => blog.likes))
  
  return arr.filter(blog => blog.likes === maxLikes)[0]
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
