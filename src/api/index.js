import Axios from 'axios'
import router from '../router'

if (window.localStorage.getItem('token')) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ` + window.localStorage.getItem('token')
}

export let instance = Axios.create({baseURL: 'api'})
// request拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// respone拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
    }
    return Promise.reject(error.response)
  }
)

export const login = ({ loginEmail, loginPassword }) => {
  return instance.post('/u/user/login', {
    email: loginEmail,
    password: loginPassword
  })
}

export const getUserInfo = () => {
  return instance.get('/u/user/list')
}
