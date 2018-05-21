<script>
  import {get, showSuccess} from './util'
  import qcloud from 'wafer2-client-sdk'
  import config from './config'

  export default {
    async created() {
      let userInfo = wx.getStorageSync('userinfo')
      if (!userInfo) {
        // 设置登录地址
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            showSuccess('登录成功')
            wx.setStorageSync('userinfo', userInfo)
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })

        const res = await get('/weapp/demo')
        console.log('小程序启动了: ', res)
      }
    }
  }
</script>

<style>
.btn {
  color: white;
  background: #ea4a49;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
  .btn:active{
    background: #fa4a49;
  }
</style>
