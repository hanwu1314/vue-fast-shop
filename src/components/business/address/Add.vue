<template>
  <van-nav-bar
    title="添加收货地址"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft" />

  <van-address-edit
    :area-list="areaList"
    show-set-default
    :address-info="state.info"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { areaList } from '@vant/area-data'
import { reactive } from 'vue'
import { useCookies } from 'vue3-cookies'
import Api from '@/api/index'
import { showNotify } from 'vant'

const Router = useRouter()
const { cookies } = useCookies()
const state = reactive({
  business: cookies.get('business'),
  info: {}
})

state.info = {
  name: state.business.nickname,
  tel: state.business.mobile
}

const onSave = async (values) => {
  // 封装数据
  let data = {
    busid: state.business.id,
    consignee: values.name,
    mobile: values.tel,
    code: values.areaCode,
    address: values.addressDetail,
    status: values.isDefault === true ? 1 : 0
  }

  let result = await Api.AddressAdd(data)

  if (result.code === 0) {
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500
    })

    return
  } else {
    showNotify({
      type: 'success',
      message: result.msg,
      duration: 1500,
      onClose: () => {
        Router.back()
      }
    })

    return
  }
}

const onClickLeft = () => {
  Router.back()
}
</script>
