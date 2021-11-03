let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV == 'develoment') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV == 'product') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://152.136.185.210:5000'
}

export { BASE_URL, TIME_OUT }
