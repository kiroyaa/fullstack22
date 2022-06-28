import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    // check if user already exists
    if (persons.findIndex(person => person.name === newName) > 0) {
      if (window.confirm(`${newName} already exists, replace the old
            number with a new one?`)) {
        updatePerson(newName, newNumber)
      }
      return
    }
    createPerson(newName, newNumber)
  }

  const updatePerson = (name, number) => {
    const person = persons.find(person => person.name === name)
    const changedPerson = { ...person, number: number }

    personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
      })
      .catch(error => {
        alert(
          `failed to update person with id : ${changedPerson.id}`
        )
        setPersons(persons.filter(person => person.id !== changedPerson.id))
      })
  }

  const createPerson = (name, number) => {
    const personObject = {
      name: name,
      number: number
    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .catch(error => {
          console.log(`failed to delete person with id ${id} : {error}`)
        })
      setPersons(persons.filter(person => person.id !== id))
    }
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleInputChange={handleInputChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={deletePerson} />
    </div>
  )
}

export default App
