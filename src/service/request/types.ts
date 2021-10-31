import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

export interface HYAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
