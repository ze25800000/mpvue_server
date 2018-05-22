<template>
  <div>
    <div>
      <TopSwiper :tops='tops'></TopSwiper>
      <Card v-for="(book,index) in books" :key="index" :book="book"></Card>
      <p class="text-footer" v-if="!more">
        没有更多数据
      </p>
    </div>
  </div>
</template>

<script>
  import {get} from '@/util'
  import Card from '@/components/Card'
  import TopSwiper from '@/components/TopSwiper'

  export default {
    data() {
      return {
        tops: [],
        books: [],
        page: 0,
        more: true
      }
    },
    methods: {
      async getList(init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        const books = await get('/weapp/booklist', {page: this.page})
        this.books = books.data.list
        if (this.books.length < 10 && this.page > 0) {
          this.more = false
        }
        if (init) {
          this.books = books.data.list
          wx.stopPullDownRefresh()
        } else {
          this.books = this.book.concat(books.data.list)
          console.log(this.books)
        }
        wx.hideNavigationBarLoading()
      },
      async getTop() {
        const tops = await get('/weapp/top')
        this.tops = tops.data.list
      }
    },
    onPullDownRefresh() {
      this.getList(true)
    },
    onReachBottom() {
      if (!this.more) {
        return false
      }
      this.page = this.page + 1
      this.getList(false)
    },
    mounted() {
      this.getList(true)
      this.getTop()
    },
    components: {
      Card,
      TopSwiper
    }
  }
</script>

<style scoped>

</style>
