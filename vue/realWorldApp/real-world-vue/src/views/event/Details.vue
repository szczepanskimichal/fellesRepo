// eslint-disable-next-line vue/multi-word-component-names
<script setup>
const { event } = defineProps(['event'])
</script>
<template>
  <div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
