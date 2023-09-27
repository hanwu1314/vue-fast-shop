import { POST, UPLOAD } from '@/services/request'

export default {
  register(data = {}) {
    return POST({
      url: '/business/base/register',
      params: data
    })
  },
  login(data = {}) {
    return POST({
      url: '/business/base/login',
      params: data
    })
  },
  profile(data = {}) {
    return UPLOAD({
      url: '/business/base/profile',
      params: data
    })
  },
  check(data = {}) {
    return POST({
      url: '/business/base/check',
      params: data
    })
  }
}
