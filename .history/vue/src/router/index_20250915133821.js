import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/AboutView.vue';
import Claim from '../components/Claim.vue';
const routes = [
  {
    path: '/claim',
    name: 'Claim',
    component: Claim,
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
