<template>
  <div>
    <div>
      <Card v-for="(book,index) in books" :key="index" :book="book"></Card>
    </div>
  </div>
</template>

<script>
  import {get} from '@/util'
  import Card from '@/components/Card'

  export default {
    data() {
      return {
        books: []
      }
    },
    methods: {
      async getList() {
        wx.showNavigationBarLoading()
        const books = await get('/weapp/booklist')
        this.books = books.data.list
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      }
    },
    onPullDownRefresh() {
      this.getList()
    },
    mounted() {
      this.getList()
    },
    components: {
      Card
    }
  }
</script>

<style scoped>

</style>
