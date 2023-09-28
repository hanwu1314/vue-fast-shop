<template>
  <van-nav-bar
    title="基本资料"
    left-text="返回"
    left-arrow
    fixed
    @click-left="onClickLeft" />

  <div class="h50"></div>
  <div class="clear"></div>

  <div class="user">
    <div class="user-image">
      <img :src="business.avatar_cdn" alt="" />
    </div>
  </div>

  <div class="form">
    <van-form @submit="onSubmit">
      <van-field
        v-model="business.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        readonly
        colon
        label-align="right" />

      <van-field
        v-model="business.nickname"
        name="nickname"
        label="昵称"
        placeholder="昵称"
        colon
        label-align="right"
        :rules="[{ required: true, message: '请输入昵称' }]" />

      <van-field
        v-model="business.email"
        name="email"
        type="email"
        label="邮箱"
        placeholder="邮箱"
        colon
        label-align="right"
        :rules="[{ required: true, message: '请输入邮箱' }]" />

      <van-field
        v-model="business.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码为空不修改密码"
        colon
        label-align="right" />

      <van-field name="gender" label="性别" colon label-align="right">
        <template #input>
          <van-radio-group v-model="business.gender" direction="horizontal">
            <van-radio name="0">保密</van-radio>
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="business.region_text"
        is-link
        readonly
        label="地区选择"
        placeholder="请选择地区"
        @click="showArea = true"
        colon
        label-align="right" />

      <van-field name="avatar" label="头像" colon label-align="right">
        <template #input>
          <van-uploader v-model="avatar" max-count="1" />
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

  <van-popup v-model:show="showArea" round position="bottom">
    <van-area
      title="地区选择"
      :area-list="areaList"
      v-model="RegionCode"
      @confirm="onConfirm"
      @cancel="showArea = false" />
  </van-popup>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { ref } from 'vue'
import { areaList } from '@vant/area-data'
import Api from '@/api/index'
import { showNotify } from 'vant'

const Router = useRouter()
const { cookies } = useCookies()
const business = ref(cookies.get('business'))
const showArea = ref(false)
const RegionCode = ref(
  business.value.district
    ? business.value.district
    : business.value.city
    ? business.value.city
    : business.value.province
)
const avatar = ref([
  {
    url: business.value.avatar_cdn
  }
])

const onSubmit = async (values) => {
  console.log(values)

  let data = {
    id: business.value.id,
    nickname: values.nickname,
    email: values.email,
    gender: values.gender
  }

  if (values.password.trim()) {
    data.password = values.password
  }

  if (RegionCode.value) {
    data.code = RegionCode.value
  }

  if (values.avatar[0]?.file) {
    data.avatar = values.avatar[0].file
  }

  let result = await Api.profile(data)

  if (result.code === 1) {
    showNotify({
      type: 'success',
      message: result.msg,
      duration: 1500,
      onClose: () => {
        Router.push('/business/base/index')
      }
    })

    return
  } else {
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500
    })

    return
  }
}

const onConfirm = (values) => {
  showArea.value = false

  let [province, city, district] = values.selectedOptions

  let region_text = ''

  if (province.value) {
    region_text = province.text + '-'
  }

  if (city.value) {
    region_text += city.text + '-'
  }

  if (district.value) {
    region_text += district.text
  }

  business.value.region_text = region_text
}

const onClickLeft = () => {
  Router.back()
}
</script>

<style>
@import url('/assets/css/profile.css');
</style>
