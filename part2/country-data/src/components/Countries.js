import Country from './Country'

const Countries = ({ countries }) => {
  const excessCountries = countries.length > 10
  const multipleCountries = countries.length > 0 && countries.length <= 10
  const singleCountry = countries.length === 1

  return (
    <>
      {excessCountries && (
        <p>Too many matches, please specify another filter</p>
      )}
      {multipleCountries && (
        <ul>
          {countries.map(country => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      )}
      {singleCountry && <Country country={countries[0]} />}   
    </>
  )
  
}

export default Countries
