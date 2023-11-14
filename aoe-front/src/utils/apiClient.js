import axios from 'axios'
//test
const BACKEND = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_BACKEND_URL_DEV
  : ''

const apiClient = axios.create({
  baseURL: BACKEND
})

export default apiClient