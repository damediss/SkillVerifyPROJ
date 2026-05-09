import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite 5.x；若升级到 Vite 6，请在本地执行 production build 验证（部分 Windows 环境曾出现 esbuild 转译异常）
export default defineConfig({
  plugins: [vue()],
  // 加密盘等环境下可关闭依赖预构建，避免 esbuild 读 node_modules 报错（Unexpected "\x88"）。
  optimizeDeps: {
    noDiscovery: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
