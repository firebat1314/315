<template>
	<div class="shop">
		<div class="shop-header">
			<div class="header">
				<a class="a1" href="javascript:history.back(-1);"></a>
				<!--<a href="javascript:history.back(-1);" class="a1"></a>-->
				<span class="forget">品牌详情</span>
			</div>
		</div>
		<div class="shop-content">
			<div class="nav">
				<div class="nav-left">
					<img v-lazy="shopdetailData.thumb"/>
				</div>
				<div class="nav-right">
					<ul>
						<li class="li1">{{shopdetailData.title}}</li>
						<li class="li2">{{shopdetailData.ytitle}}</li>
						<li class="li3">{{shopdetailData.product_count}}个产品</li>
					</ul>
				</div>
			</div>
			<div class="content" style="padding: 0 0.24rem;background: #fff;">
				<div style="font-size: 0.26rem;line-height: 0.7rem;height: 0.7rem;color: #3F3F4E;" v-html="shopdetailData.content"></div>
				<div></div>
			</div>
		</div>
		<div class="footer">
			<ul>
				<li class="footer-li1" v-if="shopdetailData.url!=''">
					<a :href="shopdetailData.url" style="color: #33333E;">进入品牌官网</a>
				</li>
				<li class="footer-li1" v-else>进入品牌官网</li>
				<router-link :to="{ path: 'search', query: {brand_id:shopdetailData.id}}">
				<li class="footer-li2">查看品牌产品</li>
				</router-link>
			</ul>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				tips: '',
				loading: false,
				shopdetailData:[]
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.$http.post(getOpenUrl() + 'brand_info', {
						brand_id: this.$route.query.brand_id,
						company_id: this.$route.query.company_id
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.shopdetailData = res.body.brand_info
						}

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
		},
		activated() {
			//路由缓存 前进后退
		}
	}
</script>

<style scoped>
	.shop {
		background: #F4F4F4;
	}
	
	.header {
		height: 0.88rem;
		padding-left: 0.24rem;
	}
	
	.header .a1 {
		width: 0.32rem;
		height: 100%;
		display: block;
		background: url(../../../static/images/chanpin/whiteBack.png) no-repeat 0 50%;
		background-size: 0.2rem auto;
		float: left;
	}
	
	.shop-header {
		width: 100%;
		background: url(../../../static/images/chanpin/details.png) no-repeat;
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		padding-top: 0.4rem;
	}
	
	.shop-content {
		position: relative;
		overflow-y: scroll;
		top: 1.28rem;
		height: calc(100% - 2.08rem);
	}
	.content img{width: 100%!important;}
	.content div{font-size: 0.2rem!important;}
	.forget {
		line-height: 0.88rem;
		font-size: 0.26rem;
		display: block;
		float: left;
		color: #fff;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.nav {
		background: #fff;
		padding: 0.34rem 0.24rem;
		overflow: hidden;
		display: flex;
		margin-bottom: 0.07rem;
	}
	
	.nav-left {
		width: 1.1rem;
		height: 1.1rem;
		overflow: hidden;
		border-radius: 50%;
		float: left;
	}
	
	.nav-left img {
		width: 1.1rem;
		height: 1.1rem;
	}
	
	.nav-right {
		float: left;
		margin-left: 0.43rem;
		flex: 1;
	}
	
	.nav-right ul {
		width: 100%;
	}
	
	.nav-right .li1 {
		font-size: 0.22rem;
		color: #3f3f4e;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.nav-right .li2 {
		font-size: 0.16rem;
		color: #3f3f4e;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.nav-right .li3 {
		font-size: 0.2rem;
		color: #898991;
		margin-top: 0.1rem;
	}
	
	.footer {
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.24rem;
		text-align: center;
		border-top: 2px solid #eee;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	
	.footer ul {
		width: 100%;
	}
	
	.footer li {
		float: left;
		width: 50%;
	}
	
	.footer .footer-li1 {
		background: #fff;
		color: #3F3F4E;
	}
	
	.footer .footer-li2 {
		background: #ff651d;
		color: #fff;
	}
</style>