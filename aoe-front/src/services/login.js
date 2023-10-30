import axios from '../utils/apiClient'
const baseUrl = '/api/login'

const login = async (creds) => {
  const res = await axios.post(baseUrl, creds)
  return res.data
}
//eslint-disable-next-line
export default {login}