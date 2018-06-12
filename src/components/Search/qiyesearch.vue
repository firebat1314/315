<template>
	<div class="information">
		<div class="header">
			<a class="a1" href="javascript:history.back(-1);"></a>
			<div class="header-search">
				<input type="text" placeholder="请输入关键字" @keyup.13="getData(type)" v-model="goodname" />
			</div>
		</div>
		<swiper :options="swiperOptionTabzt" id="swiper-container2" ref="mySwiperTabzt">
			<swiper-slide class="chanpin active-nav" type="chanpin"><span>产品</span></swiper-slide>
			<swiper-slide type="pinpai"><span>品牌</span></swiper-slide>
			<swiper-slide type="news"><span>新闻</span></swiper-slide>
		</swiper>
		<div class="body">
			<swiper :options="swiperOptionConzt" id="swiper-container3" ref="mySwiperConzt">
				<!--产品-->
				<swiper-slide>
					<div style="height: 9.5rem;">
						<scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" :pulldown-config="upobj" v-model="status" ref="scrollerchanpin">
							<div>
								<router-link :to="{path:'/pro_details',query:{id:chanpin.id}}" class="chang" v-for="(chanpin,index) in chanpinData" :key="index">
									<!--<div class="chang" v-for="(chanpin,index) in items">-->
									<div class="chan-left">
										<img v-lazy="chanpin.thumb" />
									</div>
									<div class="chan-center" style="position: relative;">
										<ul>
											<li class="chanli1">{{chanpin.title}}</li>
											<li class="chanli3">{{chanpin.description}}</li>
											<li class="chanli2" v-if="chanpin.price > 0">¥{{chanpin.price}}</li>
											<li class="chanli2" v-else>面议</li>
										</ul>
									</div>
									<div class="chan-right"></div>
									<!--</div>-->
								</router-link>
							</div>
							<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
								<span v-show="status.pullupStatus === 'default'"></span>
								<!--<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>-->
								<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
							</div>
							<nomore></nomore>
						</scroller>
					</div>
				</swiper-slide>
				<!--品牌-->
				<swiper-slide>
					<div style="height: 9.5rem;">
						<scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" :pulldown-config="upobj" v-model="status" ref="scrollerpinpai">
							<div>
								<div class="chang" v-for="(pinpai,index) in pinpaiData">
									<div class="chang-left">
										<img v-lazy="pinpai.thumb" />
									</div>
									<div class="chang-center" style="position: relative; margin-right:0.18rem;">
										<ul>
											<li class="changli1">{{pinpai.title}}</li>
										</ul>
									</div>
									<!-- <div class="chang-right"></div> -->
								</div>
							</div>
							<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
								<span v-show="status.pullupStatus === 'default'"></span>
								<!--<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>-->
								<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
							</div>
							<nomore></nomore>
						</scroller>
					</div>
				</swiper-slide>
				<!--新闻-->
				<swiper-slide>
					<div style="height: 9.5rem;">
						<scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" :pulldown-config="upobj" v-model="status" ref="scrollernews">
							<div>
								<div class="company-news" v-for="list in newData">
									<a :href="list.url">
										<img v-lazy="list.thumb">
										<div class="company-news-content">
											<p class="news-content-tit">{{list.title}}</p>
											<p class="news-content-intro">{{list.status_note}}</p>
											<div class="news-content-time">
												<span style="float:left;">{{list.addtime}}</span>
												<!--<span style="float:right;">1023阅读</span>-->
												<div style="clear: both;"></div>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
								<span v-show="status.pullupStatus === 'default'"></span>
								<!--<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>-->
								<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
							</div>
							<nomore></nomore>
						</scroller>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>
