import axios from 'axios'

const serverApi = 'http://localhost:3000'

export const baseService = axios.create({
  baseUrl: serverApi + '/api',
  timeout: 10000,
  transformResponse: [(data) => {
    return JSON.parse(data)
  }]
})

// http请求拦截器
baseService.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')
})

// http响应拦截器
baseService.interceptors.response.use(res => {

}, err => {

})