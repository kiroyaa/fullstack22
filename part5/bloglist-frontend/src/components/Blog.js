import { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }

  return (
    <div className="blog">
      <div className="blogTitle">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonText}</button>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>likes {blog.likes}
            <button onClick={addLike}>like</button>
          </p>
          {blog.user &&
            <p>{blog.user.name}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Blog
