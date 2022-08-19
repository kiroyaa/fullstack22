import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(newBlog({
      author: newAuthor,
      title: newTitle,
      url: newUrl
    }))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>Title:
          <input
            value={newTitle}
            placeholder='blog title'
            id='formTitle'
            onChange={handleTitleChange} />
        </div>
        <div>Author:
          <input
            value={newAuthor}
            placeholder='blog author'
            id='formAuthor'
            onChange={handleAuthorChange} />
        </div>
        <div>Url:
          <input
            value={newUrl}
            placeholder='blog url'
            id='formUrl'
            onChange={handleUrlChange} />
        </div>
        <div>
          <button
            id='formAddButton'
            type="submit">add
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
