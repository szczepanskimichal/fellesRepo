// eslint-disable-next-line vue/multi-word-component-names
<script lang="ts" setup>
import { EventItem } from '../../types';

const props = defineProps<{
  event: EventItem
}>();
</script>
<template>
  <div>
    <p>{{ props.event.time }} on {{ props.event.date }} @ {{ props.event.location }}</p>
    <p>{{ props.event.description }}</p>
  </div>
</template>
