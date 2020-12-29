import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Search from './components/Search'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')
  const [hasSearch, setHasSearch] = useState(false)

  const handleSearch = event => {
    const value = event.target.value
    setSearchCountries(value)

    value === ''
     ? setHasSearch(false)
     : setHasSearch(true)
  }

  const handleCountry = event => {
    event.preventDefault()
    setSearchCountries(event.target.id)
  }

  const getCountries = countries.filter(country => 
    country
      .name
      .toLowerCase()
      .includes(searchCountries.toLocaleLowerCase())
  )  
      
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [searchCountries])

  return (
    <>
      <Search handleSearch={handleSearch} searchCountries={searchCountries} />            
      {hasSearch && <Countries countries={getCountries} showCountry={handleCountry} />}
    </>
  )
}

export default App
