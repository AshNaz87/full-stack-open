import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
import course from './course'


const App = () => {
  return (
    <>
      <Header course={course.name} />
      <Content course={course} />
      <Total
        exercisesTotal={course.parts.reduce(
          (acc, curr) => acc + curr.exercises,
          0
        )}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
