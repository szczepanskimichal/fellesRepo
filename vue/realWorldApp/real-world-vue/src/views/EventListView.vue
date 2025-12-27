<script setup>
import EventCard from '@/components/EventCard.vue';
import {ref, onMounted} from 'vue';
// import axios from 'axios';
import EventService from '@/services/EventService';

const events = ref(null)

onMounted(()=>{
  // axios.get("https://my-json-server.typicode.com/szczepanskimichal/mock-api/events")
  EventService.getEvents()
  .then((response)=>{
      events.value = response.data;
      // console.log("events", response.data);
    })
    .catch((error)=>{
      console.log(error);
    });
});
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
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
