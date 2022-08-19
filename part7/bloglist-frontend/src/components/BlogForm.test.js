import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls on submit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')
  const sendButton = screen.getByText('add')

  await user.type(titleInput, 'testing blog')
  await user.type(authorInput, 'tester')
  await user.type(urlInput, 'test.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0].title)
  expect(createBlog.mock.calls[0][0].title).toBe('testing blog')
  expect(createBlog.mock.calls[0][0].author).toBe('tester')
  expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})

