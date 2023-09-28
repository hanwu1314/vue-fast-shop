import { POST } from '@/services/request'

export default {
  HomeIndex(data = {}) {
    return POST({
      url: '/index/index',
      params: data
    })
  }
}
