import axios from '../utils/apiClient'
const baseUrl = '/api/civs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getWithId = async (id) => {
  const res = await axios.get(baseUrl+"/"+id)
  console.log("IDRES", res.data)
  return res.data
}

const getCivPowerUnit = async (id) => {
  //console.log("civservice idnro: ", idnro)
  //console.log(baseUrl+'/'+idnro)
  const res = await axios.get(baseUrl+'/powerunit/'+id)
  console.log("res:", res.data)
  return res.data
}

export default {getAll, getCivPowerUnit, getWithId}