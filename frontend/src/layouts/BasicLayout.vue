<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const collapsed = ref(false)
const route = useRoute()

const selectedKeys = () => {
  const name = route.name
  return name ? [String(name)] : ['home']
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
      <a-menu :selected-keys="selectedKeys()" mode="inline">
        <a-menu-item key="home">
          <router-link to="/">首页</router-link>
        </a-menu-item>
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
