<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        autocomplete="false"
        class="new-todo"
        autofocus placeholder="请输入待办事项"
        v-model="data.newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main">
      <input type="checkbox" id="toggle-all" class="toggle-all" v-model="allDone"/>
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li v-for="todo in filterTodos" :key="todo.id" :class="{ completed: todo.completed, editing: todo == data.editedTodo}">
          <div class="view">
            <input type="checkbox" class="toggle" v-model="todo.completed"/>
            <label @dblclick="editTodo(todo)">{{todo.msg}}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            type="text"
            class="edit"
            v-model="todo.msg"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="data.todos.length" v-cloak>
      <span class="todo-count">
        <strong>{{remaining}}</strong>left
      </span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{selected: visibility == 'all'}">All</a>
        </li>
        <li>
          <a href="#/active" :class="{selected: visibility == 'active'}">Active</a>
        </li>
        <li>
          <a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="data.todos.length > remaining">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { reactive, watch, computed } from 'vue'
const STORAGE_KEY = "todos-vuejs-3.0"
const todoStorage = {
  fetch: function(){
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const filters = {
  all: function(todos){
    return todos
  },
  active: function(todos){
    return todos.filter(function(todo){
      return !todo.completed
    })
  },
  completed: function(todos){
    return todos.filter(function(todo){
      return todo.completed
    })
  }
}

export default {
  name: 'TodoApp',
  setup(){
    let todos = todoStorage.fetch()

    let data = reactive({
      todos,
      newTodo: "",
      editedTodo: null,
      visibility: "all",
      beforeEditCache: ""
    })

    let addTodo = function(){
      let value = data.newTodo && data.newTodo.trim()
      if(!value){return}
      data.todos.push({
        id: todoStorage.uid++,
        msg: value,
        completed: false
      })
      todoStorage.save(data.todos)
      data.newTodo = ""
      console.log(todoStorage)
    }

    let removeTodo = function(todo){
      data.todos.splice(data.todos.indexOf(todo), 1)
    }

    let editTodo = function(todo){
      data.beforeEditCache = todo.msg
      data.editedTodo = todo
    }

    let doneEdit = function (todo) {
      if(!data.editedTodo) {
        return
      }
      data.editedTodo = null
      todo.msg = todo.msg.trim()
      if(!todo.msg){
        removeTodo(todo)
      }
    }

    let removeCompleted = function() {
      data.todos = filters.active(data.todos)
    }

    let onHashChange = function(){
      let visibility = window.location.hash.replace(/#\/?/, "")
      if(filters[visibility]){
        data.visibility = visibility
      } else {
        window.loaction.hash = ""
        data.visibility = "all"
      }
    }

    window.addEventListener("hashchange", onHashChange)

    let filterTodos = computed(() => {
      return filters[data.visibility](data.todos)
    })


    let remaining = computed(() => {
      return filters.active(data.todos).length
    })

    let allDone = computed({
      get: () => {
        console.log('remaining', remaining)
        return remaining === 0
      },
      set: val => {
        data.todos.forEach(todo => {
          todo.completed = val
        })
      }
    })

    watch(
      () => data.todos,
      (todos) => {
        todoStorage.save(todos)
        console.log(todos, remaining)
      },
      {deep: true}
    )

    return {
      data,
      addTodo,
      allDone,
      filterTodos,
      remaining,
      editTodo,
      doneEdit,
      removeTodo,
      removeCompleted,
    }
  }
}

</script>

<style scoped>

</style>