export default [
  {
    path: 'cart/index',
    name: 'CartIndex',
    component: () => import('components/product/cart/Index.vue'),
    meta: {
      auth: true
    }
  }
]
