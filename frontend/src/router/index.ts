import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

const PlaceholderPage = () => import('@/views/PlaceholderPage.vue')

/** §5.5 + `认定工作原型图/common.js`（normalizeSidebar 后）路径映射 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { title: '首页' },
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: PlaceholderPage,
          meta: { title: '数据面板', subtitle: '合并 data面板 / 数据面板 单一入口（§5.5.5）' },
        },
        {
          path: 'projects',
          name: 'projects-home',
          component: PlaceholderPage,
          meta: { title: '任务准备', subtitle: '对应原型「项目管理首页」— 项目列表 / 工作台入口' },
        },
        {
          path: 'projects/order',
          name: 'projects-order',
          component: PlaceholderPage,
          meta: { title: '我要下单' },
        },
        {
          path: 'archives',
          name: 'archives-root',
          component: PlaceholderPage,
          meta: { title: '任务档案', subtitle: '资料档案入口（考试材料 / 考场 / 考生等见后续子路由）' },
        },
        {
          path: 'flow/task-select',
          name: 'flow-task-select',
          component: PlaceholderPage,
          meta: { title: '任务选择' },
        },
        {
          path: 'flow/prep/students',
          name: 'flow-prep-students',
          component: PlaceholderPage,
          meta: { title: '学员资料', subtitle: 'STEP01 花名册 / 认定筹备-学员导入' },
        },
        {
          path: 'flow/prep/examiners',
          name: 'flow-prep-examiners',
          component: PlaceholderPage,
          meta: { title: '考评员配置' },
        },
        {
          path: 'flow/prep/rooms',
          name: 'flow-prep-rooms',
          component: PlaceholderPage,
          meta: { title: '考场配置' },
        },
        {
          path: 'flow/pre-exam',
          name: 'flow-pre-exam',
          component: PlaceholderPage,
          meta: { title: '认定前' },
        },
        {
          path: 'flow/theory',
          name: 'flow-theory',
          component: PlaceholderPage,
          meta: { title: '理论笔试' },
        },
        {
          path: 'flow/practical',
          name: 'flow-practical',
          component: PlaceholderPage,
          meta: { title: '实操考试' },
        },
        {
          path: 'flow/archive',
          name: 'flow-archive',
          component: PlaceholderPage,
          meta: { title: '认定归档' },
        },
        {
          path: 'flow/subsidy',
          name: 'flow-subsidy',
          component: PlaceholderPage,
          meta: { title: '申领补贴' },
        },
        {
          path: 'material/examiners',
          name: 'material-examiners',
          component: PlaceholderPage,
          meta: { title: '考评员信息' },
        },
        {
          path: 'material/exam-rooms',
          name: 'material-exam-rooms',
          component: PlaceholderPage,
          meta: { title: '考场信息' },
        },
        {
          path: 'material/devices',
          name: 'material-devices',
          component: PlaceholderPage,
          meta: { title: '考试设备' },
        },
      ],
    },
  ],
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || '职业技能认定管理系统'
  document.title = title === '首页' ? '职业技能认定管理系统' : `${title} · 职业技能认定管理系统`
})

export default router
