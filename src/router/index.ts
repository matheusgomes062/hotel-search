import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/booking-status',
      name: 'booking-status',
      component: () => import('../views/BookingStatusView.vue')
    }
  ]
})

export default router
