import axios from '../utils/apiClient'
const baseUrl = '/api/civs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getCivPowerUnit = async (idnro) => {
  //console.log("civservice idnro: ", idnro)
  //console.log(baseUrl+'/'+idnro)
  const res = await axios.get(baseUrl+'/powerunit/'+idnro)
  console.log("res:", res.data)
  return res.data
}

export default {getAll, getCivPowerUnit}