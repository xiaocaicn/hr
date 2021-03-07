// 引入路由
import router from '@/router'
// 引入vuex
import store from '@/store'
// 导入进度条插件
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const whiteList = ['/login', '/404']
  //   console.log(store.getters.token)

  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        const res = await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
        const newRoutes = await store.dispatch('permission/filterRoutes', res.roles.menus)
        console.log(newRoutes)
        router.addRoutes([...newRoutes, { path: '*', redirect: '/404', hidden: true }])
        // 当add函数执行的时候，已经在匹配路由的后面，所以不能马上继续next，只能重新调用一回
        next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
