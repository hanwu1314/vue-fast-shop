<template>
  <div class="limiter">
    <div
      class="container-login100"
      style="background-image: url('/assets/images/img-01.jpg')">
      <div class="wrap-login100 p-t-190 p-b-30">
        <van-form class="login100-form validate-form" @submit="onSubmit">
          <div class="login100-form-avatar">
            <img src="/assets/images/avatar-01.jpg" alt="AVATAR" />
          </div>

          <span class="login100-form-title p-t-20 p-b-45">Hello</span>

          <div
            class="wrap-input100 validate-input m-b-10"
            data-validate="请输入手机号">
            <input
              class="input100"
              type="text"
              v-model="state.mobile"
              placeholder="手机号"
              autocomplete="off" />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-user"></i>
            </span>
          </div>

          <div
            class="wrap-input100 validate-input m-b-10"
            data-validate="请输入密码">
            <input
              class="input100"
              type="password"
              v-model="state.password"
              placeholder="密码" />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock"></i>
            </span>
          </div>

          <div class="container-login100-form-btn p-t-10">
            <button class="login100-form-btn">注 册</button>
          </div>

          <div class="text-center w-full p-t-35">
            <router-link class="txt1" to="/business/base/login">
              立即登录
              <i class="fa fa-long-arrow-right"></i>
            </router-link>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { showNotify } from 'vant'
import { useRouter } from 'vue-router'
import Api from '@/api/index'

const Router = useRouter()
const state = reactive({
  mobile: '13100000000',
  password: '123456'
})

const onSubmit = async () => {
  if (!state.mobile.trim()) {
    showNotify({
      type: 'warning',
      message: '请输入手机号',
      duration: 1500
    })

    return
  }

  let mobileReg = /^1[3,4,5,6,7,8,9][0-9]{9}$/

  if (!mobileReg.test(state.mobile)) {
    showNotify({
      type: 'warning',
      message: '输入手机号格式错误',
      duration: 1500
    })

    return
  }

  if (!state.password.trim()) {
    showNotify({
      type: 'warning',
      message: '请输入密码',
      duration: 1500
    })

    return
  }

  let data = {
    mobile: state.mobile,
    password: state.password
  }

  let result = await Api.register(data)

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
        Router.push('/business/base/login')
      }
    })

    return
  }
}
</script>

<style>
@import url('/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
@import url('/assets/css/util.css');
@import url('/assets/css/main.css');
</style>
