import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    component: () => import('../views/Demo.vue'),
  }
]

// 最新版本vue-router路由通过createRouter
export default createRouter({
  history: createWebHashHistory(),
  routes,
})