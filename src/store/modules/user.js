
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, data) {
      state.token = data
    }
  },
  actions: {}
}

