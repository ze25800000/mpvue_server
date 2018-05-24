import Vue from 'vue'
import Me from './Me'

const app = new Vue(Me)

app.$mount()

export default {
  config: {
    navigationBarTitleText: '个人中心',
    enablePullDownRefresh: true
  }
}
