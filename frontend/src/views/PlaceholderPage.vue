<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const subtitle = computed(() => (route.meta.subtitle as string) || '占位页：后续迭代接入接口与表单。')
</script>

<template>
  <div>
    <a-typography-title :level="4">{{ route.meta.title }}</a-typography-title>
    <a-typography-paragraph type="secondary">
      {{ subtitle }}
    </a-typography-paragraph>
    <a-typography-paragraph type="secondary">
      路由：<code>{{ route.path }}</code>
    </a-typography-paragraph>
  </div>
</template>
