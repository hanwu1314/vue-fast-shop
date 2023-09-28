<template>
  <div class="myBox">
    <div class="L"><img :src="state.business.avatar_cdn" /></div>
    <div class="C">
      <div class="tit">
        {{ state.business.nickname ? state.business.nickname : '未设置昵称' }}
      </div>
      <div class="sub">{{ state.business.mobile_text }}</div>
    </div>
    <div class="R"><img src="/assets/images/go.png" /></div>
  </div>
  <div class="clear"></div>
  <div class="allkbox"></div>
  <div class="myboxcon" @click="goProfile">
    <p>基本资料</p>
    <img src="/assets/images/go.png" />
  </div>
  <div class="myboxcon" v-if="state.business.auth == 0 && state.business.email">
    <p>邮箱认证</p>
    <img src="/assets/images/go.png" />
  </div>
  <div class="myboxcon" @click="goAddress">
    <p>我的收货地址</p>
    <img src="/assets/images/go.png" />
  </div>
  <div class="myboxcon">
    <p>我的订单</p>
    <img src="/assets/images/go.png" />
  </div>
  <div class="myboxcon">
    <p>消费记录</p>
    <img src="/assets/images/go.png" />
  </div>
  <div class="myboxcon">
    <p>充值记录</p>
    <img src="/assets/images/go.png" />
  </div>
  <div class="myboxcon" @click="onLogout">
    <p>注销</p>
    <img src="/assets/images/go.png" />
  </div>

  <div class="clear"></div>
  <div class="h54"></div>

  <!-- 引入底部 -->
  <Footer />
</template>
<script setup>
import Footer from 'components/common/Footer.vue'
import { reactive } from 'vue'
import { useCookies } from 'vue3-cookies'
import { showConfirmDialog } from 'vant'
import { useRouter } from 'vue-router'

const { cookies } = useCookies()
const Router = useRouter()
const state = reactive({
  business: cookies.get('business')
})

const goProfile = () => {
  Router.push('/business/base/profile')
}

const goAddress = () => {
  Router.push('/business/address/index')
}

const onLogout = () => {
  showConfirmDialog({
    title: '退出账号',
    message: '是否确认退出当前账号？'
  })
    .then(() => {
      cookies.remove('business')

      Router.push('/business/base/login')
    })
    .catch(() => {})
}
</script>
