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

const blogServ = {
  getAll,
  addBlog,
}

export default blogServ
