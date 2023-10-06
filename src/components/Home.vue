<template>
  <div class="topBox">
    <div class="L"><a href="index.html">LOGO</a></div>
    <div class="C">
      <div class="saerchbox">
        <input name="" type="text" placeholder="请输入您要搜索的内容" /><img src="/assets/images/ss.png" />
      </div>
    </div>
    <div class="R"><img src="/assets/images/tr.png" /></div>
  </div>
  <div class="clear"></div>
  <div class="aui-m-slider">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in state.recommendList" :key="item.id">
        <router-link :to="{ path: '/product/product/info', query: { id: item.id } }">
          <img :src="item.thumb_cdn" />
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="clear"></div>
  <div class="lqgwBox">
    <ul>
      <li v-for="item in state.TypeList" :key="item.id">
        <router-link :to="{ path: '/product/product/index', query: { id: item.id } }">
          <img :src="item.thumb_cdn" />
          <p>{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="clear"></div>
  <div class="contitbox">
    <p>新品</p>
  </div>
  <div class="clear"></div>
  <ul class="proul">
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/4.jpg" />
          <p><span>￥</span>288</p>
        </a>
      </div>
    </li>
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/5.jpg" />
          <p><span>￥</span>198</p>
        </a>
      </div>
    </li>
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/6.jpg" />
          <p><span>￥</span>2368</p>
        </a>
      </div>
    </li>
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/7.jpg" />
          <p><span>￥</span>688</p>
        </a>
      </div>
    </li>
  </ul>
  <div class="clear"></div>
  <div class="contitbox">
    <p>热销</p>
  </div>
  <div class="clear"></div>
  <ul class="proul_2">
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/12.jpg" />
          <p><span>￥</span>288</p>
        </a>
      </div>
    </li>
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/13.jpg" />
          <p><span>￥</span>198</p>
        </a>
      </div>
    </li>
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/14.jpg" />
          <p><span>￥</span>2368</p>
        </a>
      </div>
    </li>
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/14.jpg" />
          <p><span>￥</span>688</p>
        </a>
      </div>
    </li>
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/12.jpg" />
          <p><span>￥</span>688</p>
        </a>
      </div>
    </li>
    <li>
      <div class="con">
        <a href="detail.html">
          <img src="/assets/images/13.jpg" />
          <p><span>￥</span>688</p>
        </a>
      </div>
    </li>
  </ul>
  <div class="clear"></div>
  <div class="h54"></div>

  <!-- 引入底部 -->
  <Footer />
</template>

<script setup>
import Footer from './common/Footer.vue'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Api from '@/api/index'

const Router = useRouter()

const state = reactive({
  recommendList: [],
  TypeList: []
})

onMounted(() => {
  getData()
})

const getData = async () => {
  let result = await Api.HomeIndex()

  state.recommendList = result.data.recommendList

  state.TypeList = result.data.TypeList
}
</script>
