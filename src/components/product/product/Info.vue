<template>
  <van-nav-bar
    title="商品详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft" />

  <div class="aui-m-slider">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="(image, index) in info.thumbs_cdn" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>

  <div class="detailbox">
    <h4>{{ info.name }}</h4>
    <div class="price"><em>￥</em>{{ info.price }}<font>已售500件</font></div>
  </div>

  <!-- v-html => 解析html的 v-text => 文本 -->
  <div class="detailbox_2" v-html="info.content"></div>

  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-action-bar-icon icon="cart-o" text="购物车" />
    <van-action-bar-icon
      :icon="info.collection_status === true ? 'star' : 'star-o'"
      :text="info.collection_status === true ? '已收藏' : '收藏'"
      :color="info.collection_status === true ? '#ff5000' : ''" />
    <van-action-bar-button type="warning" text="加入购物车" />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Api from '@/api/index'
import { showNotify } from 'vant'
import { useCookies } from 'vue3-cookies'

const Router = useRouter()
const Route = useRoute()
const { cookies } = useCookies()

const id = ref(Route.query.id)
const info = ref({})
const business = ref(cookies.get('business') ? cookies.get('business') : {})

console.log(business.value)

onMounted(() => {
  getInfo()
})

const getInfo = async () => {
  let result = await Api.ProductInfo({ id: id.value, busid: business.value.id })

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

  info.value = result.data
}

const onClickLeft = () => {
  Router.back()
}
</script>
