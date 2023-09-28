<template>
  <!-- <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch">
    <template #action>
      <div @click="onClickButton">搜索</div>
    </template>
  </van-search> -->
  <van-nav-bar
    title="标题"
    left-text="返回"
    left-arrow
    right-text="搜索"
    @click-left="onClickLeft"
    @click-right="onSearch"
    fixed>
    <template #title>
      <van-search
        v-model="search"
        @search="onSearch"
        placeholder="请输入搜索关键词" />
    </template>
  </van-nav-bar>
  <div class="hbox"></div>

  <div class="shopType">
    <van-dropdown-menu>
      <van-dropdown-item v-model="flag" :options="flagList" @change="onFlag" />
      <van-dropdown-item
        v-model="OrderBy"
        :options="OrderByList"
        @change="onOrderBy" />
    </van-dropdown-menu>
  </div>

  <div class="mainWarp" style="background: #f3f3f3">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="3500">
        <ul class="proul">
          <li v-for="item in list" :key="item.id">
            <router-link
              :to="{ path: '/product/product/info', query: { id: item.id } }">
              <img :src="item.thumb_cdn" />
            </router-link>
            <router-link
              :to="{ path: '/product/product/info', query: { id: item.id } }">
              <p class="tit">
                {{ item.name }}
              </p>
            </router-link>
            <div class="price">
              <p>￥{{ item.price }}</p>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { useCookies } from 'vue3-cookies'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import Api from '@/api/index'
import { showNotify } from 'vant'

const { cookies } = useCookies()
const Route = useRoute()
const Router = useRouter()
const search = ref('')
const flag = ref(0)
const OrderBy = ref('createtime')
const refreshing = ref(false)
const loading = ref(false)
const list = ref([])
const finished = ref(false)
const listCount = ref(0)
const page = ref(1)
const limit = ref(10)
const typeid = ref(Route.query.typeid ? Route.query.typeid : 0)

const flagList = ref([
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '热销商品', value: 2 },
  { text: '推荐商品', value: 3 }
])

const OrderByList = ref([
  { text: '默认排序', value: 'createtime' },
  { text: '库存排序', value: 'stock' },
  { text: '价格排序', value: 'price' }
])

const onLoad = () => {
  if (!refreshing.value && list.value.length < listCount.value) {
    page.value = page.value + 1
  }

  if (refreshing.value) {
    list.value = []
    setTimeout(() => {
      refreshing.value = false
    }, 1500)
  }

  setTimeout(() => {
    getProductData()
  }, 1500)
}

const getProductData = async () => {
  let data = {
    page: page.value,
    limit: limit.value,
    search: search.value,
    typeid: typeid.value,
    flag: flag.value,
    OrderBy: OrderBy.value
  }

  let result = await Api.ProductIndex(data)

  if (result.code === 0) {
    finished.value = true
    showNotify({
      type: 'warning',
      message: result.msg,
      duration: 1500
    })

    return
  } else {
    finished.value = false
    loading.value = false

    listCount.value = result.data.count
    list.value = list.value.concat(result.data.list)

    if (list.value.length >= listCount.value) {
      finished.value = true
    }
  }
}

const onFlag = () => {
  onRefresh()
}

const onOrderBy = () => {
  onRefresh()
}

const onSearch = () => {
  onRefresh()
}

const onRefresh = () => {
  finished.value = false
  loading.value = true
  refreshing.value = true

  page.value = 1

  onLoad()
}

const onClickLeft = () => {
  Router.back()
}
</script>

<style>
.shopType {
  top: 45px;
}
</style>
