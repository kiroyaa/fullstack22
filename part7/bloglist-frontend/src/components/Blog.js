import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, deleteBlog, addComment } from '../reducers/blogReducer'
import {
  Button,
  Heading,
  Link,
  Input,
} from '@chakra-ui/react'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleRemove = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog: ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  if (!blog) {
    return null
  }
  return (
    <div className='blogdiv'>
      <Heading as='h3' size='md'>{blog.title} {blog.author}</Heading>
      <div>
        <Link href={blog.url} color='aqua' className='blogInfo'>{blog.url}</Link>
        <p className='blogInfo'>likes {blog.likes}
          <Button size='xs' colorScheme='teal'
            onClick={() => dispatch(addVote(blog.id))}>like</Button>
        </p>
        {blog.user &&
          <p className='blogInfo'>added by {blog.user.username}</p>
        }

      </div>
      {blog.user && blog.user.username === user.username &&
        <Button className='removeButton' onClick={handleRemove}>remove</Button>
      }
      <Heading as='h3' size='sm'>comments</Heading>
      <Input
        type="text"
        id="commentInput"
        value={comment}
        placeholder='leave a comment'
        size='sm'
        width='50'
        onChange={({ target }) => setComment(target.value)} />
      <Button size='xs' colorScheme='teal' variant='outline' onClick={handleComment}>add comment</Button>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )
        }
      </ul>
    </div>
  )
}

export default Blog
