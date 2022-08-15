import { useState, useEffect } from 'react'
import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const get = async (baseUrl) => {
      try {
        const response = await axios.get(baseUrl)
        console.log(response.data)
        setResources(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    get(baseUrl)
  }, [baseUrl])

  const create = async (resource) => {
    const obj = { ...resource, id: getId() }
    const response = await axios.post(baseUrl, obj)
    const createdObj = response.data
    setResources(resources => [...resources, createdObj])
  }

  const service = {
    create,
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
