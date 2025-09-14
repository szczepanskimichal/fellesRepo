import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/SearchView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: "/search",
    name:"search",
    component: () => import('../views/SearchView.vue')
  },
  {
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
