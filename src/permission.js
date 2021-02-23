// 引入路由
import router from '@/router'
// 引入vuex
import store from '@/store'
// 导入进度条插件
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  const whiteList = ['/login', '/404']
  console.log(store.getters.token)
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
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
