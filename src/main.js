import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const app = new Vue(App)

app.$mount()

export default {
  config: {
    pages: ['^pages/comments/main'],
    window: {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#EA5149',
      'navigationBarTitleText': '锡盟图书',
      'navigationBarTextStyle': 'light'
    }
  }
}
