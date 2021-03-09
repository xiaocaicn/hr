import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setToken(data)
    }, setUserInfo(state, data) {
      state.userInfo = { ...data }
    }, removeToken(state) {
      removeToken()
      state.token = ''
    }, removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(store, data) {
      try {
        const res = await login(data)
        store.commit('setToken', res)
        console.log(res)
        setTimeStamp()
      } catch (error) {
        console.log('失败')
      }
    },
    async getUserInfo(store) {
      const resSimple = await getUserInfo()
      const resDetail = await getUserDetailById(resSimple.userId)
      const res = { ...resSimple, ...resDetail }
      store.commit('setUserInfo', res)
      //   console.log(res)
      return res
    },
    logout(store, data) {
      store.commit('removeToken')
      store.commit('removeUserInfo')
      resetRouter()
      store.commit('permission/setRoutes', [], { root: true })
    }
  }
}

