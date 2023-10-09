import axios from '../utils/apiClient'
const baseUrl = '/api/users'

const update = async (userdata) => {
  /*
  Voiko sinne vaan tunkea suoraan {username: xxx, favciv:yyy}?
  Pitääkö passua voida muuttaa?
  

  lähetä token mukana
  */
  const res = await axios.put(baseUrl, userdata)
}