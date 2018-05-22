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
        const books = await get('/weapp/booklist')
        console.log(books)
        this.books = books.data.list
      }
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
