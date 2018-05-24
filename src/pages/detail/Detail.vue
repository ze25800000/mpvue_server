<template>
  <div>
    <div>图书ID：{{bookid}}</div>
    <BookInfo :info="info"></BookInfo>
  </div>
</template>

<script>
  import {get} from '@/util'
  import BookInfo from '@/components/BookInfo'

  export default {
    data() {
      return {
        bookid: 0,
        info: ''
      }
    },
    methods: {
      async getDetail() {
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        wx.setNavigationBarTitle({
          title: info.data.title
        })
        this.info = info.data
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

<style scoped>

</style>
