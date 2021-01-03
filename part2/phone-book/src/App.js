import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonInfo from './components/PersonInfo'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [telephoneNumber, setTelephoneNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')

  const handleName = event => setNewName(event.target.value)

  const handleTelNo = event => setTelephoneNumber(event.target.value)

  const handleSearch = event => setSearchPerson(event.target.value)  
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [searchPerson])

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      telNo: telephoneNumber      
    }

    if (persons.filter(person => person.name === personObject.name).length > 0) {
      if (window.confirm(`${personObject.name} is already added to the Phone Book. Would you like to replace the old number with the new one?`)) {
        const previousPerson = (persons.find(person => person.name === personObject.name))
        personService
          .update(previousPerson.id, { ...previousPerson, telNo: telephoneNumber })
          .then(updatedPerson => setPersons(persons.map(person => person.name === newName ? updatedPerson : person)))
          .catch(error => console.log(error))
        setPersons(persons.concat(personObject))
        setNewName('')
        setTelephoneNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))        
          setNewName('')
          setTelephoneNumber('')
        }).catch(error => console.log(error))
    }
  }

  const removePersonOf = id => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Remove ${person.name}?`)) {
      personService.remove(id, person)      
      setPersons(persons.filter(person => person.id !== id))
      setNewName('')
      setTelephoneNumber('')
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
            removePerson={() => removePersonOf(person.id)}             
          />
        ))}
      </ul>
    </div>
  )
}

export default App
