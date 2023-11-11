import axios from 'axios'

let BACKEND = 'http://localhost:3001'
/* if ( process.env.NODE_ENV === 'development') {
  BACKEND = REACT_APP_BACKEND_URL_DEV
} else if (process.env.NODE_ENV === 'test') {
  BACKEND = REACT_APP_BACKEND_URL_TEST
} else {
  BACKEND = 'http://localhost:3001'
  console.log("Env variable REACT_APP_BACKEND_URL_* not set.")
} */

const apiClient = axios.create({
  baseURL: BACKEND
})

export default apiClient