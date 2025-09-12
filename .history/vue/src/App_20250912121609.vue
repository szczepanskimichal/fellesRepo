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
  <main>
   <section class="greeting">
    <h2 class="tittle">What's up, <input type="text" placeholder="name here" v-model=""v-model="name"></input></h2>
   </section>
</main>
</template>