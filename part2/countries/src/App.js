import { useState, useEffect } from 'react'
import axios from 'axios'

const ListCountry = ({ name, handleShow }) => {
  return (
    <li>{name}
      <button onClick={handleShow}>show</button>
    </li>
  )
}

const MultipleCountries = ({ countries, handleShowCountry }) => {
  return (
    <ul>
      {countries.map(country =>
        <ListCountry key={country.name.common} name={country.name.common} handleShow={() => handleShowCountry(country.name.common)} />
      )}
    </ul>
  )
}

const OneCountry = ({ country }) => {
  const countryObject = {
    name: country.name.common,
    capital: country.capital,
    area: country.area,
    languages: country.languages,
    flag: country.flag
  }
  const languages = countryObject.languages
  return (
    <div>
      <h2>{countryObject.name}</h2>
      <p>capital {countryObject.capital}</p>
      <p>area {countryObject.area}</p>

      <h3>languages</h3>
      <ul>
        {
          Object.keys(languages).map(key =>
            <li key={languages[key]}>{languages[key]}</li>
          )}
      </ul>
      <p>{countryObject.flag}</p>
    </div>
  )
}

const Countries = (props) => {
  const countriesToShow = props.countries.filter(country => country.name.common.toLowerCase().includes(props.filter.toLowerCase()))

  if (countriesToShow.length === 1) {
    return (
      <div>
        <OneCountry country={countriesToShow[0]} />
      </div>
    )
  } else if (countriesToShow.length <= 10) {
    return (
      <div>
        <MultipleCountries countries={countriesToShow} handleShowCountry={props.handleShowCountry} />
      </div>
    )
  } else if (countriesToShow.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

const ExpandCountry = (props) => {
  const country = props.countries.find(obj => obj.name.common === props.name)
  return (
    <div>
      <OneCountry country={country} />
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [expandCountry, setExpandCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleShowCountry = (name) => {
    setExpandCountry(name)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div className="App">
      <div>find countries <input value={filter} onChange={handleFilter} /></div>
      <Countries countries={countries} filter={filter} handleShowCountry={handleShowCountry} />
      <ExpandCountry name={expandCountry} countries={countries} />
    </div>
  );
}

export default App;
