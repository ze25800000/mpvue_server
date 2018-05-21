<script>
  import {get} from './util'

  export default {
    async created() {
      const res = await get('/weapp/demo')
      console.log('小程序启动了: ', res)
    }
  }
</script>

<style scoped>

</style>
