import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const DisplayVoteCount = ({ vote }) => <p>Has {vote} {vote === 1 ? 'vote' : 'votes'}</p>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    new Array(props.anecdotes.length).fill(0)
  )

  const randomAnecdote = () =>
    setSelected(Math.floor(Math.random() * props.anecdotes.length))

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
      <div>{props.anecdotes[selected]}</div>
      <br />
      <DisplayVoteCount vote={votes[selected]} />
      <br />
      <Button handleClick={recordVote} text='Vote' />
      <Button handleClick={randomAnecdote} text='Next anecdote' />
      <br />
      {modeCount > 0 &&
        <>
          <h2>Anecdote with the most votes</h2>
          <p>{props.anecdotes[modeAnecdoteIndex]}</p>
        </>
      }
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
