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

  const getCountries = countries.filter(country => 
    country
      .name
      .toLowerCase()
      .includes(searchCountries.toLocaleLowerCase())
  )

  const getCountry = countries.filter(country => 
    country.name.toLowerCase() === searchCountries.toLocaleLowerCase()
  )
      
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <>
      <Search handleSearch={handleSearch} searchCountries={searchCountries} />            
      {hasSearch && (
        <>
          {console.log(getCountries, getCountry)}
          <Countries countries={getCountries} />
        </>
      )}
    </>
  )
}

export default App
