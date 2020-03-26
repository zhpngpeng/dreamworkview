import * as types from './types'
import { login, getUserInfo } from '../api'
import Axios from 'axios'

export default {
  toLogin ({ commit }, info) {
    return new Promise((resolve, reject) => {
      login(info).then(res => {
        if (res.status === 200) {
          console.log(res.data.data)
          commit(types.LOGIN, res.data.data.token)
          commit(types.LOGINSTATUS, true)
          Axios.defaults.headers.common['Authorization'] = `Bearer ` + res.data.data.token
          window.localStorage.setItem('token', res.data.data.token)
          resolve(res)
        }
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },
  getUser ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        if (res.status === 200) {
          commit(types.USERINFO, res.data)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  logOut ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.USERINFO, null)
      commit(types.LOGINSTATUS, false)
      commit(types.LOGIN, '')
      window.localStorage.removeItem('token')
    })
  }
}
