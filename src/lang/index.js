import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n' // 引入国际化的包
import Cookie from 'js-cookie' // 引入cookie包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包

// 引入自定义语言包
import LangCn from './cn'
import LangEn from './en'
// console.log(elementZH)
// 2. Vue.use 注册
Vue.use(VueI18n)
// 3. 创建实例, 提供配置(字典)
export default new VueI18n({
  // 配置1, 当前语言设定
  locale: Cookie.get('language') || 'cn',
  // 配置2, 字典
  messages: {
    cn: {
      ...elementZH,
      ...LangCn,
      hi: '你好',
      greeting: '祝你开心每一天！'
    },
    en: {
      ...elementEN,
      ...LangEn,
      hi: 'hi',
      greeting: 'Have a nice day!'
    }
  }
})
