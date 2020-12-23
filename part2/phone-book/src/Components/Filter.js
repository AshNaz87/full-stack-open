const Filter = ({searchPerson, handleSearch}) => (
  <div>
    Filter shown with
    &nbsp;
    <input
      placeholder='Search'
      value={searchPerson}
      onChange={handleSearch}
    />
  </div>    
)

export default Filter
