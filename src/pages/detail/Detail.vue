<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea v-model='comment'
                class='textarea'
                :maxlength='100'
                placeholder='请输入图书短评'></textarea>
      <div class="location">
        地理位置：
        <switch color="#ea5a49" :checked="location" @change="getGeo"></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
        <switch color="#ea5a49" :checked="phone" @change="getPhone"></switch>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">
      未登录或者已经评论过了
    </div>
    <button open-type="share" class="btn">转发给好友</button>
  </div>
</template>

<script>
  import {get, post, showModal} from '@/util'
  import BookInfo from '@/components/BookInfo'
  import CommentList from '@/components/CommentList'

  export default {
    data() {
      return {
        bookid: 0,
        info: '',
        comment: '',
        location: '',
        phone: '',
        userinfo: '',
        comments: []
      }
    },
    computed: {
      showAdd() {
        if (!this.userinfo.openId) {
          return false
        }
        if (this.comments.some(v => v.openid === this.userinfo.openId)) {
          return false
        }
        return true
      }
    },
    methods: {
      async getDetail() {
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        wx.setNavigationBarTitle({
          title: info.data.title
        })
        this.info = info.data
      },
      async getComments() {
        const comments = await get('/weapp/CommentList', {bookid: this.bookid})
        this.comments = comments.data.list
      },
      addComment() {
        if (!this.comment) {
          return
        }
        const data = {
          openid: this.userinfo.openId,
          bookid: this.bookid,
          comment: this.comment,
          phone: this.phone,
          location: this.location
        }
        try {
          post('/weapp/addcomment', data)
          this.getComments()
          this.comment = ''
        } catch (e) {
          showModal('失败', e.msg)
        }
      },
      getGeo(e) {
        const ak = 'un0pGn8UGQyMl1wfCEmiMyza94GNAbuF'
        let url = 'http://api.map.baidu.com/geocoder/v2/'
        let _this = this
        if (e.target.value) {
          wx.getLocation({
            success(geo) {
              let latitude = geo.latitude
              let longitude = geo.longitude
              wx.request({
                url,
                data: {
                  ak,
                  location: `${latitude},${longitude}`,
                  output: 'json'
                },
                success(res) {
                  if (res.data.status === 0) {
                    _this.location = res.data.result.addressComponent.district
                  } else {
                    _this.location = '未知地理'
                  }
                }
              })
            }
          })
        }
      },
      getPhone(e) {
        if (e.target.value) {
          let res = wx.getSystemInfoSync()
          this.phone = res.model
        } else {
          this.phone = ''
        }
      }
    },
    mounted() {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComments()
      const userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    },
    components: {
      BookInfo,
      CommentList
    }
  }
</script>

<style lang='scss'>
  .comment {
    margin-top: 10px;
    .textarea {
      width: 730rpx;
      height: 200rpx;
      background: #eee;
      padding: 10rpx;
    }
    .location {
      margin-top: 10px;
      padding: 5px 10px;
    }
    .phone {
      margin-top: 10px;
      padding: 5px 10px;

    }
  }
</style>
