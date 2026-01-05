import { defineStore } from 'pinia';
import type { EventItem } from '@/types';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [] as EventItem[],
    totalEvents: 0,
  }),
  actions: {
    setEvents(events: EventItem[], totalEvents: number) {
      this.events = events;
      this.totalEvents = totalEvents;
    },
  },
});
