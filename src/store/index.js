import Vue from "vue";
import Vuex from "vuex"

import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象

const state = {
    cartList: []
};
const store = new Vuex.Store({
    state,
    // 1.mutations 唯一的目的就是修改state中的状态
    // 2.mutations 中的每一个方法尽可能完成的事件比较单一一点
    mutations,
    actions,
    getters,
})

// 3.挂载实例对象
export default store