import axios, { AxiosResponse } from 'axios'

// axios  的配置选项
axios.defaults.baseURL = 'http://httpbin.org/'
axios.defaults.timeout = 10000

axios.get('get').then((res: AxiosResponse<any>) => {
  console.log(res.data)
})
axios
  .get('get', {
    params: {
      name: 'peter',
      age: '18'
    }
  })
  .then((res: AxiosResponse<any>) => {
    console.log(res.data)
  })
axios
  .post('post', {
    params: {
      name: 'peter',
      age: '18'
    }
  })
  .then((res: AxiosResponse<any>) => {
    console.log(res.data)
  })
// axios.all -> 多个请求 一起返回
axios
  .all([
    axios.post('post', {
      params: {
        name: 'peter',
        age: '18'
      }
    }),
    axios.post('post', {
      params: {
        name: 'peter',
        age: '18'
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })

// axios 拦截器
axios.interceptors.request.use(
  (config) => {
    console.log('config')
    return config
  },
  (err) => {
    console.log(err)
  }
)
axios.interceptors.response.use(
  (success) => {
    console.log('success')
    return success
  },
  (err) => {
    console.log(err)
  }
)
