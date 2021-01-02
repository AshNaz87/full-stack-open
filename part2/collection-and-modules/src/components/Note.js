const Note = ({ note, toggleImportance }) => {
  const label = note.important ?
    'Unimportant' :
    'Important'

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
}

export default Note
