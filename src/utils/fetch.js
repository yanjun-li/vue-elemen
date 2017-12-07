import axios from 'axios'

let url = 'http://localhost/ws_service/'
// let url = 'http://localhost:60186/'
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

// 请求时的拦截
service.interceptors.request.use(function (config) {
  // 发送请求之前做一些处理
  return config
}, function (error) {
  // 当请求异常时做一些处理
  return Promise.reject(error)
})

// 响应时拦截
service.interceptors.response.use(function (response) {
  // 返回响应时做一些处理
  return response
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

export default service
