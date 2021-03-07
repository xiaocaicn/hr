const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  //   avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username,
  company: state => state.user.userInfo.company,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  routes: state => state.permission.routes
}
export default getters
