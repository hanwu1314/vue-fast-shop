import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
import Router from './routers/index'

// 引入Vant UI
import Vant, { showNotify } from 'vant'

// 引入组件样式
import 'vant/lib/index.css'

createApp(App).use(Router).use(Vant).mount('#app')

import { useCookies } from 'vue3-cookies'
import Api from '@/api/index'

const { cookies } = useCookies()

// 写前置路由守卫
Router.beforeEach(async (to, from, next) => {
  let auth = to.meta.auth === true ? true : false

  if (auth === true) {
    let business = cookies.get('business') ? cookies.get('business') : {}

    if (!business || JSON.stringify(business) === '{}') {
      showNotify({
        type: 'warning',
        message: '请先登录',
        duration: 1500
      })

      next('/business/base/login')

      return
    }

    let id = business.id ?? 0
    let mobile = business.mobile ?? ''

    let data = {
      id,
      mobile
    }

    let result = await Api.check(data)

    if (result.code === 0) {
      showNotify({
        type: 'warning',
        message: result.msg,
        duration: 1500
      })

      cookies.remove('business')

      next('/business/base/login')

      return
    }

    cookies.set('business', result.data)

    next()
  } else {
    next()
  }
})
