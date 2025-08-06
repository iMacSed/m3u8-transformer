import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('@/pages/Home.vue')
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

export default router
