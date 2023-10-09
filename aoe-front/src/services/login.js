import axios from '../utils/apiClient'
const baseUrl = '/api/login'

const login = async (creds) => {
  const res = await axios.post(baseUrl, creds)
  return res.data
}

export default {login}