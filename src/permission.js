/**所有权限控制相关的在此文件 */
import router from './routers'

router.beforeEach((to, from, next) => {
  let auth = to.meta.auth === true ? true : false

  if (auth === true) {
    next('/business/base/login')
  } else {
    next()
  }
})
