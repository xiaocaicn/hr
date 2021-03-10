import store from '@/store'
export default {
  methods: {
    checkPermission(key) {
      if (store.state.user.userInfo.id) {
        return store.state.user.userInfo.roles.points.indexOf(key) > -1
      }
    }
  }
}
