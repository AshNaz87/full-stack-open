import React, { useEffect, useState } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

import './index.css'

const App = props => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('Some error occured...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [newNote])

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })        
  }

  const handleNoteChange = event => setNewNote(event.target.value)

  const toggleImportanceOf = id => {    
    const note = notes.find(note => note.id === id)
    const changedNote = {
                          ...note, 
                          important: !note.important
                        }

    noteService
      .update(id, changedNote)
      .then(returnedNote => setNotes(notes.map(note => note.id !== id ? note : returnedNote)))
      .catch(error => {        
        console.log(error)
        setErrorMessage(`The note '${note.content}' was already removed from the server`)
        setTimeout(() => setErrorMessage(null), 3000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>          
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          placeholder='A new note...'
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Save</button>
      </form>
      <Footer />
    </>
  )
}

export default App
