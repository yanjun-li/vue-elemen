import axios from 'axios'

// let url = 'http://localhost:60186/'
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // baseURL: url, // api的base_url
  timeout: 5000 // 请求超时时间
})

export default service
