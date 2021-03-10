import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// 导入自定义语言包组件
import i18n from '@/lang'

import checkPermission from '@/mixin/checkPermission'
Vue.mixin(checkPermission)

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

import { imgerror } from '@/directives'
Vue.directive('imgerror', imgerror)

// 引入组件
import Component from '@/components'
Vue.use(Component)

// 批量引入方法
import * as filters from '@/filters'
for (const key in filters) {
  // keys是过滤器的名字,filters[key]是函数
  Vue.filter(key, filters[key])
//   console.log(key, filters[key])
}
// 注册打印组件
import Print from 'vue-print-nb'
Vue.use(Print)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
