const PersonForm = ({
  newName,
  handleName,
  telephoneNumber,
  handleTelNo,
  addPerson,
}) => (
  <form>
    <div>
      Name
      &nbsp;
      <input
        placeholder='John Doe'
        value={newName}
        onChange={handleName}
      />
    </div>
    <div>
      Number
      &nbsp;
      <input
        placeholder='Enter tel no'
        value={telephoneNumber}
        onChange={handleTelNo}
      />
    </div>
    <br />
    <div>
      <button type='submit' onClick={addPerson}>
        Add
      </button>
    </div>
  </form>
)

export default PersonForm
