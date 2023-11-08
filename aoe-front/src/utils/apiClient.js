import axios from 'axios'

/* let BACKEND = ''

if (process.env.NODE_ENV === 'development') {
  console.log("DEV ENV")
  BACKEND = process.env.REACT_APP_BACKEND_URL_DEV
} */

/* const BACKEND = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_BACKEND_URL_DEV
  : '' */
let BACKEND = ''
switch(process.env.NODE_ENV) {
  case 'development':
    BACKEND = process.env.REACT_APP_BACKEND_URL_DEV
  case 'test':
    //BACKEND = process.env.BACKEND_URL_TEST
    BACKEND = 'http://localhost:3001'
  default:
    BACKEND = process.env.REACT_APP_BACKEND_URL_DEV
}
console.log("BACKEND", )

const apiClient = axios.create({
  baseURL: BACKEND
})

export default apiClient