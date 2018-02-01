import axios from 'axios'
import store from '../store'

const serverApi = 'http://localhost:3000'

export let baseAjax = axios.create({
  baseURL: serverApi + '/api',
  timeout: 10000,
  transformResponse: [(data) => {
    return JSON.parse(data)
  }]
})

// http请求拦截器
baseAjax.interceptors.request.use(config => {
  config.headers.common.Authorization = window.localStorage.getItem('token')
  // store.commot()
  store.dispatch('SETNETWORDLOADSTATE', 'loading')
  return config
}, err => {
  store.dispatch('SETNETWORDLOADSTATE', 'reject')
  return err
})

// http响应拦截器
baseAjax.interceptors.response.use(res => {
  store.dispatch('SETNETWORDLOADSTATE', 'resolve')
  return res
}, (err, config) => {
  store.dispatch('SETNETWORDLOADSTATE', 'reject')
  return err
})
