const Filter = ({searchPerson, handleSearch}) => (
  <>
    <div>
      Filter shown with
      <input
        placeholder='Search'
        value={searchPerson}
        onChange={handleSearch}
      />
    </div>
    <br />
  </>
)

export default Filter
