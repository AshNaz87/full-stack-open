import Weather from './Weather'

const Country = ({ country }) => (    
  <>
    <h2>{country.name}</h2>
    <br />
    <dl>
      <dt><strong>Capital city</strong></dt>
      <dd>{country.capital}</dd>
      <dt><strong>Population</strong></dt>
      <dd>{country.population}</dd>      
    </dl>
    <br />
    <h3>Languages</h3>
    <ul>
      {country.languages.map(language => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}      
    </ul>
    <br />
    <img 
      src={country.flag} 
      width={250} 
      height={250} 
      alt="Country flag"
    />
  <Weather query={country.capital} />
  </>
)

export default Country
