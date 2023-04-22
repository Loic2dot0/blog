import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post',
      name: 'post',
      component: PostView,
      redirect: '/post/page1',
    },
    {
      path: '/post/page:pageNumber',
      name: 'postpage',
      component: PostView
    },{
      path: '/post/:id_post',
      name: 'postone',
      component: () => import('../views/PostOneView.vue'),
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
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    }
  ]
})

export default router
