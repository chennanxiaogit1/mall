import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import store from "./store"

import toast from "./components/common/toast"
import fastClick from "fastclick"
import VueLazyload from "vue-lazyload"

Vue.config.productionTip = false
//  安装插件
Vue.use(toast)
// 解决移动端300ms的延时
fastClick.attach(document.body)
// 图片懒加载
Vue.use(VueLazyload)
const loadimage = require('./assets/images/common/placeholder.png')

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  loading: loadimage,
  // attempt: 1
})

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

