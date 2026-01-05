<script lang="ts">
// import { ref, onMounted, computed } from 'vue';
// import axios from 'axios';
import EventService from '../services/EventService';
import { useRouter } from 'vue-router';

import EventCard from '../components/EventCard.vue';
// import { EventItem } from '@/types';
// If you have a types file, update the path below accordingly:
import type { EventItem } from '../types';
// Or, if you don't have a types file, define EventItem here as a temporary fix:
//
// type EventItem = {
//   id: number;
//   // add other properties as needed
// };

// Remove defineProps usage; use props from Options API instead

export default {
  name: 'EventListView',
  components: { EventCard },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      events: null as EventItem[] | null,
      totalEvents: 0
    }
  },
  computed: {
    hasNextPage(): boolean {
      const totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    }
  },
  watch: {
    page() {
      this.events = null;
      this.fetchEvents();
    }
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      EventService.getEvents(3, this.page)
        .then((response: any) => {
          this.events = response.data;
          this.totalEvents = response.headers['x-total-count'];
        })
        .catch(() => {
          this.$router.push({ name: 'NetworkError' });
        });
    }
  }
}
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
