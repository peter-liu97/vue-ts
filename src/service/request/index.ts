import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './types'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const defautLoading = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  // 实例的拦截器
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? defautLoading
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据。。。',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (error) => {
        return error
      }
    ),
      this.instance.interceptors.response.use(
        (res) => {
          this.loading?.close()
          return res
        },
        (error) => {
          this.loading?.close()
          return error
        }
      )
  }

  requist<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求中的 request 拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.showLoading = config.showLoading ?? defautLoading

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求中的 response 拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = defautLoading
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = defautLoading
          reject(err)
          console.log(err)
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.requist<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.requist<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.requist<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.requist<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
