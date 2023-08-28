import axios from 'axios'

let BACKEND = ''

if (process.env.NODE_ENV === 'development') {
  console.log("DEV ENV")
  BACKEND = process.env.REACT_APP_BACKEND_URL_DEV
  console.log("BACKEND:", BACKEND)
}

const apiClient = axios.create({
  baseURL: BACKEND
})

export default apiClient