<template>
  <div class="container">
    <div class="userinfo" @click="login">
      <img :src="userinfo.avatarUrl">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>
</template>

<script>
  import YearProgress from '@/components/YearProgress'
  import {showSuccess, showModal, post} from '@/util'
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config'

  export default {
    data() {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登录'
        }
      }
    },
    onShow() {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    },
    methods: {
      async addBook(isbn) {
        console.log(this.userinfo.openId)
        let res = await post('/weapp/addbook', {
          isbn,
          openId: this.userinfo.openId
        })

        if (res.code === 0 && res.data.title) {
          showModal('添加成功', `《${res.data.title}》添加成功`)
        }
      },
      scanBook() {
        let _this = this
        wx.scanCode({
          success(res) {
            if (res.result) {
              _this.addBook(res.result)
            }
            console.log(res)
          }
        })
      },
      login() {
        let userInfo = wx.getStorageSync('userinfo')
        let _this = this
        if (!userInfo) {
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success(userInfo) {
              qcloud.request({
                url: config.userUrl,
                login: true,
                success(userRes) {
                  showSuccess('登录成功')
                  console.log(userRes)
                  wx.setStorageSync('userinfo', userRes.data.data)
                  _this.userinfo = userRes.data.data
                }
              })
            },
            fail: function (err) {
              console.log('登录失败', err)
            }
          })
        }
      }
    },
    components: {
      YearProgress
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 0 30rpx;
    .userinfo {
      margin-top: 100rpx;
      text-align: center;
      img {
        width: 150rpx;
        height: 150rpx;
        margin: 20rpx;
        border-radius: 50%;
      }
    }
  }
</style>
