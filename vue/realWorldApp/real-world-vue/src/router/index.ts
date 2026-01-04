import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventLayout from '@/views/event/EventLayout.vue'
import EventDetails from '@/views/event/EventDetails.vue'
import EventRegister from '@/views/event/EventRegister.vue'
import EventEdit from '@/views/event/EventEdit.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

// const savedScrollPositions = {}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: route =>({ page: parseInt(route.query.page as string) || 1 })
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      component: EventLayout,
      props: true,
      children: [ // child routes!!! remember!!!
        {
          path: '',
          name: 'event-details',
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
        },
      ],
    },
    // redirects for old links, this is one of the ways to do it
    // {
    //   path:"/event/:id",
    //   redirect:() => {
    //     return { name: 'event-details' }
    //   },
    //     children: [
    //     {path: 'register', redirect: () => ({ name: 'event-register' })},
    //     {path: 'edit', redirect: () => ({ name: 'event-edit' })},
    //     ]
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutView
    // },
    // another way to do redirects an alias
    {
      path:"/event/:afterEvent(.*)", // regex to match anything after /event/
      redirect: to =>{
        return { path: "events/" + to.params.afterEvent }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: "/404/:resource",
      name: "404Resource",
      component: NotFound,
      props: true
    },
    {
      path: '/:catchAll(.*)', // catch all unmatched routes
      name: 'not-found',
      component: NotFound
    },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  }
  ],
  scrollBehavior(to, from, savedPosition) {
    // return desired position
    if(savedPosition){
      return savedPosition;
    }
    return { left:0, top:0 }
  }
})
//   scrollBehavior(to, from, savedPosition) {
//     // return desired position
//     if(savedPosition){
//       return savedPosition;
//     }
//     if(to.name === "event-list"){
//       const position = savedScrollPositions[to.fullPath]
//       if(typeof position === "number"){
//         return {left:0, top: position}
//       }
//     }
//     return { left:0, top:0 }
//   }
// })

// router.beforeEach((to, from, next) => {
//   if (from.name === 'event-list') {
//     savedScrollPositions[from.fullPath] = window.scrollY
//   }
//   next()
// })

export default router;
