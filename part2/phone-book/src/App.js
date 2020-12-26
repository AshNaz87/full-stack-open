import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [telephoneNumber, setTelephoneNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')

  const handleName = event => setNewName(event.target.value)

  const handleTelNo = event => setTelephoneNumber(event.target.value)

  const handleSearch = event => setSearchPerson(event.target.value)

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      telNo: telephoneNumber,
      id: persons.length + 1,
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the Phone Book`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setTelephoneNumber('')
  }

  const results = !searchPerson
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(searchPerson.toLocaleLowerCase())
      )

  useEffect(() => {
    axios
      .get(`http://localhost:3001/persons`)
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

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
      <Persons results={results} />      
    </div>
  )
}

export default App
