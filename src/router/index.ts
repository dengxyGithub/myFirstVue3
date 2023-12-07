import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'login',
      path: '/',
      component:()=>import('@/views/login/index.vue')
    },
    {
      name: 'layout',
      path: '/layout',
      component:()=>import('@/views/layout/index.vue')
    },
    {
      name: '404',
      path: '/404',
      component:()=>import('@/views/404/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404',
      name:'Any'
    }
  ]
})

export default router