<script>
	var page = 1
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import { Scroller, Spinner } from 'vux'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				loading: false,
				popupVisible: false,
				tips: '',
				newData: [],
				pinpaiData: [],
				chanpinData: [],
				goodname: '',
				swiperOptionTabzt: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 5
				},
				swiperOptionConzt: {
					autoHeight: true,
					notNextTick: true,
					onlyExternal: true
				},
				status: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
				upobj: {
					content: '请下拉刷新数据',
					pullUpHeight: 60,
					height: 40,
					autoRefresh: false,
					downContent: '请下拉刷新数据',
					upContent: '松手即刷新',
					loadingContent: '加载中...',
					clsPrefix: 'xs-plugin-pullup-'
				}
			}
		},
		components: {
			swiper,
			swiperSlide,
			Scroller,
			Spinner
		},
		computed: {
			//第二个swiper
			swiperTabzt() {
				return this.$refs.mySwiperTabzt.swiper
			},
			swiperConzt() {
				return this.$refs.mySwiperConzt.swiper
			}
		},
		mounted() {
			console.log(this.$refs.scroller)
			this.page = 1;
			$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
			//第二个swiper
			var swiperTabzt = this.swiperTabzt;
			var swiperConzt = this.swiperConzt;
			//第二个swiper
			swiperTabzt.on('tap', function(obj) {
				swiperConzt.slideTo(obj.clickedIndex);
			});
			swiperConzt.on('slideChangeStart', function(obj) {
				$('#swiper-container2 .active-nav').removeClass('active-nav')
				var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTabzt.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTabzt.width / activeNav.width()) - 1
						swiperTabzt.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTabzt.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperConzt.on('slideChangeEnd', (obj) => {
				this.type = $('#swiper-container2 .active-nav').attr('type')
				this.goodname = ''
				this.page = 1
				this.getData(this.type, this.page);
				$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
				return;
			});

			let type = this.$route.query.type;
			switch(type) {
				case '5':
					swiperTabzt.slideTo(1)
					swiperConzt.slideTo(1);
					this.type = 'pinpai';
					this.getData("pinpai", this.page);
					break;
				case '3':
					swiperTabzt.slideTo(3)
					swiperConzt.slideTo(3);
					this.type = 'news';
					this.getData("news", this.page);
					break;
				default:
					swiperTabzt.slideTo(0)
					swiperConzt.slideTo(0);
					this.type = 'chanpin';
					this.getData("chanpin", this.page);
					break;
			}
		},
		methods: {
			refresh() { // 刷新数据的操作
				page = 1
				$('.nomore').hide()
				this.$nextTick(() => {
					if(this.type == "chanpin") {
						this.$http.post(getOpenUrl() + 'company_qycp', {
								keyword: this.goodname,
								int_size: 8,
								page: page,
								brand_id: '',
								did: this.$route.query.id,
								cp_catid: 1
							}, {
								headers: {
									'Authorization': 'Bearer ' + getToken()
								}
							})
							.then((res) => {
								this.chanpinData.splice(0, this.chanpinData.length);
								if(res.body.code == 0) {
									var data = res.body.product_list;
									$.each(data, (key, val) => {
										this.chanpinData.push(val);
									});
								}
								if(data.length == 0) {
									$('.nomore').show()
								}
								this.popupVisible = false
								this.$refs.scrollerchanpin.donePulldown()
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
					if(this.type == "pinpai") {
						this.$http.post(getOpenUrl() + 'company_qypp', {
								page: page,
								did: this.$route.query.id
							}, {
								headers: {
									'Authorization': 'Bearer ' + getToken()
								}
							})
							.then((res) => {
								this.pinpaiData.splice(0, this.pinpaiData.length);
								if(res.body.code == 0) {
									var data = res.body.brand_data;
									$.each(data, (key, val) => {
										this.pinpaiData.push(val);
									});
								}
								if(data.length == 0) {
									$('.nomore').show()
								}
								this.loading = false
								this.$refs.scrollerpinpai.donePulldown()
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
					if(this.type == "news") {
						this.$http.post(getOpenUrl() + 'company_qyxw', {
								page: page,
								did: this.$route.query.id
							}, {
								headers: {
									'Authorization': 'Bearer ' + getToken()
								}
							})
							.then((res) => {
								this.newData.splice(0, this.newData.length);
								if(res.body.code == 0) {
									var data = res.body.company_news;
									$.each(data, (key, val) => {
										this.newData.push(val);
									});
								}
								if(data.length == 0) {
									$('.nomore').show()
								}
								this.loading = false
								this.$refs.scrollernews.donePulldown()
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
				})
			},
			loadMore() {
				this.page += 1;
				this.getData(this.type, this.page)
				this.loading = false
			},
			getData(type, page) {
				//				this.fangan = true
				switch(type) {
					case 'pinpai':
						this.ppData(page);
						break;
					case 'news':
						this.newsData(page);
						break;
					default:
						//推荐
						this.chanpin(page);
						break;
				}

			},
			newsData(page) {
				this.page = page ? page : 1;
				if(this.newData.length > 0 && this.page <= this.newPage) {
					this.page = this.changjiaPage;
					this.loading = false
					return;
				}
				this.loading = true
				this.$http.post(getOpenUrl() + 'company_qyxw', {
						page: page,
						did: this.$route.query.id
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.newPage = this.page;
						if(res.body.code == 0) {
							var data = res.body.company_news;
							$.each(data, (key, val) => {
								this.newData.push(val);
							});
						}
						if(data.length == 0) {
							$('.nomore').show()
						}
						this.$refs.scrollernews.donePullup()
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
			ppData(page) {
				this.page = page ? page : 1;
				if(this.pinpaiData.length > 0 && this.page <= this.ppPage) {
					this.page = this.ppPage;
					this.loading = false
					return;
				}
				this.$http.post(getOpenUrl() + 'company_qypp', {
						page: page,
						did: this.$route.query.id
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.ppPage = this.page;
						if(res.body.code == 0) {
							var data = res.body.brand_data;
							$.each(data, (key, val) => {
								this.pinpaiData.push(val);
							});
						}
						if(data.length == 0) {
							$('.nomore').show()
						}
						this.$refs.scrollerpinpai.donePullup()
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
			chanpin(page) {
				this.page = page ? page : 1;
				if(this.chanpinData.length > 0 && this.page <= this.cpPage) {
					this.page = this.cpPage;
					this.loading = false
					return;
				}
				this.$http.post(getOpenUrl() + 'company_qycp', {
						keyword: this.goodname,
						int_size: 8,
						page: page,
						brand_id: '',
						did: this.$route.query.id,
						cp_catid: 1
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.cpPage = this.page;
						if(res.body.code == 0) {
							var data = res.body.product_list;
							$.each(data, (key, val) => {
								this.chanpinData.push(val);
							});
						}
						if(data.length == 0) {
							$('.nomore').show()
						}
						this.$refs.scrollerchanpin.donePullup()
						this.popupVisible = false
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
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: calc(100% - 0.48rem);
		height: 0.88rem;
		z-index: 99;
		background: #f0f2f5;
		padding: 0 0.24rem;
		padding-top: 0.4rem;
		display: flex;
	}
	
	.header .a1 {
		width: 0.17rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/leftback.png) no-repeat 0 50%;
		background-size: 0.17rem 0.32rem;
		float: left;
	}
	
	.header-search {
		height: 0.58rem;
		flex: 1;
		border-radius: 0.05rem;
		background: #fff;
		float: left;
		margin-left: 0.3rem;
		margin-top: 0.17rem;
	}
	
	.header-search input {
		display: block;
		font-size: 0.22rem;
		color: #7e7e7d;
		height: 0.58rem;
		line-height: 0.58rem;
		width: 100%;
		background: url(../../../static/images/searchlogo.png) no-repeat 0.12rem 50%;
		background-size: 0.25rem;
		padding-left: 0.47rem;
	}
	
	.body {
		padding-top: 1.98rem;
		height: calc(100% - 1.98rem);
		font-size: 0.2rem;
	}
	
	#swiper-slide {
		width: 2.1rem!important;
	}
	
	#swiper-container2 {
		position: fixed;
		top: 1.28rem;
		width: 100%;
		z-index: 5;
		overflow: hidden;
		background: #f0f2f5;
	}
	
	#swiper-container2 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #f0f2f5 !important;
		text-align: center;
	}
	
	#swiper-container2 .active-nav {
		background: #f0f2f5 !important;
	}
	
	#swiper-container2 .active-nav span {
		display: inline-block;
		border-bottom: 2px solid #fd9b3a;
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	/*产品*/
	
	.chan {
		margin: 0 0.24rem;
		margin-top: 0.2rem;
		margin-bottom: 5px;
		overflow: hidden;
		display: flex;
		background: #fff;
		box-shadow: 0 2px 5px #AAABAD;
	}
	
	.chan-left {
		width: 1.3rem;
		height: 1.3rem;
		float: left;
		margin-top: 0.2rem;
		margin-left: 0.18rem;
	}
	
	.chan-left img {
		width: 1.3rem!important;
		height: 1.3rem!important;
	}
	
	.chan-center {
		float: left;
		flex: 1;
		margin-left: 0.27rem;
	}
	
	.chan-center ul {
		margin-top: 0.2rem;
	}
	
	.chanli1 {
		font-size: 0.24rem;
		color: #3F3F4E;
		line-height: 0.36rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.chanli2 {
		margin-top: 0.06rem;
		font-size: 0.24rem;
		color: #ff7738;
		line-height: 0.24rem;
	}
	
	.chanli3 {
		font-size: 0.22rem;
		color: #74747d;
		height: 0.6rem;
		margin-top: 0.06rem;
		line-height: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.chan-right {
		width: 0.38rem;
		height: 1.7rem;
		margin-left: 0.32rem;
		margin-right: 0.18rem;
		background: url(../../../static/images/index/rightorange.png) no-repeat 0 50%;
		background-size: 0.38rem auto;
		float: right;
	}
	/*厂家*/
	
	.chang {
		margin: 0 0.24rem;
		margin-top: 0.2rem;
		margin-bottom: 5px;
		overflow: hidden;
		display: flex;
		background: #fff;
		box-shadow: 0 2px 5px #AAABAD;
		height: 1.7rem;
	}
	
	.chang-left {
		width: 1.3rem;
		height: 1.3rem;
		float: left;
		margin-top: 0.2rem;
		margin-left: 0.18rem;
	}
	
	.chang-left img {
		width: 1.3rem!important;
		height: 1.3rem!important;
	}
	
	.chang-center {
		float: left;
		flex: 1;
		margin-left: 0.27rem;
	}
	
	.chang-center ul {
		margin-top: 0.2rem;
	}
	
	.changli1 {
		font-size: 0.24rem;
		color: #3F3F4E;
		line-height: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.changli2 {
		margin-top: 0.05rem;
		font-size: 0.22rem;
		color: #3f9af6;
		line-height: 0.24rem;
	}
	
	.changli3 {
		margin-top: 0.08rem;
		font-size: 0.22rem;
		color: #74747d;
		line-height: 0.24rem;
	}
	
	.chang-right {
		width: 0.38rem;
		height: 1.7rem;
		margin-left: 0.32rem;
		margin-right: 0.18rem;
		background: url(../../../static/images/index/rightorange.png) no-repeat 0 50%;
		background-size: 0.38rem auto;
		float: right;
	}
	/*图集*/
	
	.page-loadmore {
		position: relative;
		top: 1.58rem;
		bottom: 0;
		overflow-y: scroll;
		font-size: 0.2rem;
		height: calc(100% - 2.55rem);
	}
	
	.body-top {
		height: 0.72rem;
		line-height: 0.72rem;
		background: #f4f4f4;
		color: #3F3F4E;
		font-size: 0.22rem;
		position: fixed;
		top: 0.88rem;
		width: 100%;
		z-index: 99;
		display: flex;
	}
	
	.body-top-left {
		position: relative;
	}
	
	.body-top-left .ul2 {
		position: absolute;
		left: 50%;
		top: 0.7rem;
		transform: translateX(-50%);
		height: 2rem;
		overflow-y: scroll;
		line-height: 0.5rem;
	}
	
	.body-top-left .ul1 li {
		float: left;
		background: url(../../../static/images/personal/personalicon/down.png) no-repeat right 50%;
		background-size: 0.16rem 0.08rem;
		padding-right: 0.18rem;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 1rem;
		text-align: center;
		width: calc(100% - 0.9rem);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.body-list {
		overflow: hidden;
		width: 2.58rem;
		padding: 0.53rem 0.35rem 0 0.26rem;
		background: #f4edea;
		overflow: hidden;
		float: left;
		margin-top: 0.04rem;
	}
	
	.body-list dt {
		width: 2.12rem;
		height: 1.57rem;
		border-bottom: 1px solid #e4dcd3;
		float: left;
		padding: 0 0.15rem 0.36rem 0.3rem;
	}
	
	.body-list dt img {
		width: 2.12rem;
		height: 1.57rem;
	}
	
	.body-list dd {
		float: left;
	}
	
	.body-list .sp1 {
		width: 2.58rem;
		font-size: 0.22rem;
		line-height: 0.36rem;
		height: 0.72rem;
		color: #3F3F4E;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.body-list .sp2 {
		width: 2.58rem;
		font-size: 0.16rem;
		line-height: 0.48rem;
		height: 0.48rem;
		color: #75737c;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	/*方案*/
	
	.fenlei {
		overflow: hidden;
	}
	
	.fenlei span {
		float: left;
		width: calc(100% - 0.48rem);
		margin: 0 0.24rem;
		margin-top: 0.37rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.fenlei .sp1 {
		font-size: 0.22rem;
		color: #fd9b3a;
		line-height: 0.4rem;
		height: 0.4rem;
	}
	
	.fenlei .sp2 {
		font-size: 0.22rem;
		color: #787883;
		line-height: 0.4rem;
		height: 0.4rem;
	}
	
	.news-content-time {
		font-size: 0.2rem;
		color: #787883;
		margin-top: 0.1rem;
	}
	
	.company-news-content .news-content-tit {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 0.22rem;
		line-height: 0.45rem;
		color: #000;
	}
	
	.company-news-content .news-content-intro {
		font-size: 0.2rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		color: #787883;
	}
	
	.company-news-content {
		/*height: 1.9rem;*/
		margin: 0 0.3rem 0 0.2rem;
		padding-top: 0.2rem;
	}
	
	.company-news img {
		width: 100%;
		display: block;
		height: 3.2rem;
		background: #7dd2ff;
	}
</style>