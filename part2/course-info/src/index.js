import React from 'react'
import ReactDOM from 'react-dom'

import Courses from './components/Courses'
import courseDetails from './courseDetails'

const App = () => {  
  return <Courses courses={courseDetails} />
}

ReactDOM.render(<App />, document.getElementById('root'))
