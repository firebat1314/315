<template>
	<div class="find">
		<my-header2></my-header2>
		<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab" style="position: fixed;top: 1.28rem;width: 100%;">
			<swiper-slide class="active-nav"><span>精选</span></swiper-slide>
			<swiper-slide :class="index==-1 ? 'active-nav' : ''" v-for="(list, index) in jiajuData" :catid="list.catid"><span>{{list.catname}}</span></swiper-slide>
		</swiper>
		<div style="padding-top: 1.98rem;padding-bottom: 0.97rem;font-size: 0.2rem;">

			<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
				<swiper-slide>
					<div style="font-size: 0.2rem;" class="max">
						<scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore1" @on-pulldown-loading="refresh1" :pulldown-config="upobj" v-model="status1" ref="scroller1">
							<div class="first" type="expert" contype="expert">
								<div class="banner">
									<div class="slide">
										<swiper1 :auto="false" :loop="false" height="3.2rem">
											<swiper-item class="black" v-for="(banner,index) in adData" :key="index">
												<img :src="banner.ad_code" />
											</swiper-item>
										</swiper1>
									</div>
								</div>
								<div class="find1-nav">
									<p>最新产品</p>
									<swiper :options="swiperOptionTabList" id="swiper-container21" ref="mySwiperTabList">
										<swiper-slide :class="index==0 ? 'active-nav1' : ''" v-for="(list, index) in productData" :catid="list.catid"><span>{{list.catname}}</span></swiper-slide>
									</swiper>
									<swiper :options="swiperOptionConList" id="swiper-container3" ref="mySwiperConList">
										<swiper-slide v-for="(list, index) in productData">
											<div class="first" type="jianzhu" contype="jianzhu">
												<swiper :options="swiperOptionImg" id="swiper-container2" ref="mySwiperImg">
													<swiper-slide style="width: 2.6rem;" v-for="(list,index) in zuixinData" :key="index">
														<router-link :to="{ path: 'pro_details', query: {id:list.id}}">
															<div class="swiper">
																<ul class="swiper-ul">
																	<li class="swiper-li1"><img v-lazy="list.thumb" /></li>
																	<li class="swiper-li2">{{list.title}}</li>
																	<li class="swiper-li3" v-text="list.price==0?'面议':'￥'+list.price"></li>
																</ul>
															</div>
														</router-link>
													</swiper-slide>
												</swiper>
											</div>
										</swiper-slide>
									</swiper>
								</div>
								<div class="find1-nav">
									<p>热门产品</p>
									<swiper :options="swiperOptionTabList1" id="swiper-container22" ref="mySwiperTabList1">
										<swiper-slide :class="index==0 ? 'active-nav2' : ''" v-for="(list, index) in productData" :catid="list.catid"><span>{{list.catname}}</span></swiper-slide>
									</swiper>
									<swiper :options="swiperOptionConList1" id="swiper-container3" ref="mySwiperConList1">
										<swiper-slide v-for="(list, index) in productData">
											<div class="first" type="jiegou" contype="jiegou">
												<swiper :options="swiperOptionImg" id="swiper-container2" ref="mySwiperImg">
													<swiper-slide style="width: 2.6rem;" v-for="(list,index) in remenData" :key="index">
														<router-link :to="{ path: 'pro_details', query: {id:list.id}}">
															<div class="swiper">
																<ul class="swiper-ul">
																	<li class="swiper-li1"><img v-lazy="list.thumb" /></li>
																	<li class="swiper-li2">{{list.title}}</li>
																	<li class="swiper-li3" v-text="list.price==0?'面议':'￥'+list.price"></li>
																</ul>
															</div>
														</router-link>
													</swiper-slide>
												</swiper>
											</div>
										</swiper-slide>
									</swiper>
								</div>
								<div class="news">
									<ul class="news-ul" v-for="list in listData">
										<router-link :to="{ path: 'finddetail', query: {catid:list.catid,id:list.id}}">
											<li class="news-li1"><img v-lazy="list.thumb" /></li>
											<li class="news-li2">{{list.title}}</li>
											<li class="news-li3">
												<span class="news-sp1">{{list.updatetime}}</span>
												<span class="news-sp2">{{list.read_count}}阅读</span>
											</li>
										</router-link>
									</ul>
								</div>
							</div>
							<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
								<span v-show="status1.pullupStatus === 'default'"></span>
								<!--<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>-->
								<span v-show="status1.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
							</div>
							<nomore></nomore>
						</scroller>
					</div>
				</swiper-slide>

				<swiper-slide v-for="(list, index) in jiajuData" style="font-size: 0.2rem;">
					<div  class="max">
						<scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" :pulldown-config="upobj1" v-model="status" ref="scroller">
							<div class="first" type="user" contype="user">

								<div class="find1-banner">
									<div class="banner">
										<div class="slide">
											<swiper1 :auto="false" :loop="false" height="3.2rem">
												<swiper-item class="black" v-for="(banner,index) in adData" :key="index">
													<img :src="banner.ad_code" />
												</swiper-item>
											</swiper1>
										</div>
									</div>
								</div>

								<div class="find1-list">
									<router-link v-for="list in listData" :to="{ path: 'finddetail', query: {catid:list.catid,id:list.id}}">
										<div class="find1-navlist">

											<ul class="find1-ul1">
												<li class="find1-li2">{{list.title}}</li>
												<li class="find1-li3">
													<span class="find1-sp1">{{list.updatetime}}</span>
													<span class="find1-sp2">{{list.read_count}}阅读</span>
												</li>
											</ul>
											<ul class="find1-ul2">
												<li class="find1-li1"><img v-lazy="list.thumb" /></li>
											</ul>

										</div>
									</router-link>
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
		<!--<my-footer></my-footer>-->
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { getOpenUrl, getToken } from '../../assets/js/common.js';
	import { Scroller, Spinner, Swiper, SwiperItem } from 'vux'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				loading: false,
				popupVisible: false,
				tips: '',
				listData: [],
				zuixinData: [],
				remenData: [],
				catsData: [],
				page: 1,
				jiajuData: [],
				adData: [],
				productData: [],
				//轮播图
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					//					autoplay: 2500,
					loop: true,
					spaceBetween: 0,
					autoplayDisableOnInteraction: false,
					observer: true,
					observeParents: true
				},
				//第一个swiper
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
				},
				swiperOptionCon: {
					autoHeight: true,
					notNextTick: true,
					onlyExternal: true
				},
				//第二个swiper
				swiperOptionTabList: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
				},
				swiperOptionConList: {
					autoHeight: true,
					notNextTick: true
				},
				//热门swiper
				swiperOptionTabList1: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
				},
				swiperOptionConList1: {
					autoHeight: true,
					notNextTick: true
				},
				//第三个swiper
				swiperOptionImg: {
					slidesPerView: "auto",
					spaceBetween: 5
				},
				status1: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
				upobj1: {
					content: '请下拉刷新数据',
					pullUpHeight: 60,
					height: 40,
					autoRefresh: false,
					downContent: '请下拉刷新数据',
					upContent: '松手即刷新',
					loadingContent: '加载中...',
					clsPrefix: 'xs-plugin-pullup-'
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
			};
		},
		components: {
			swiper,
			swiperSlide,
			Scroller,
			Spinner,
			'swiper1': Swiper,
			SwiperItem
		},
		computed: {
			//第一个swiper
			swiperTab() {
				return this.$refs.mySwiperTab.swiper
			},
			swiperCon() {
				return this.$refs.mySwiperCon.swiper
			},
			//第二个swiper
			swiperTabList() {
				return this.$refs.mySwiperTabList.swiper
			},
			swiperConList() {
				return this.$refs.mySwiperConList.swiper
			},
			//热门swiper
			swiperTabList1() {
				return this.$refs.mySwiperTabList1.swiper
			},
			swiperConList1() {
				return this.$refs.mySwiperConList1.swiper
			}
		},
		mounted() {
			$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
			this.find()
			this.zuixin()
			this.hot()
			//第一个swiper
			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
			//第二个swiper
			var swiperTabList = this.swiperTabList;
			var swiperConList = this.swiperConList;
			//热门swiper
			var swiperTabList1 = this.swiperTabList1;
			var swiperConList1 = this.swiperConList1;
			var self = this;
			//第一个swiper
			swiperTab.on('tap', function(obj) {
				swiperCon.slideTo(obj.clickedIndex);
			});

			swiperCon.on('slideChangeStart', function(obj) {
				$('#swiper-container2 .active-nav').removeClass('active-nav')
				var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTab.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTab.width / activeNav.width()) - 1
						swiperTab.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTab.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperCon.on('slideChangeEnd', (obj) => {
				window.scrollTo(0, 0)
				this.page=1
				this.listData.splice(0, this.listData.length);
				$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
				this.catid = parseInt($('#swiper-container2 .active-nav').attr('catid'));
				this.find(this.catid, '');
				return;
			});
			//第二个swiper
			swiperTabList.on('tap', function(obj) {
				swiperConList.slideTo(obj.clickedIndex);
			});
			swiperConList.on('slideChangeStart', function(obj) {
				$('#swiper-container21 .active-nav1').removeClass('active-nav1')
				var activeNav = $('#swiper-container21 .swiper-slide').eq(obj.activeIndex).addClass('active-nav1');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTabList.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTabList.width / activeNav.width()) - 1
						swiperTabList.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTabList.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperConList.on('slideChangeEnd', (obj) => {
				this.p_catid = parseInt($('#swiper-container21 .active-nav1').attr('catid'));
				this.zuixin(this.p_catid);
				return;
			});
			//热门swiper
			swiperTabList1.on('tap', function(obj) {
				swiperConList1.slideTo(obj.clickedIndex);
			});
			swiperConList1.on('slideChangeStart', function(obj) {
				$('#swiper-container22 .active-nav2').removeClass('active-nav2')
				var activeNav = $('#swiper-container22 .swiper-slide').eq(obj.activeIndex).addClass('active-nav2');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTabList1.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTabList1.width / activeNav.width()) - 1
						swiperTabList1.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTabList1.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperConList1.on('slideChangeEnd', (obj) => {
				this.p_catid = parseInt($('#swiper-container22 .active-nav2').attr('catid'));
				this.hot(this.p_catid);
				return;
			});
		},
		methods: {
			loadMore1() {
				this.page += 1;
				this.find(this.catid, this.p_catid);
			},
			refresh1() {
				this.page = 1
				$('.nomore').hide()
				this.$nextTick(() => {
					this.$http.post(getOpenUrl() + 'index_furnishing', {
							catid: this.catid,
							p_catid: this.p_catid,
							keyword: '',
							int_size: 8,
							page: this.page
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						})
						.then((res) => {
							this.$mount(this.$refs)
							this.listData.splice(0, this.listData.length);
							this.loading = false
							var list_data = res.body.list_data
							$.each(list_data, (key, val) => {
								this.listData.push(val);
							})
							if(list_data.length == 0) {
								$('.nomore').show()
							}
							console.log(this.$refs.scroller1)
							this.$refs.scroller1.donePulldown()
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
				})
			},
//			
			loadMore() {
				this.page += 1;
				this.find(this.catid, this.p_catid);
			},
			refresh() {
				this.page = 1
				$('.nomore').hide()
				this.$nextTick(() => {
					this.$http.post(getOpenUrl() + 'index_furnishing', {
							catid: this.catid,
							p_catid: this.p_catid,
							keyword: '',
							int_size: 8,
							page: this.page
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						})
						.then((res) => {
							this.$mount(this.$refs)
							this.listData.splice(0, this.listData.length);
							this.loading = false
							var list_data = res.body.list_data
							$.each(list_data, (key, val) => {
								this.listData.push(val);
							})
							if(list_data.length == 0) {
								$('.nomore').show()
							}
							this.$refs.scroller[0].donePulldown()
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
				})
			},
			find(catid, p_catid) {
				if(this.listData.length > 0 && this.page <= this.changjiaPage) {
					this.page = this.changjiaPage;
					this.loading = false
					return;
				}
				this.loading = true
				this.$http.post(getOpenUrl() + 'index_furnishing', {
						catid: catid,
						p_catid: p_catid,
						keyword: '',
						int_size: 8,
						page: this.page
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.$mount(this.$refs)
						this.loading = false
						this.changjiaPage = this.page;
						var list_data = res.body.list_data
						this.jiajuData = res.body.jiaju
						this.adData = res.body.ad_data
						this.productData = res.body.product_cat
						$.each(list_data, (key, val) => {
							this.listData.push(val);
						})
						if(list_data.length == 0) {
							$('.nomore').show()
						}
						this.$refs.scroller[0].donePullup()
						this.$refs.scroller1.donePullup()
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
			zuixin(p_catid) {
				this.loading = true
				this.$http.post(getOpenUrl() + 'new_product', {
						p_catid: p_catid
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.loading = false
						this.zuixinData.splice(0, this.zuixinData.length)
						var data = res.body.cp_new
						$.each(data, (k, v) => {
							this.zuixinData.push(v);
						})
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
			hot(p_catid) {
				this.loading = true
				this.$http.post(getOpenUrl() + 'recommend_product', {
						p_catid: p_catid
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.loading = false
						this.remenData.splice(0, this.remenData.length)
						var data = res.body.cp_tj
						$.each(data, (k, v) => {
							this.remenData.push(v);
						})
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
	.find {
		background: #f4f4f4;
		/*height: 100%;*/
		overflow-y: scroll;
	}
	.max{height: 8.4rem;}
	@media screen and (min-width: 1024px) {
	    .max {
	        height: 10.7rem;
	    }
	}
	/*第一个swiper*/
	
	#swiper-slide {
		width: 2.1rem!important;
	}
	
	#swiper-container2 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
	}
	
	#swiper-container2 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	#swiper-container2 .active-nav {
		background: #fff !important;
	}
	
	#swiper-container2 .active-nav span {
		display: inline-block;
		/*border-bottom: 2px solid #008dd3;*/
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	
	.swiper-slide {
		color: #000;
		line-height: 300px;
		text-align: center;
		font-size: 50px;
	}
	/*第二个swiper*/
	
	#swiper-container21 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
	}
	
	#swiper-container21 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	#swiper-container21 .active-nav1 {
		background: #fff !important;
	}
	
	#swiper-container21 .active-nav1 span {
		display: inline-block;
		/*border-bottom: 2px solid #008dd3;*/
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	/*热门swiper*/
	/*第二个swiper*/
	
	#swiper-container22 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
	}
	
	#swiper-container22 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	#swiper-container22 .active-nav2 {
		background: #fff !important;
	}
	
	#swiper-container22 .active-nav2 span {
		display: inline-block;
		/*border-bottom: 2px solid #008dd3;*/
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	
	.find1-banner {
		width: 100%;
		height: 3.2rem;
	}
	
	.find1-banner img {
		width: 100%;
		height: 3.2rem;
	}
	
	.find1-nav {
		margin-top: 0.14rem;
		background: #fff;
		padding-top: 0.13rem;
	}
	
	.find1-nav p {
		font-size: 0.28rem;
		line-height: 0.6rem;
		text-align: center;
		color: #3F3F4E;
	}
	
	.swiper {
		width: 2.6rem;
		font-size: 0.2rem;
		float: left;
		padding-bottom: 0.17rem;
	}
	
	.swiper-li1 {
		width: 2.6rem;
		height: 2.6rem;
	}
	
	.swiper-li1 img {
		width: 100%!important;
		height: 2.6rem!important;
	}
	
	.swiper-li2 {
		line-height: 0.28rem;
		color: #3F3F4E;
		margin-top: 0.13rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.swiper-li3 {
		line-height: 0.48rem;
		color: #fc8209;
	}
	
	.news {
		margin-top: 0.14rem;
		background: #fff;
	}
	
	.news-li1 {
		width: 100%;
		height: 3.2rem;
	}
	
	.news-li1 img {
		width: 100%;
		height: 3.2rem;
	}
	
	.news-li2 {
		text-align: left;
		font-size: 0.26rem;
		color: #3F3F4E;
		line-height: 0.74rem;
		padding: 0 0.24rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.news-li3 {
		font-size: 0.2rem;
		color: #aaabad;
		line-height: 0.66rem;
		padding: 0 0.24rem;
		overflow: hidden;
	}
	
	.news-sp1 {
		float: left;
	}
	
	.news-sp2 {
		float: right;
	}
	/*家居设计*/
	
	.find1-list {
		margin-top: 0.14rem;
	}
	
	.find1-navlist {
		background: #fff;
		overflow: hidden;
		display: flex;
		margin-bottom: 0.07rem;
		padding-top: 0.25rem;
	}
	
	.find1-ul1 {
		float: left;
		flex: 1;
		padding: 0 0.24rem;
		position: relative;
		padding-top: 0.2rem;
	}
	
	.find1-ul2 {
		float: right;
		width: 2.94rem;
		height: 2.24rem;
	}
	
	.find1-li1 {
		width: 2.94rem;
		height: 2.24rem;
	}
	
	.find1-li1 img {
		width: 2.94rem!important;
		height: 2.24rem!important;
	}
	
	.find1-li2 {
		font-size: 0.26rem;
		color: #3F3F4E;
		line-height: 0.36rem;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.find1-li3 {
		font-size: 0.2rem;
		color: #aaabad;
		line-height: 0.7rem;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		width: calc(100% - 0.48rem);
	}
	
	.find1-sp1 {
		float: left;
	}
	
	.find1-sp2 {
		float: right;
	}
	/*轮播图*/
	
	.slide {
		position: relative;
	}
	
	.find>>>.swiper-slide {
		line-height: 0;
	}
	
	.swiper-container .swiper-slide {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.swiper-container .swiper-slide img {
		display: block;
		width: 100%;
		height: 3.2rem;
	}
	
	.swiper-container-horizontal>.swiper-pagination-bullets {
		right: 0.15rem;
		left: inherit;
	}
	
	.slide .swiper-pagination {
		width: auto;
		font-size: 0;
	}
	
	.find>>>.swiper-pagination-bullet-active {
		opacity: 1;
		background: #fff;
	}
	.find>>>.vux-slider>.vux-indicator>a>.vux-icon-dot.active,
	.vux-slider .vux-indicator-right>a>.vux-icon-dot.active {
		background: #FF852C!important;
	}
</style>