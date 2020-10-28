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
    ],
  }

  const Content = () => {
    return (
      <div>
        {course.parts.map(part => <Part partName={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content />
      <Total exercisesTotal={course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
