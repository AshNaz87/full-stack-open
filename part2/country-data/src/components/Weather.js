import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY

const Weather = ({ query }) => {
  const [condition, setCondition] = useState({})
  const [hasCondition, setHasCondition] = useState(false)

  const params = {
    q: query,
    appid: API_KEY
  }

  useEffect(() => {
    let source = axios.CancelToken.source()
    
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: params,
        cancelToken: source.token
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log(error.message)
        } else {
          throw error
        }
      })
      .then(response => {
        if (response.statusText === 'OK') {          
          setCondition(response.data)
          setHasCondition(true)
        }
      })
  })

  return (
    <>      
      {hasCondition && (
        <>
          <h3>Weather in {condition.name}</h3>
          <dl>
            <dt><strong>Temperature</strong></dt>
            <dd>{condition.main.temp} Celsius</dd>
          </dl>        
          <dl>
            <dt><strong>Wind speed</strong></dt>
            <dd>{condition.wind.speed} mph</dd>
            <dt><strong>Wind direction</strong></dt>
            <dd>{condition.wind.deg} degrees</dd>
          </dl>
        </>
      )}
    </>
  )
}

export default Weather
