import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, userName }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog: ${blog.title}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <li className="blog">
      <div className="blogTitle">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonText}</button>
        <div style={showWhenVisible} className='togglableContent'>
          <p>{blog.url}</p>
          <p>likes {blog.likes}
            <button onClick={likeBlog}>like</button>
          </p>
          {blog.user &&
            <p>{blog.user.name}</p>
          }
          {blog.user && blog.user.name === userName &&
            <button onClick={handleRemove}>remove</button>
          }
        </div>
      </div>
    </li>
  )
}

export default Blog
