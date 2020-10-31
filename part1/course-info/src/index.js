import React from 'react'
import ReactDOM from 'react-dom'

const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ]
}

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({partName, exercises}) => {
  return (
    <div>
      <p>Part Name: {partName}</p>
      <p>Exercise: {exercises}</p>
      <hr />
    </div>
  )
}

const Total = ({exercisesTotal}) => {
  return (
    <p>Number of exercises: {exercisesTotal}</p>
  )
}

const Content = () => {
  return (
    <div>
      {course.parts.map(part => <Part partName={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Header course={course.name} />
      <Content />
      <Total exercisesTotal={course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
