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

      <van-field name="radio" label="性别" colon label-align="right">
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
      v-model="business.district"
      @confirm="onConfirm"
      @cancel="showArea = false" />
  </van-popup>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { ref } from 'vue'
import { areaList } from '@vant/area-data'

const Router = useRouter()
const { cookies } = useCookies()
const business = ref(cookies.get('business'))
const showArea = ref(false)
const avatar = ref([
  {
    url: business.value.avatar_cdn
  }
])

const onSubmit = () => {}

const onConfirm = () => {}

const onClickLeft = () => {
  Router.back()
}
</script>

<style>
@import url('/assets/css/profile.css');
</style>
