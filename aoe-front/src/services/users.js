import axios from '../utils/apiClient'
import hf from '../utils/helpfuncs'
const baseUrl = '/api/users'


const update = async (userdata) => {
  /*
  Voiko sinne vaan tunkea suoraan {username: xxx, favciv:yyy}?
  Pitääkö passua voida muuttaa?
  lähetä token mukana
  */
  //const token = useSelector(state => state.user.token)
  // _> syötä token argumenttina ei voi hakee useria täälllä
  
  console.log(userdata)
  /* const token = ''
  const config = {
    headers: {
      Authorization: hf.addBearer(token) }
    }
  const res = await axios.put(baseUrl, userdata, config)
  console.log(res.data) */
}

export default { update }