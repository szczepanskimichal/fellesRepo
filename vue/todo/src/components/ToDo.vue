<script lang="ts">
import { ref } from 'vue'

interface ToDoItem {
  id: number
  text: string
}

export default {
  setup() {
    const header = ref('To-Do List')
    const items = ref<ToDoItem[]>([
      { id: 1, text: 'Learn Vue.js' },
      { id: 2, text: 'Build a to-do app' },
      { id: 3, text: 'Master TypeScript' },
    ])
    return {
      header,
      items
    }
  }
}
</script>
<template>
  <h1>{{ header }}</h1>
  <inpput class="input" placeholder="Add new task"/>
  <button type="submit">Add Task</button>
  <ul>
    <li v-for="({id, text},index) in items" :key="id">
      {{ index + 1 }}. {{ text }}
    </li>
  </ul>
</template>
