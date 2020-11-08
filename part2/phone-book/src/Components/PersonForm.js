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
      <input
        placeholder='John Doe'
        value={newName}
        onChange={handleName}
      />
    </div>
    <div>
      Number
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
