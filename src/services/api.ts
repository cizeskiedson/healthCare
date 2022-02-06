import axios from 'axios'

const api = axios.create({
  baseURL: 'https://healthcare-tcc.herokuapp.com/',
})

export default api
