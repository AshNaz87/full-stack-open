const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let notes = [
  {    
    id: 1, 
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },  
  {    
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },  
  {    
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/', (_request, response) => response.send('<h1>Hello, world!</h1>'))

app.get('/api/notes', (_request, response) => response.json(notes))

app.get('/api/notes/:id', (request, response) => {
  const id = +request.params.id
  const note = notes.find(note => note.id === id)  
  
  note ? response.json(note) : response.status(404).end()
})

const generateId = () => { 
  let n = 0
  for (let i = 0; i < notes.length; i++) {
    if (notes.length > 0) {
      n = Math.max(...notes.map(note => note.id))
    } else {
      0
    }
  }
  return n + 1
}

app.post('/api/notes', (request, response) => {
  body = request.body
  
  if (!body.content) {
    return response.status(404).json({
      error: 'Content missing'
    })
  }
  
  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
    date: new Date()
  }
  
  notes = notes.concat(note)

  response.json(notes)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = +request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
