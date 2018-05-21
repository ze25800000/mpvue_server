<template>
  <div>
    <div>
      <input type="text" v-model="mytodo">
      <button @click="handleClick">添加</button>
      <button @click="clear">清空</button>
    </div>
    <ul>
      <li :class="{'done':todo.done}" v-for="(todo,index) in todos" @click="toggle(index)" :key="index">
        {{index+1}}{{todo.text}}
      </li>
    </ul>
    <p>{{remain}}/{{todos.length}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: 'hello yangze',
        subTitle: 'hello yanmengying',
        mytodo: '',
        todos: [
          {text: '吃饭', done: false},
          {text: '睡觉', done: false},
          {text: '写代码', done: false}
        ]
      }
    },
    computed: {
      remain() {
        return this.todos.filter(v => !v.done).length
      }
    },
    methods: {
      handleClick() {
        this.todos.push({
          text: this.mytodo,
          done: false
        })
        this.mytodo = ''
      },
      toggle(i) {
        this.todos[i].done = !this.todos[i].done
      },
      clear() {
        this.todos = this.todos.filter(v => !v.done)
      }
    }
  }
</script>

<style scoped>
  li.done {
    text-decoration: line-through;
    color: red;
    font-weight: bold;
  }
</style>
