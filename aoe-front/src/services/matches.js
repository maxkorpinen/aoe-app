import axios from '../utils/apiClient'
const baseUrl = '/api/matches'

const getWithCivs = async(civs) => {
  const res = await axios.get(baseUrl+'/winsagainst/', {
    params: civs
  })
  return res.data
}

const getVersion = async() => {
  const res = await axios.get(baseUrl+'/version')
  return res.data
}

//eslint-disable-next-line
export default { getWithCivs, getVersion }