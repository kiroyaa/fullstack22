import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response
  } catch (e) {
    return e.response
  }
}

const userService = {
  getAll,
}

export default userService
