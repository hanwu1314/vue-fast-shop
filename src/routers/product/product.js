export default [
  {
    path: 'product/index',
    name: 'ProductIndex',
    component: () => import('components/product/product/Index.vue')
  },
  {
    path: 'product/info',
    name: 'ProductInfo',
    component: () => import('components/product/product/Info.vue')
  }
]
