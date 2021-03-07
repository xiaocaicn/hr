import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: []
}
const mutations = {
  setRoutes(state, asyncRoutes) {
    const newRoutes = [...constantRoutes, ...asyncRoutes]
    state.routes = newRoutes
  }
}
const actions = {
  // 封装一个筛选可用路由的方法
  filterRoutes(store, menus) {
    // 参数1 store 本身(context)
    // 参数2 外部调用时传入的数据,这里指用户拥有的 menus 权限数组

    // 我们还需要引入动态路由的配置, 得到所有需要筛选的页面
    // 过滤动态路由, 如果名字存在于 menus 当中则保留, 否则抛弃
    const routes = asyncRoutes.filter(route => menus.indexOf(route.name) > -1)
    // 遍历当前这个人所拥有的 Menus 权限, 如果一个路由name 存在于 menus 当中就留下
    console.log('筛选结束')
    console.log(routes)
    store.commit('setRoutes', routes)
    // 返回筛选以后的路由
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
