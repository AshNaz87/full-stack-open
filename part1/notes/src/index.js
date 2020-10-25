import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href='https://github.com/AshNaz87' target="_blank" rel="noreferrer noopener">Ashraf Nazar</a>
    </div>
  )
}

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