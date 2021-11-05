import { Module } from 'vuex'
import { IRootState } from '../types'
import { ILoginState } from './types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount } from '@/service/login/types'
import localChache from '@/utils/cache'
import router from '@/router'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: {}
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localChache.setCache('token', token)

      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult.data.role.id)
      const roleId = userInfoResult.data.role.id

      commit('changeUserInfo', userInfoResult.data)
      localChache.setCache('userInfo', userInfoResult)

      const userMenuResult = await requestUserMenusByRoleId(roleId)
      console.log(userMenuResult.data)

      commit('changeUserMenus', userMenuResult)
      localChache.setCache('userInfo', userMenuResult)
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localChache.getCache('token')
      if (token) {
        commit('token', token)
      }
      const userInfo = localChache.getCache('userInfo')
      if (userInfo) {
        commit('userInfo', userInfo)
      }
      const changeUserMenus = localChache.getCache('changeUserMenus')
      if (changeUserMenus) {
        commit('changeUserMenus', changeUserMenus)
      }
    }
  },
  getters: {}
}

export default loginModule
