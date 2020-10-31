/* eslint-disable default-case */
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({text, operation}) => (
  <table>
    <tbody>
      <tr>
        <td>{`${text}: ${operation}`}</td>
      </tr>
    </tbody>
  </table>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good + neutral + bad
  const average = (good - bad) / sum || 0
  const positive = `${(good / sum || 0) * 100} %`

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      {sum === 0
        ? <p>No feedback given</p>
        : <>
            <h2>Statistics</h2>
            <Statistic text='good' operation={good} />
            <Statistic text='neutral' operation={neutral} />
            <Statistic text='bad' operation={bad} />
            <Statistic text='all' operation={sum} />
            <Statistic text='average' operation={average} />
            <Statistic text='positive' operation={positive} />
          </>
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
