import axios from '../utils/apiClient'
const baseUrl = '/api/matchup'

const getMatchup = async (civs) => {
  const res = await axios.get(baseUrl, { params:civs })
  return res.data
}

export default { getMatchup }