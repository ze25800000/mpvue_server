<template>
  <div>
    <h1>杨泽你好</h1>
    <Todolist></Todolist>
  </div>
</template>

<script>
  import Todolist from '@/components/Todulist'

  export default {
    components: {Todolist}
  }
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>
