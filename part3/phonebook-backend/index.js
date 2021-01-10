const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

morgan.token('body', req => JSON.stringify(req.body, null, 2))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (_request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  const person = persons.find(person => person.id === id)

  person ? response.json(person): response.status(404).end()
})

app.get('/info', (_request, response) => {
  const numberOfPeople = persons.length
  const time = new Date()
  response.send(
    `<p>Phonebook has info for ${numberOfPeople} people.</p><p>${time}</p>`    
  )    
})

const generateId = () => {
  return Math.ceil(Math.random() * 1000)
}

app.post('/api/persons', (request, response, next) => {
  body = request.body

  if (!body.name) {
    return response.status(404).json({
      error: 'Name is missing'
    })
  }

  if (!body.number) {
    return response.status(404).json({
      error: 'Number is missing'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  if (persons.find(contact => contact.name === person.name)) {
    return response.status(404).json({
      error: 'Person already exists'
    })
  }

  persons = persons.concat(person)

  response.json(persons)

  next()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
