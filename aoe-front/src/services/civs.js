import axios from '../utils/apiClient'
const baseUrl = '/api/civs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getCivWinPct = async(civs) => {
  const url = '/'+civs['civ1']+'/vs/'+civs['civ2']
  const res = await axios.get(baseUrl+url, {
    params: civs
  })
  return res.data
}

const getWithId = async (id) => {
  const res = await axios.get(baseUrl+"/"+id)
  return res.data
}

const getCivPowerUnit = async (id) => {
  const res = await axios.get(baseUrl+'/'+id+'/powerunit')
  return res.data
}

//eslint-disable-next-line
export default { getAll, getCivPowerUnit, getWithId, getCivWinPct }