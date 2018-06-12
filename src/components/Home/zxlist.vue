<template>
	<div class="zxlist">
		<my-header1 :title="this.$route.query.title"></my-header1>
		<div class="page-loadmore" style="position: relative;top: 1.28rem;height: calc(100% - 1.28rem);font-size: 0.2rem;overflow-y: scroll;">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" ref="loadmore">
				<div class="banner">
					<div class="slide">
						<swiper :auto="false" :loop="false" height="3.2rem">
							<swiper-item class="black" v-for="(banner,index) in zixunData">
								<img :src="banner.ad_code" />
							</swiper-item>
						</swiper>
					</div>
				</div>
				<router-link v-for="(data,index) in zixun1Data" :to="{ path: 'finddetail', query: {catid:data.catid,id:data.id}}">
					<div class="zhuantilist">
						<img v-lazy="data.thumb"/>
						<ul>
							<li class="li1">{{data.title}}</li>
							<li class="li2">
								<span class="sp1">{{data.updatetime}}</span>
								<span class="sp2">{{data.read_count}}</span>
							</li>
						</ul>
					</div>
				</router-link>
			</mt-loadmore>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	var page = 1
	import { Swiper ,SwiperItem} from 'vux'
	import { getOpenUrl, getToken } from '../../assets/js/common.js';
	import Vue from 'vue'
	import { Popup ,Loadmore} from 'mint-ui';
	Vue.component(Popup.name, Popup);
	Vue.component(Loadmore.name, Loadmore);
	export default {
		components: {
			Swiper,
			SwiperItem
		},
		data() {
			return {
				loading: false,
				popupVisible: false,
				allLoaded: false,
				scrollMode: "auto",
				tips: '',
				zixunData: [],
				zixun1Data: [],
				demo01_index: 0
				//轮播图
				//				swiperOption: {
				//					pagination: '.swiper-pagination',
				//					paginationClickable: true,
				//					//					autoplay: 2500,
				//					loop: true,
				//					spaceBetween: 0,
				//					autoplayDisableOnInteraction: false,
				//					observer: true,
				//					observeParents: true
				//				}
			}
		},
		mounted() {
			this.zixun()
		},
		methods: {
			demo01_onIndexChange(index) {
				this.demo01_index = index
			},
			loadTop() { // 刷新数据的操作
				page = 1
				this.$http.post(getOpenUrl() + 'information_info', {
						catid: this.$route.query.catid,
						int_size: 8,
						page: page
					}, {

						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.zixunData.splice(0, this.zixunData.length);
						this.zixun1Data.splice(0, this.zixun1Data.length);
						var data1 = res.body.ad_data
						var data2 = res.body.lists_data
						$.each(data1, (key, val) => {
							this.zixunData.push(val);
						})
						$.each(data2, (key, val) => {
							this.zixun1Data.push(val);
						})
						this.$refs.loadmore.onTopLoaded();
						this.loading = false
					}, (error) => {
						if(error.status == 401) {
							this.tips = "用户失效，请登录"
							this.popupVisible = true
							setTimeout(() => {
								this.loading = false
								this.popupVisible = false
								this.$router.push({
									path: '/login'
								});
							}, 1500)
						} else {
							this.tips = "网络不稳定，页面丢失"
							this.popupVisible = true
							setTimeout(() => {
								this.loading = false
								this.popupVisible = false
							}, 1500)
						}
					})

			},
			loadBottom() {
				page += 1;
				this.zixun(page)
			},
			zixun(page) {
				this.loading = true
				this.$http.post(getOpenUrl() + 'information_info', {
						catid: this.$route.query.catid,
						int_size: 8,
						page: page
					}, {

						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						var data1 = res.body.ad_data
						var data2 = res.body.lists_data
						$.each(data1, (key, val) => {
							this.zixunData.push(val);
						})
						$.each(data2, (key, val) => {
							this.zixun1Data.push(val);
						})
						this.$refs.loadmore.onBottomLoaded();
						this.loading = false
					}, (error) => {
						if(error.status == 401) {
							this.tips = "用户失效，请登录"
							this.popupVisible = true
							setTimeout(() => {
								this.loading = false
								this.popupVisible = false
								this.$router.push({
									path: '/login'
								});
							}, 1500)
						} else {
							this.tips = "网络不稳定，页面丢失"
							this.popupVisible = true
							setTimeout(() => {
								this.loading = false
								this.popupVisible = false
							}, 1500)
						}
					})
			}
		}
	}
</script>

<style scoped>
	/*轮播图*/
	
	.slide {
		position: relative;
	}
	.slide img {
		display: block;
		width: 100%;
		height: 3.2rem;
	}
	
	.zhuantilist {
		display: flex;
		margin: 0 0.24rem;
		padding: 0.2rem 0;
		border-bottom: 1px solid #eee;
	}
	
	.zhuantilist ul {
		float: left;
		flex: 1;
		padding-left: 0.26rem;
		position: relative;
	}
	
	.zhuantilist .li1 {
		font-size: 0.26rem;
		color: #3F3F4E;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-word;
	}
	
	.zhuantilist img {
		float: left;
		width: 1.14rem!important;
		height: 1.03rem!important;
	}
	
	.zhuantilist .li2 {
		color: #74747d;
		font-size: 0.2rem;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		width: calc(100% - 0.37rem);
	}
	
	.zhuantilist .li2 .sp1 {
		float: left;
	}
	
	.zhuantilist .li2 .sp2 {
		float: right;
		background: url(../../../static/images/index/pinglun.png) no-repeat right 50%;
		background-size: 0.22rem auto;
		padding-right: 0.37rem;
	}
	.zxlist>>>.vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
		background: #FF852C!important;
	}
</style>