import axios from "axios"
import { useState, useEffect } from "react"

const Weather = ({ capital }) => {
   const [weather, setWeather] = useState([])
   const api_key = process.env.REACT_APP_API_KEY

   useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
      .then((response) => {
        setWeather(response.data)
        console.log(weather[0])
      })
   },[])

   if(weather.length === 0) {
    return (
      <div>Weather information is not available for {capital}.</div>
    )
   } else {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
     )
   }
}

export default Weather