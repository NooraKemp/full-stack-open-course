import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  
  useEffect(() => { 
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }
  )

  const addPerson = (event) => {
    event.preventDefault()
    console.log('clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter((person) => person.name === personObject.name).length === 0) {
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            },5000)
          })
    } else {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with this new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updatePerson = {...person, number: newNumber}
        personService 
          .update(updatePerson.id, updatePerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== updatePerson.id ? person: returnedPerson))
              setMessage(`Updated ${returnedPerson.name}`)
              setTimeout(() => {
                setMessage(null)
              },5000)
            })
            .catch(error => {
              setMessage(`Information has been removed from server`)
              setError(true)
            setTimeout(() => {
              setMessage(null)
              setError(false)
            },5000)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
      .remove(id)
      setMessage(
        `Deleted phonenumber for ${name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App;
