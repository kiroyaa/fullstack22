import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
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
    createBlog({
      author: newAuthor,
      title: newTitle,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>Title: <input value={newTitle} placeholder='blog title' onChange={handleTitleChange} /></div>
        <div>Author: <input value={newAuthor} placeholder='blog author' onChange={handleAuthorChange} /></div>
        <div>Url: <input value={newUrl} placeholder='blog url' onChange={handleUrlChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

export default BlogForm
