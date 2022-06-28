import Person from './Person'

const Persons = (props) => {

  const personsToShow = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))

  return (
    <div>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.id}
            name={person.name}
            number={person.number}
            handleDelete={() => props.handleDelete(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default Persons
