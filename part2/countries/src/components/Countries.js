import Weather from "./Weather"

const Countries = ( { countries, newFilter, setNewFilter } ) => {
  const filteredCountries = countries
  .filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  )

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area:  {country.area}</p>
        <b>Languages:</b>
        <ul>
          {Object.entries(country.languages).map(language =>
            <li key={language[0]}>{language[1]}</li>
          )}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <Weather capital={country.capital} />
      </div>
    )

  } else if (filteredCountries.length > 10) {
    return (
    <div>Too many results, specify filter.</div>
    )
  } else {
    return (
      <div>
        <ul>
          {filteredCountries.map(contry =>
             <li key ={contry.name.common}>{contry.name.common}{" "}<button onClick={() => setNewFilter(contry.name.common)}>Show</button>
             </li>)}
        </ul>
      </div>
    )
  }
}

export default Countries