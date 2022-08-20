import { useSelector } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'
import { Link, ListItem, UnorderedList } from '@chakra-ui/react'

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
      <UnorderedList className='bloglist'>
        {blogs.map(blog =>
          <ListItem key={blog.id} className='blogTitle'>
            <Link as={ReactLink} to={`/blogs/${blog.id}`} color='teal'>{blog.title} {blog.author}</Link>
          </ListItem>
        )}
      </UnorderedList>
    </div>
  )
}

export default BlogList
