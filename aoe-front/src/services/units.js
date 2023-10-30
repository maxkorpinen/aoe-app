import axios from '../utils/apiClient'
const baseUrl = '/api/units'

const getAll = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}
//eslint-disable-next-line
export default {getAll}