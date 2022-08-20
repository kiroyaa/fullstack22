import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (blog) => {
  try {
    const response = await axios
      .post(baseUrl, blog, {
        headers: {
          'Authorization': token
        }
      })
    return response
  } catch (err) {
    return err.response
  }
}

const updateBlog = async (blog) => {
  try {
    const response = await axios
      .put(`${baseUrl}/${blog.id}`, blog, {
        headers: {
          'Authorization': token
        }
      })
    return response
  } catch (err) {
    return err.message
  }
}

const remove = async (blogId) => {
  try {
    const response = await axios
      .delete(`${baseUrl}/${blogId}`, {
        headers: {
          'Authorization': token
        }
      })
    return response
  } catch (err) {
    return err.response
  }
}

const addComment = async (id, comment) => {
  try {
    const response = await axios
      .post(`${baseUrl}/${id}/comments`,
        { comment: comment }, {
        headers: {
          'Authorization': token
        }
      })
    return response
  } catch (e) {
    return e.response
  }
}

const blogServ = {
  setToken,
  getAll,
  addBlog,
  updateBlog,
  remove,
  addComment,
}

export default blogServ
