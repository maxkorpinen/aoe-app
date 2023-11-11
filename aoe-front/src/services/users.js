import { setError } from '../reducers/errorReducer'
import axios from '../utils/apiClient'
import hf from '../utils/helpfuncs'
const baseUrl = '/api/users'

const create = async (username, password, dispatch) => {
  return axios.post(baseUrl, { username, password })
    .then(res => {
      return res.data
    })
    .catch(err => {
      dispatch(setError(err.message))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
      throw err
    })
}

const update = async (userdata, dispatch) => {
  const token = userdata.token
  const config = {
    headers: {
      authorization: hf.addBearer(token) }
  }
  // jos tulee unauthorized niin kirjaa ulos?
  axios.put(baseUrl, userdata, config)
    .then(res => {
      dispatch(setError(`New favourite civ: ${res.data}.`))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
    })
    .catch(err => {
      dispatch(setError('invalid token'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
    })
}

const deleteUser = async (userInfo) => {
  const token = userInfo.token
  const config = {
    data : userInfo,
    headers: {
      authorization: hf.addBearer(token) }
  }
  const res = await axios.delete(baseUrl, config) // axios.delete(baseUrl, { data: userInfo }, config)
  return res
}

//eslint-disable-next-line
export default { update, create, deleteUser }