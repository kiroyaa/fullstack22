import axios from 'axios'
const baseUrl = '/api/blogs'

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
    return err.message
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
    return err.message
  }
}

const blogServ = {
  setToken,
  getAll,
  addBlog,
  updateBlog,
  remove,
}

export default blogServ
