import axios from 'axios'

let BACKEND = process.env.REACT_APP_BACKEND_URL_DEV

const apiClient = axios.create({
  baseURL: BACKEND
})

export default apiClient