import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const app = new Vue(App)

app.$mount()

export default {
  config: {
    pages: ['^pages/books/main'],
    window: {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#EA5149',
      'navigationBarTitleText': '锡盟图书',
      'navigationBarTextStyle': 'light'
    },
    tabBar: {
      selectedColor: '#EA5149',
      list: [
        {
          pagePath: 'pages/books/main',
          text: '图书',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book@selected.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/img/comment.png',
          selectedIconPath: 'static/img/comment@selected.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我的',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me@selected.png'
        }
      ]
    }
  }
}
