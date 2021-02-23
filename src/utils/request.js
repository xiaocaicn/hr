import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(

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
    console.log('拦截器失败逻辑')
    console.dir(err)
    Message.error(err.message)
    return Promise.reject(Error(err.message))
  }
)

export default service
