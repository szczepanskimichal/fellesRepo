<script setup>
import { ref } from 'vue'
import { useTodoListStore } from '@/stores/todoList'

const todo = ref('')
const store = useTodoListStore()

function addTodo() {
  const value = todo.value.trim()
  if (!value) return

  store.addTodo(value)
  todo.value = ''
}
</script>

<template>
  <div>
    <form @submit.prevent="addTodo">
      <input type="text" placeholder="Add new" v-model="todo" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>
<style scoped>
form {
  margin-bottom: 15px;
}
input {
  margin-top: 25px;
  margin-bottom: 15px;
  height: 20px;
  width: 50%;
}
button {
  margin-left: 30px;
  background-color: #2f6089;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-weight: 800;
  color: white;
  width: 15%;
}
.alert-div {
  min-height: 25px;
}
.alert {
  color: #d1495b;
  font-size: 1em;
  font-weight: 600;
}
</style>