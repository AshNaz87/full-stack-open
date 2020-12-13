import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import anecdotes from './anecdotes'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const DisplayVoteCount = ({ vote }) => (
  <p>
    Has {vote} {vote === 1 ? 'vote' : 'votes'}
  </p>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const votesCopy = [...votes]

  const recordVote = () => {
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const modeCount = Math.max(...votesCopy)
  const modeAnecdoteIndex = votesCopy.indexOf(modeCount)

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <br />
      <DisplayVoteCount vote={votes[selected]} />
      <br />
      <Button handleClick={recordVote} text='Vote' />
      <Button handleClick={randomAnecdote} text='Next anecdote' />
      <br />
      {modeCount > 0 && (
        <>
          <h2>Anecdote with the most votes</h2>
          <p>{anecdotes[modeAnecdoteIndex]}</p>
        </>
      )}
    </>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
