import axios from 'axios'

var api = axios.create({
  baseURL: '/api',
  // baseURL: 'http://10.62.39.224:5000/api',
  withCredentials: true
})

export default api