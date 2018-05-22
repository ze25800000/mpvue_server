<template>
  <div>图书ID：{{bookid}}</div>
</template>

<script>
  import {get} from '@/util'

  export default {
    data() {
      return {
        bookid: 0
      }
    },
    methods: {
      async getDetail() {
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        console.log(info)
      }
    },
    mounted() {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
    }
  }
</script>

<style scoped>

</style>
