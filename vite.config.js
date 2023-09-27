import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入路径模块
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      vue: 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
      // "styles": path.resolve(__dirname, "src/styles"),
      // "plugins": path.resolve(__dirname, "src/plugins"),
      // "views": path.resolve(__dirname, "src/views"),
      // "layouts": path.resolve(__dirname, "src/layouts"),
      // "utils": path.resolve(__dirname, "src/utils"),
      // "apis": path.resolve(__dirname, "src/apis"),
      // "dirs": path.resolve(__dirname, "src/directives"),
    }
  },
  server: {
    proxy: {
      '/shop': {
        target: 'http://fast.com/shop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/shop/, '')
      }
    },
    hmr: {
      overlay: false
    }
  },
  plugins: [vue()]
})
