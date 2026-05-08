import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: '首页' },
    },
  ],
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || '职业技能认定管理系统'
  document.title = title
})

export default router
