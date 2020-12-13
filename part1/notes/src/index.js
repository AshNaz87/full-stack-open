import React from 'react'
import ReactDOM from 'react-dom'

import Hello from './components/Hello'
import Footer from './components/Footer'

const App = () => {
  const name = 'Foo'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Bar' age={23 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))