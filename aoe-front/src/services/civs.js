import axios from '../utils/apiClient'
const baseUrl = '/api/civs'

const getAll = async () => {
  console.log("axios:",axios)
  const res = await axios.get(baseUrl)
  return res.data
}

export default {getAll}