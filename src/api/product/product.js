import { POST } from '@/services/request'

export default {
  ProductIndex(data = {}) {
    return POST({
      url: '/product/product/index',
      params: data
    })
  }
}
