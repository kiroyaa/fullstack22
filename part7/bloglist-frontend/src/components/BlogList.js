import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  if (blogs.length === 0) {
    return (
      <div>
        <p>no blogs to show</p>
      </div>
    )
  }

  return (
    <div>
      <ul className='bloglist'>
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
          />
        )}
      </ul>
    </div>
  )
}

export default BlogList
