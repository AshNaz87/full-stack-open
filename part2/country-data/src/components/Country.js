const Country = ({ country }) => (
  <>
    <h2>{country.name}</h2>
    <br />
    <dl>
      <dt>Capital city</dt>
      <dd>{country.capital}</dd>
      <dt>Population</dt>
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
  </>
)

export default Country
