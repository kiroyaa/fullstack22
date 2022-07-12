import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (blog, token) => {
  try {
    const response = await axios
      .post(baseUrl, blog, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
    return response
  } catch (err) {
    console.log(err)
  }
}

const updateBlog = async (blog, token) => {
  try {
    const response = await axios
      .put(`${baseUrl}/${blog.id}`, blog, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
    return response
  } catch (err) {
    return err
  }
}

const blogServ = {
  getAll,
  addBlog,
  updateBlog,
}

export default blogServ
