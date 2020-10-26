import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>Part Name: {props.partName}</p>
      <p>Exercise: {props.exercises}</p>
      <hr />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises: {props.exercisesTotal}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Content = () => {
    return (
      <div>
        <Part partName={part1} exercises={exercises1} />
        <Part partName={part2} exercises={exercises2} />
        <Part partName={part3} exercises={exercises3} />
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content></Content>
      <Total exercisesTotal={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
