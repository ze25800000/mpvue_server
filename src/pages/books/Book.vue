<template>
  <div>
    <div>
      <div v-for="(book,index) in books" :key="index">{{book.title}}</div>
    </div>
  </div>
</template>

<script>
  import {get} from '@/util'

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
    }
  }
</script>

<style scoped>

</style>
