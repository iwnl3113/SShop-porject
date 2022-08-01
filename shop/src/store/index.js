import { createStore } from 'vuex'
import userInfo from './state/userinfo.state.js';

export default createStore({
  // 全局的状态初始数据
  state: {
    count:1
  },
  // 计算state,获取对应的值
  getters: {
  },
  // 更新状态的方法 commit
  mutations: {
  },
  // 可以异步操作,可以返回promise，更改数据
  actions: {
  },
  // 数据较多分模块
  modules: {
    userInfo
  }
})
