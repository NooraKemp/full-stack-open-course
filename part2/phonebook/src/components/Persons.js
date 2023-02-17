const Persons = ({ persons, newFilter, deletePerson}) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => (
        <div key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Persons
