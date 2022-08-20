import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import {
  Button,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react'


const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)
  const handleTitleChange = (event) => setTitle(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(newBlog({
      author: author,
      title: title,
      url: url
    }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <FormControl>
        <Input
          type='text'
          value={title}
          placeholder='Title'
          size='sm'
          width='50'
          onChange={handleTitleChange} />
        <Input
          type='text'
          value={author}
          placeholder='Author'
          size='sm'
          width='50'
          onChange={handleAuthorChange} />
        <Input
          type='text'
          value={url}
          placeholder='Url'
          size='sm'
          width='50'
          onChange={handleUrlChange} />
        <Button colorScheme='teal' variant='outline' type='submit' size='sm'>
          Create
        </Button>
      </FormControl>
    </div>
  )
}

export default BlogForm
