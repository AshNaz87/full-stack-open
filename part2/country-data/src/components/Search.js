const Search = ({ searchCountries, handleSearch }) => (
  <>
    <label htmlFor="countries">Search countries</label>
    &nbsp;
    <input 
      id="countries" 
      name="search-countries"
      onChange={handleSearch}
      value={searchCountries}
    />    
  </>
)

export default Search
