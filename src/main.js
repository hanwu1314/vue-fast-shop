import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
import Router from './routers/index'

// 引入Vant UI
import Vant from 'vant'

// 引入组件样式
import 'vant/lib/index.css'

// 权限管理
import '@/permission'

createApp(App).use(Router).use(Vant).mount('#app')

// 前置路由守卫
Router.beforeEach((to, from, next) => {
  let auth = to.meta.auth === true ? true : false

  if (auth === true) {
    next('/business/base/login')
  } else {
    next()
  }
})
