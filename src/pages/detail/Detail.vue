<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <div class="comment">
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
    </div>
  </div>
</template>

<script>
  import {get} from '@/util'
  import BookInfo from '@/components/BookInfo'

  export default {
    data() {
      return {
        bookid: 0,
        info: '',
        comment: '',
        location: '',
        phone: ''
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
      getGeo() {
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
    },
    components: {
      BookInfo
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
