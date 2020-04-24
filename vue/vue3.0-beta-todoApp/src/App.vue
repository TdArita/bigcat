<template>
  <div id="app">
    <!-- <h1>{{title.name}}</h1>
    <div>
      <h1>{{user}}</h1>
      <button @click="updateUser">修改</button>
    </div>
    <div>当前点击：{{computedCount}}</div>
    <button @click="increment">点击</button> -->
    <TodoApp/>
  </div>
</template>

<script>
import TodoApp from './components/TodoApp'
// import { reactive, ref, onMounted, computed } from 'vue'

export default {
  name: 'App',
  components: {
    TodoApp
  },
  // setup(){
  //   onMounted(() => {
  //     console.log('vue3 启动')
  //   })
  //   const title = reactive({
  //     name: '学习Vue3.0'
  //   })
  //   const user = ref('arita')
  //   const count = ref(0)
  //   const updateUser = () => {
  //     user.value = 'arita5'
  //   }
  //   const increment = () => {
  //     count.value++
  //     title.name = '学习Vue3.0+' + count.value
  //   }
  //   const computedCount = computed(() => {return count.value*10})
  //   return {title, user, updateUser, count, increment, computedCount}
  // }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
