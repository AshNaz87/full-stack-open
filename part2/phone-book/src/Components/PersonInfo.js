const PersonInfo = ({ person, removePerson }) => (
  <li>
    {person.name}, {person.telNo}
    &nbsp;
    <button onClick={removePerson}>Delete</button>
  </li>    
)

export default PersonInfo
