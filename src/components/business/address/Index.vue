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
    @edit="onEdit" />
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'

const Router = useRouter()
const { cookies } = useCookies()
const state = reactive({
  AddressId: 0,
  list: [],
  business: cookies.get('business')
})

const onAdd = () => {
  Router.push('/business/address/add')
}

const onEdit = () => {}

const onClickLeft = () => {
  Router.back()
}
</script>
