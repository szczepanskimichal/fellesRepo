// eslint-disable-next-line vue/multi-word-component-names
<script lang="ts" setup>
interface Event {
  id: number;
  title: string;
  description: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}
const props = defineProps<{
  event: Event
}>()
</script>
<template>
  <div>
    <p>{{ props.event.time }} on {{ props.event.date }} @ {{ props.event.location }}</p>
    <p>{{ props.event.description }}</p>
  </div>
</template>
