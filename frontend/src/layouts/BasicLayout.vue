<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

const collapsed = ref(false)
const route = useRoute()
const router = useRouter()

const selectedKeys = ref<string[]>(['home'])
const openKeys = ref<string[]>([])

function computeOpenKeys(path: string): string[] {
  const keys: string[] = []
  if (path.startsWith('/projects') || path.startsWith('/archives')) {
    keys.push('menu-task-mgmt')
  }
  if (path.startsWith('/flow')) {
    keys.push('menu-flow')
    if (path.startsWith('/flow/prep')) keys.push('flow-prep-nest')
    if (path === '/flow/theory' || path === '/flow/practical') keys.push('flow-mid-nest')
    if (path === '/flow/archive' || path === '/flow/subsidy') keys.push('flow-after-nest')
  }
  if (path.startsWith('/material')) keys.push('menu-material')
  return keys
}

function syncMenuFromRoute() {
  selectedKeys.value = [String(route.name ?? 'home')]
  openKeys.value = computeOpenKeys(route.path)
}

watch(() => route.fullPath, syncMenuFromRoute, { immediate: true })

function go(path: string) {
  void router.push(path)
}
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      :width="220"
      :collapsed-width="80"
      breakpoint="lg"
      theme="light"
      style="border-right: 1px solid #e2e8f0"
    >
      <div
        style="
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #1e293b;
          border-bottom: 1px solid #e2e8f0;
        "
      >
        <span v-if="!collapsed">认定管理</span>
        <span v-else>认定</span>
      </div>
      <a-menu
        v-model:open-keys="openKeys"
        v-model:selected-keys="selectedKeys"
        mode="inline"
      >
        <a-menu-item key="home" @click="go('/')">
          首页
        </a-menu-item>
        <a-menu-item key="dashboard" @click="go('/dashboard')">
          数据面板
        </a-menu-item>

        <a-sub-menu key="menu-task-mgmt" title="任务管理">
          <a-menu-item key="projects-home" @click="go('/projects')">
            任务准备
          </a-menu-item>
          <a-menu-item key="projects-order" @click="go('/projects/order')">
            我要下单
          </a-menu-item>
          <a-menu-item key="archives-root" @click="go('/archives')">
            任务档案
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="menu-flow" title="认定流程">
          <a-menu-item key="flow-task-select" @click="go('/flow/task-select')">
            任务选择
          </a-menu-item>

          <a-sub-menu key="flow-prep-nest" title="认定筹备">
            <a-menu-item key="flow-prep-students" @click="go('/flow/prep/students')">
              学员资料
            </a-menu-item>
            <a-menu-item key="flow-prep-examiners" @click="go('/flow/prep/examiners')">
              考评员配置
            </a-menu-item>
            <a-menu-item key="flow-prep-rooms" @click="go('/flow/prep/rooms')">
              考场配置
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item key="flow-pre-exam" @click="go('/flow/pre-exam')">
            认定前
          </a-menu-item>

          <a-sub-menu key="flow-mid-nest" title="认定中">
            <a-menu-item key="flow-theory" @click="go('/flow/theory')">
              理论笔试
            </a-menu-item>
            <a-menu-item key="flow-practical" @click="go('/flow/practical')">
              实操考试
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="flow-after-nest" title="认定后">
            <a-menu-item key="flow-archive" @click="go('/flow/archive')">
              认定归档
            </a-menu-item>
            <a-menu-item key="flow-subsidy" @click="go('/flow/subsidy')">
              申领补贴
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>

        <a-sub-menu key="menu-material" title="物料库管理">
          <a-menu-item key="material-examiners" @click="go('/material/examiners')">
            考评员信息
          </a-menu-item>
          <a-menu-item key="material-exam-rooms" @click="go('/material/exam-rooms')">
            考场信息
          </a-menu-item>
          <a-menu-item key="material-devices" @click="go('/material/devices')">
            考试设备
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="
          background: #fff;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
        "
      >
        <span style="font-size: 18px; color: #1e293b">
          {{ route.meta.title || '职业技能认定管理系统' }}
        </span>
        <a-button type="text" @click="collapsed = !collapsed">
          <template #icon>
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
          </template>
        </a-button>
      </a-layout-header>
      <a-layout-content style="margin: 16px; background: var(--skill-bg, #f8fafc); padding: 16px">
        <div
          style="
            background: #fff;
            border-radius: 14px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
            min-height: 480px;
          "
        >
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
