<script setup>
import {ref, onMounted, computed, watch} from 'vue'

const todo = ref([])
const name = ref('')

const input_content = ref('')
const input_cateegory = ref(null)

const todo_asc = computed(() => {
  return [...todo.value].sort((a, b) => a.createdAt - b.createdAt)
})
</script>



<template>
   <p>
    hello world
   </p>
</template>