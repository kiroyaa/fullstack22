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
        <button className='viewButton' onClick={toggleVisibility}>{buttonText}</button>
        <div style={showWhenVisible} className='togglableContent'>
          <p className='urlInfo'>{blog.url}</p>
          <p className='likesInfo'>likes {blog.likes}
            <button className='likeButton' onClick={likeBlog}>like</button>
          </p>
          {blog.user &&
            <p>{blog.user.name}</p>
          }
          {blog.user && blog.user.name === userName &&
            <button className='removeButton' onClick={handleRemove}>remove</button>
          }
        </div>
      </div>
    </li>
  )
}

export default Blog
