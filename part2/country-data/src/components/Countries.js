import Country from './Country'

const Countries = ({ countries, showCountry }) => {
  const excessCountries = countries.length > 10
  const multipleCountries = countries.length > 0 && countries.length <= 10
  const singleCountry = countries.length === 1

  return (
    <>
      {excessCountries && <p>Too many matches, please specify another filter</p>}
      {multipleCountries && (
        <ul>
          {countries.map(country => (
            <div key={country.name}>
              <li key={country.alpha2Code}>{country.name}</li>
              <button key={country.alpha3Code} onClick={showCountry} id={country.name}>Show country</button>
            </div>
          ))}
        </ul>
      )}
      {singleCountry && <Country country={countries[0]} />}   
    </>
  )
  
}

export default Countries
