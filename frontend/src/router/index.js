import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import { useUserStore } from '../stores/user'

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
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const userId = userStore.userId;
  const token = userStore.token;
  
  if(to.meta.requiresAuth && (!userId || !token)) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router
