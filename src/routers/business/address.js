export default [
  {
    path: 'address/index',
    name: 'AddressIndex',
    component: () => import('components/business/address/Index.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: 'address/add',
    name: 'AddressAdd',
    component: () => import('components/business/address/Add.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: 'address/edit',
    name: 'AddressEdit',
    component: () => import('components/business/address/Edit.vue'),
    meta: {
      auth: true
    }
  }
]
