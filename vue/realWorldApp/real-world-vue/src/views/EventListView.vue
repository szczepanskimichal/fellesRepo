<script setup>
import EventCard from '@/components/EventCard.vue';
import {ref, onMounted, watch, defineProps, computed} from 'vue';
// import axios from 'axios';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';

const props = defineProps(['page']);
const events = ref(null)
const totalEvents = ref(0);
const router = useRouter();
const hasNextPage=computed(()=>{
  const totalPages = Math.ceil(totalEvents.value /2);
  // return props.page < totalPages ? true : false;
  return props.page < totalPages;
})

const fetchEvents =()=>{
 EventService.getEvents(3, props.page) // this is for dispalying 3 events per page!!!
  .then((response)=>{
      events.value = response.data;
      totalEvents.value=response.headers['x-total-count']; // this is custom header from json-server
      // console.log("events", response.data);
    })
    .catch(()=>{
      // console.log(error);
      router.push({name: 'NetworkError'});
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
      <div class="pagination">
          <router-link
              id="page-prev"
              :to="{name: 'event-list',query: {page: page -1}}"
              rel="prev"
              v-if="page !== 1"
              >
              &#60; Previous Page
          </router-link>
          <router-link
            id="page-next"
            :to="{name: 'event-list',query: {page: page +1}}"
              rel="next"
              v-if="hasNextPage"
            >Next Page &#62;
          </router-link>
        </div>
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
  .pagination {
	display: flex;
	width: 290px;
}
.pagination a {
	flex: 1;
	text-decoration: none;
	color: #2c3e50;
}

#page-prev {
	text-align: left;
}

#page-next {
	text-align: right;
}
</style>
