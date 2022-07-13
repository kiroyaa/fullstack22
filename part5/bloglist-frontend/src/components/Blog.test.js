import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing title for blog',
  author: 'Testi Tester',
  url: 'testi.com',
  likes: 5
}

describe('show blog elements when needed', () => {
  test('blog renders title & author by default but not url or like', () => {
    const { container } = render(
      <Blog blog={blog} />
    )
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Testing title for blog'
    )
    expect(div).toHaveTextContent(
      'Testi Tester'
    )

    const hidden = container.querySelector('.togglableContent')
    expect(hidden).toHaveStyle('display: none')
  })

  test('clicking the button shows likes & url', async () => {
    const mockHandler = jest.fn()
    const { container } = render(
      <Blog blog={blog} likeBlog={mockHandler} />
    )
    const div = container.querySelector('.blog')

    const user = userEvent.setup()
    const button = await screen.findByText('view')
    await user.click(button)

    expect(div).not.toHaveStyle('display: none')
  })
})

test('when like button is pressed twice, the event handler is also called twice', async () => {
  const mockHandler = jest.fn()
  render(
    <Blog blog={blog} likeBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})


