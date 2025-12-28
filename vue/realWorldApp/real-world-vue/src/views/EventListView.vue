<script setup>
import EventCard from '@/components/EventCard.vue';
import {ref, onMounted, watch} from 'vue';
// import axios from 'axios';
import EventService from '@/services/EventService';

const props = defineProps(['page']);
const events = ref(null)
const fetchEvents =()=>{
 EventService.getEvents(2, props.page)
  .then((response)=>{
      events.value = response.data;
      // console.log("events", response.data);
    })
    .catch((error)=>{
      console.log(error);
    });
}
onMounted(()=>{
  fetchEvents();
});
watch(()=> props.page, ()=>{
  events.value = null;
  fetchEvents();
});
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <router-link
    :to="{name: 'event-list', query: {page: page -1}}"
    rel="prev"
    v-if="page !== 1"
    >Previous Page</router-link>
    <router-link
    :to="{name: 'event-list', query: {page: page +1}}"
    rel="next"
    v-if="events && events.length === 2"
    >Next Page</router-link>
  </div>
</template>
<style>
  .events{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .h2{
    font-size: 20px;
  }
</style>
