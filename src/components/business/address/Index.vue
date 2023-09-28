<template>
  <van-nav-bar
    title="我的收货地址"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft" />

  <van-address-list
    v-model="state.AddressId"
    :list="state.list"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
    @select="onSelected" />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import Api from '@/api/index'
import { showNotify } from 'vant'

const Router = useRouter()
const { cookies } = useCookies()
const state = reactive({
  AddressId: 0,
  list: [],
  business: cookies.get('business')
})

onMounted(() => {
  getAddressData()
})

const getAddressData = async () => {
  let result = await Api.AddressIndex({ busid: state.business.id })

  if (result.code === 0) {
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500
    })
    return
  }

  let list = []

  for (let item of result.data) {
    list.push({
      id: item.id,
      name: item.consignee,
      tel: item.mobile,
      address: item.region_text + item.address,
      isDefault: item.status == 1 ? true : false
    })

    if (item.status == 1) {
      state.AddressId = item.id
    }
  }

  state.list = list
}

const onSelected = async (item) => {
  let data = {
    busid: state.business.id,
    id: item.id
  }

  let result = await Api.AddressSelected(data)

  if (result.code === 0) {
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500
    })
    return
  }

  await getAddressData()

  if (result.code === 1) {
    showNotify({
      type: 'success',
      message: result.msg,
      duration: 1500
    })
    return
  }
}

const onAdd = () => {
  Router.push('/business/address/add')
}

const onEdit = () => {}

const onClickLeft = () => {
  Router.back()
}
</script>
