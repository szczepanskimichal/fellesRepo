import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Adopt from '@/views/Adopt.vue'
import AdoptACat from '@/views/AdoptACat.vue'
import Contact from '@/views/Contact.vue'
import CatDetails from '@/views/CatDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/adopt',
      name: 'adopt',
      component: Adopt,
    },
    {
      path: '/adopt-a-cat',
      name: 'adopt-a-cat',
      component: AdoptACat,
    },
    {
      path: '/cat/:name',
      name: 'cat-details',
      component: CatDetails,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    // Redirect old route names to new ones
    {
      path: '/adopt-cat',
      redirect: '/adopt-a-cat',
    },
  ],
})

export default router
