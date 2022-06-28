const Persons = (props) => {

  const personsToShow = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))

  return (
    <div>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default Persons
