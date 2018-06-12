<template>
  <div class="test">
    <div style="font-size: 0.5rem;">
       <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container{{item}} Container</div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>



<script>
import { Tab, TabItem,Swiper, SwiperItem } from 'vux'
const list = () => ['精选', '美食', '电影', '酒店', '外卖']

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      index: 0,
      list2: list(),
      demo2: '美食',
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
	.test>>>.vux-swiper-item{overflow-y: scroll;}
</style>