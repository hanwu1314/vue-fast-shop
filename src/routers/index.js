// 引入vue-router的方法
import { createRouter, createWebHistory } from 'vue-router'

// 引入每个目录下的index.js文件
const ModulesFile = import.meta.glob('./*/index.js', { eager: true })

// 所有路由集合
const RouterList = []

// 提取每个对象下的值 同步获取
Object.values(ModulesFile).map(async (mod) => {
  if (mod.default) {
    RouterList.push(...mod.default)
  }
})

RouterList.push({
  path: '/',
  name: 'Home',
  component: () => import('components/Home.vue')
})

export default createRouter({
  history: createWebHistory(),
  routes: RouterList
})
