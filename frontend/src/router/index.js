import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/page1',
    },
    {
      path: '/page:pageNumber',
      component: HomeView
    },{
      path: '/post/:id_post',
      name: 'post',
      component: () => import('../views/PostView.vue'),
    },
    {
      path: '/photos',
      name: 'photos',
      component: HomeView
    },
    {
      path: '/videos',
      name: 'videos',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView
    },
  ]
})

export default router
