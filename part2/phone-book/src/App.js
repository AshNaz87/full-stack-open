import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonInfo from './components/PersonInfo'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [telephoneNumber, setTelephoneNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleName = event => setNewName(event.target.value)

  const handleTelNo = event => setTelephoneNumber(event.target.value)

  const handleSearch = event => setSearchPerson(event.target.value)  
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  })

  const addPerson = event => {
    event.preventDefault()

    const personObject = {
      name: newName,
      telNo: telephoneNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the Phone Book. Would you like to replace the old number with the new one?`)) {
        const previousPerson = (persons.find(person => person.name === newName))
        personService
          .update(previousPerson.id, { name: previousPerson.name, telNo: telephoneNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.name === newName ? updatedPerson : person))
            setNewName('')
            setTelephoneNumber('')        
            setTimeout(() => setNotificationMessage({ message: `Successfully updated telephone number for ${newName}`, type: 'success' }), 1000)
          })
          .catch(error => setNotificationMessage({ message: `${error.response.data.error}`, type: 'error' }))
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))        
          setNewName('')
          setTelephoneNumber('')                
          setTimeout(() => setNotificationMessage({ message: `Successfully added ${newName}`, type: 'success' }), 1000)
        })
        .catch(error => {
          setNotificationMessage({ message: `${error.response.data.error}`, type: 'error' })
        })
    }
  }

  const removePersonOf = id => {
    return () => {
      const person = persons.find(person => person.id === id)

      if (window.confirm(`Remove ${person.name}?`)) {
        personService.remove(id, person)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNewName('')
          setTelephoneNumber('')
          setTimeout(() => setNotificationMessage({ message: `Successfully removed ${person.name}`, type: 'success' }), 1000)
        })
        .catch(error => setNotificationMessage({ message: `${error}`, type: 'error' }))
      }
    }
  }

  const results = !searchPerson
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(searchPerson.toLocaleLowerCase())
      )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notificationMessage} />
      <Filter searchPerson={searchPerson} handleSearch={handleSearch} />
      <h2>Add a New Contact</h2>
      <PersonForm
        newName={newName}
        handleName={handleName}
        telephoneNumber={telephoneNumber}
        handleTelNo={handleTelNo}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <ul>
        {results.map(person => (      
          <PersonInfo           
            person={person} 
            key={person.id}
            removePerson={removePersonOf(person.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
