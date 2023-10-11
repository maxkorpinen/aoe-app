import { setError } from '../reducers/errorReducer'
import axios from '../utils/apiClient'
import hf from '../utils/helpfuncs'
const baseUrl = '/api/users'


const update = async (userdata, dispatch) => {
  const token = userdata.token
  const config = {
    headers: {
      authorization: hf.addBearer(token) }
    }
  // käsittele error jotenkin
  // jos tulee unauthorized niin notif ja kirjaa ulos?
  // miks toi näyttää 
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

export default { update }