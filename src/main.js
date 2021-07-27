import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import store from "./store"

import toast from "./components/common/toast"

Vue.config.productionTip = false
//  安装插件
Vue.use(toast)
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

