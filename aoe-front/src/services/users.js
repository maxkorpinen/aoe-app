import axios from '../utils/apiClient'
import hf from '../utils/helpfuncs'
const baseUrl = '/api/users'


const update = async (userdata) => {
  console.log("userdata in update",userdata)
  const token = ''
  const config = {
    headers: {
      Authorization: hf.addBearer(token) }
    }
  // käsittele error jotenkin
  const res = await axios.put(baseUrl, userdata, config)
  console.log("RES.data: ",res.data)
}

export default { update }