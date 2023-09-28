<template>
  <van-nav-bar
    title="编辑收货地址"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft" />
</template>

<script setup>
import { useRouter } from 'vue-router'

const Router = useRouter()

const onClickLeft = () => {
  Router.back()
}
</script>
