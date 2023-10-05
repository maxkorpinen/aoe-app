import axios from '../utils/apiClient'
const baseUrl = '/api/civs'

const login = async (creds) => {
  const res = await axios.post(baseUrl, creds)
}

export default {login}