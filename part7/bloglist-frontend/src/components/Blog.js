import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addVote, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, userName }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog: ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
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
            <button className='likeButton' onClick={() => dispatch(addVote(blog.id))}>like</button>
          </p>
          {blog.user &&
            <p>{blog.user.name}</p>
          }
          {blog.user && blog.user.name === userName.username &&
            <button className='removeButton' onClick={handleRemove}>remove</button>
          }
        </div>
      </div>
    </li>
  )
}

export default Blog
