import { POST } from '@/services/request'

export default {
  CartAdd(data = {}) {
    return POST({
      url: '/product/cart/add',
      params: data
    })
  },
  CartIndex(data = {}) {
    return POST({
      url: '/product/cart/index',
      params: data
    })
  }
}
