const Persons = ({ results }) => (
  <ul>
    {results.map((person) => (
      <li key={person.id}>
        {person.name}, {person.telNo}
      </li>
    ))}
  </ul>
)

export default Persons