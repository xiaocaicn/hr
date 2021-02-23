import { setToken } from '@/utils/auth'
import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setToken(data)
    }
  },
  actions: {
    async login(store, data) {
      try {
        const res = await login(data)
        store.commit('setToken', res)
      } catch (error) {
        console.log('失败')
      }
    }
  }
}

