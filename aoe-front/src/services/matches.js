import axios from '../utils/apiClient'
const baseUrl = '/api/matches'

const getWithCivs = async(civs) => {
  console.log("matchservice civs: ",civs)
  const res = await axios.get(baseUrl+'/winsagainst/', {
    params: civs
  })
  return res.data
}

export default { getWithCivs }