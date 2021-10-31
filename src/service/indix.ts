import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    responseInterceptors: (config) => {
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    }
  }
})
export default hyRequest
