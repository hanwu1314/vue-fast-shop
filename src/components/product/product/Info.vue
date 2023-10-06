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
    <div class="price">
      <em>￥</em>{{ info.price }}<span id="sold">已售500件</span>
    </div>
  </div>

  <div class="detailbox_2" v-html="info.content"></div>

  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-action-bar-icon icon="cart-o" text="购物车" :badge="CartCount" />
    <van-action-bar-icon
      :icon="info.collection_status === true ? 'star' : 'star-o'"
      :text="info.collection_status === true ? '已收藏' : '收藏'"
      :color="info.collection_status === true ? '#ff5000' : ''"
      @click="onCollection" />
    <van-action-bar-button type="warning" text="加入购物车" @click="onAdd" />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Api from '@/api/index'
import { showConfirmDialog, showNotify } from 'vant'
import { useCookies } from 'vue3-cookies'

const Router = useRouter()
const Route = useRoute()
const { cookies } = useCookies()

const id = ref(Route.query.id)
const info = ref({})
const business = ref(cookies.get('business') ? cookies.get('business') : {})

const CartCount = ref(0)

onMounted(() => {
  getInfo()
})

const onAdd = async () => {
  if (!business.value || JSON.stringify(business.value) === '{}') {
    showNotify({
      type: 'warning',
      message: '请先登录',
      duration: 1500
    })

    return
  }

  let data = {
    proid: id.value,
    busid: business.value.id
  }

  let result = await Api.CartAdd(data)

  if (result.code === 0) {
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500
    })

    return
  }

  getInfo()

  showConfirmDialog({
    title: result.msg,
    message: '是否需要跳转购物车进行结算？'
  })
    .then(() => {
      cookies.set('cartStatus', true)
      Router.push('/product/cart/index')
    })
    .catch(() => {})
}

const onCollection = async () => {
  if (!business.value || JSON.stringify(business.value) === '{}') {
    showNotify({
      type: 'warning',
      message: '请先登录',
      duration: 1500
    })
    Router.push('/business/base/login')
    return
  }

  let data = {
    busid: business.value.id,
    proid: id.value
  }

  let result = Api.ProductCollection(data)

  if (result.code === 0) {
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500
    })
    return
  }

  info.value.collection_status = !info.value.collection_status
}

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

  info.value = result.data.product

  CartCount.value = result.data.CartCount
}

const onClickLeft = () => {
  Router.back()
}
</script>
<style>
#sold {
  float: right;
  color: #b7b7bf;
  font-size: 12px;
  font-weight: normal;
  line-height: 30px;
  text-decoration: auto;
}
</style>
