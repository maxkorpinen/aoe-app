import axios from '../utils/apiClient'
const baseUrl = '/api/units'

const getAll = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default {getAll}