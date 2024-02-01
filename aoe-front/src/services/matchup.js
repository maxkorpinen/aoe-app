import axios from '../utils/apiClient'
const baseUrl = '/api/matchup'

const getMatchup = async (civs) => {
  const res = axios.get(baseUrl, { params:civs })
  return res.data
}

export default { getMatchup }