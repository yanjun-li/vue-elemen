import axios from 'axios'

let url = 'http://localhost:60186/'
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: url, // api的base_url
  timeout: 5000 // 请求超时时间
})
service.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
service.defaults.transformRequest = [function (data) {
  let newData = ''
  for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}]
export default service
