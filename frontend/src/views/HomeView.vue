<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchHealth, type HealthData } from '@/api/health'

const loading = ref(false)
const health = ref<HealthData | null>(null)
const errorText = ref<string | null>(null)

onMounted(async () => {
  loading.value = true
  errorText.value = null
  try {
    const { data } = await fetchHealth()
    if (data.code !== 0) {
      errorText.value = data.message || '接口返回异常'
      return
    }
    health.value = data.data
  } catch {
    errorText.value = '无法连接后端（请确认已启动 API 与 Docker 中的 MySQL）'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <a-typography-title :level="4">系统骨架</a-typography-title>
  <a-typography-paragraph type="secondary">
    Vue 3 + Vite + Pinia + Ant Design Vue，后端 Spring Boot 3 + MyBatis-Plus + Flyway + MySQL。
  </a-typography-paragraph>

  <a-spin :spinning="loading">
    <a-alert v-if="errorText" type="warning" :message="errorText" show-icon style="margin-bottom: 16px" />
    <a-descriptions v-if="health" bordered title="GET /api/v1/health" size="small">
      <a-descriptions-item label="status">{{ health.status }}</a-descriptions-item>
      <a-descriptions-item label="service">{{ health.service }}</a-descriptions-item>
      <a-descriptions-item label="time">{{ health.time }}</a-descriptions-item>
      <a-descriptions-item v-if="health.database" label="MySQL">
        {{ health.database.status }}
        <template v-if="health.database.metaRows != null">
          （system_meta 行数：{{ health.database.metaRows }}）
        </template>
      </a-descriptions-item>
    </a-descriptions>
    <a-empty v-else-if="!loading && !errorText" description="暂无数据" />
  </a-spin>
</template>
