<template>
  <van-nav-bar
    title="编辑收货地址"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft" />

  <van-address-edit
    :area-list="areaList"
    show-delete
    show-set-default
    :address-info="info"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete" />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { areaList } from '@vant/area-data'
import { ref, onMounted } from 'vue'
import { useCookies } from 'vue3-cookies'
import Api from '@/api/index'
import { showConfirmDialog, showNotify } from 'vant'

const Router = useRouter()
const Route = useRoute()
const { cookies } = useCookies()
const info = ref({})
const id = ref(Route.query.id)
const business = ref(cookies.get('business'))

onMounted(() => {
  getInfo()
})

const getInfo = async () => {
  let result = await Api.AddressInfo({ id: id.value, busid: business.value.id })

  if (result.code === 0) {
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500,
      onClose: () => {
        Router.back()
      }
    })

    return
  }

  let data = result.data

  info.value = {
    name: data.consignee,
    tel: data.mobile,
    areaCode: data.district,
    addressDetail: data.address,
    isDefault: data.status == 1 ? true : false
  }
}

const onSave = async (values) => {
  // 封装数据
  let data = {
    id: id.value,
    busid: business.value.id,
    consignee: values.name,
    mobile: values.tel,
    code: values.areaCode,
    address: values.addressDetail,
    status: values.isDefault === true ? 1 : 0
  }

  let result = await Api.AddressEdit(data)

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

const onDelete = () => {
  showConfirmDialog({
    title: '删除',
    message: '是否确认删除该收货地址？'
  })
    .then(async () => {
      let data = {
        id: id.value,
        busid: business.value.id
      }

      let result = await Api.AddressDel(data)

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
    })
    .catch(() => {})
}

const onClickLeft = () => {
  Router.back()
}
</script>
