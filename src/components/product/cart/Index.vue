<template>
  <van-nav-bar
    title="购物车"
    :left-text="cartStatus ? '返回' : ''"
    :left-arrow="cartStatus"
    @click-left="onClickLeft" />

  <!-- 复选框组 -->
  <van-checkbox-group v-model="checkedArr" ref="checkboxGroup">
    <van-swipe-cell v-for="item in CartList" :key="item.id">
      <!-- 商品卡片 -->
      <van-card
        :price="item.total"
        :title="item.product.name"
        class="goods-card">
        <!-- 图片 -->
        <template #thumb>
          <van-checkbox :name="item.id" @click="onChecked"></van-checkbox>
          <img :src="item.product.thumb_cdn" alt="" />
        </template>
        <!-- 数量 -->
        <template #num>
          <van-stepper
            v-model="item.pronum"
            :max="item.product.stock"
            @change="onChange(item.id, item.pronum)"
            theme="round"
            button-size="22"
            disable-input />
        </template>

        <!-- 描述 -->
        <template #desc>
          <span>商品单价：￥{{ item.price }}</span>
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
  </van-checkbox-group>

  <van-submit-bar
    :class="!cartStatus ? 'cart' : ''"
    :price="3050"
    button-text="提交订单"
    @submit="onSubmit">
    <van-checkbox v-model="checked">全选</van-checkbox>
  </van-submit-bar>

  <!-- 引入底部 -->
  <Footer v-if="!cartStatus" />
</template>

<script setup>
import Footer from 'components/common/Footer.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import Api from '@/api/index'
import { showNotify } from 'vant'

const Router = useRouter()
const { cookies } = useCookies()
const CartList = ref([])
const business = ref(cookies.get('business'))
const checked = ref(false)
const cartStatus = ref(cookies.get('cartStatus') === 'true' ? true : false)
const checkedArr = ref([])

const onSubmit = () => {}

onMounted(() => {
  getCartData()
})

const getCartData = async () => {
  let data = {
    busid: business.value.id
  }

  let result = await Api.CartIndex(data)

  if (result.code === 0) {
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500
    })

    return
  }

  CartList.value = result.data
}

onBeforeUnmount(() => {
  cookies.remove('cartStatus')
})

const onClickLeft = () => {
  Router.back()
}
</script>

<style>
.cart {
  bottom: 54px;
}

.bar {
  bottom: 55px;
}

.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}

.van-card__thumb {
  display: flex;
  width: auto;
}

.van-card__thumb img {
  width: 88px;
  margin-left: 5px;
}
</style>
