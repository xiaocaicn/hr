import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from './auth'
import router from '@/router'
const TimeOutDuration = 3600
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (!isTimeOut()) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    } else {
      store.dispatch('user/logout')
      router.push('/login?redirect=' + location.hash.substring(1))
      return Promise.reject(new Error('登录已过期'))
    }
  }
  return config
}, error => {
  return Promise.reject(error)
}
)

// response interceptor
service.interceptors.response.use(
  res => {
    const { success, data, message } = res.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  }, err => {
    if (err.response && err.response.data && err.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login?redirect=' + location.hash.substring(1))
    } else {
      // console.log('拦截器失败逻辑')
      console.dir(err)
      Message.error(err.message)
      return Promise.reject(new Error(err.message))
    }
  }
)
function isTimeOut() {
  const nowTime = new Date()
  const loginTime = getTimeStamp()
  return (nowTime - loginTime) / 1000 > TimeOutDuration
}

export default service
