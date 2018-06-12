<template>
	<div class="shop">
		<div class="shop-header">
			<div class="header">
				<a class="a1" href="javascript:history.back(-1);"></a>
				<!--<a href="javascript:history.back(-1);" class="a1"></a>-->
				<div class="input-box">
					<img class="search" src="../../../static/images/chanpin/white_searchlogo.png" alt="">
					<router-link :to="{path:'/qiyesearch', query:{id:this.$route.query.id,type:this.type}}">
					<input type="text" placeholder="请输入关键字">
					</router-link>
				</div>
				<a class="a2" href="#/help"></a>
			</div>
			<div class="shop-info">
				<img v-lazy="this.zzjgdm_img">
				<p>{{this.title}}</p>
				<span style="font-size: 0.16rem;height: 0.3rem;line-height: 0.3rem;display: block;">{{this.ytitle}}</span>
			</div>
		</div>

		<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
			<swiper-slide style="width: 1.5rem" class="active-nav body_bottom" type="1"><span>首页</span></swiper-slide>
			<swiper-slide style="width: 1.5rem" class="body_bottom" type="2"><span>企业信息</span></swiper-slide>
			<swiper-slide style="width: 1.5rem" class="body_bottom" type="3"><span>企业新闻</span></swiper-slide>
			<swiper-slide style="width: 1.5rem" class="body_bottom" type="4"><span>企业产品</span></swiper-slide>
			<swiper-slide style="width: 1.5rem" class="body_bottom" type="5"><span>企业品牌</span></swiper-slide>
			<swiper-slide style="width: 1.5rem" class="body_bottom" type="6"><span>联系方式</span></swiper-slide>
		</swiper>
		<div class="shop-back" style="position:relative;top:2.7rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 2.7rem);">
			<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
				<!--首页-->
				<swiper-slide>
					<div class="first" type="1" contype="1">
						<div class="content1" style="margin-top: 0.14rem;">
							<div class="content-top1">
								<span>最新产品</span>
							</div>
							<div class="content-bottom">
								<div class="conbt-top">
									<img v-lazy="this.logo" />
								</div>
							</div>
							<div class="conbt-bottom">
								<div class="swiper1" v-for="(list,index) in this.qyData.product_tj" :key="index" :style="index%2!=0?'width:50%;margin-right:0':''">
									<router-link :to="{path:'/pro_details',query:{id:list.id}}">
									<ul class="swiper1-ul1">
										<li class="swiper1-li1"><img v-lazy="list.thumb" /></li>
										<li class="swiper1-li2">{{list.title}}</li>
										<li class="swiper1-li2" style="font-size: 0.16rem;color: #898991;margin-top: 0;">{{list.description}}</li>
										<li class="swiper1-li3" v-text="list.price==0?'面议':'￥'+list.price"></li>
									</ul>
									</router-link>
								</div>
							</div>
							<!--<div class="more-first-info more-new">更多新品</div>-->
						</div>
						<div class="company-intro">
							<span class="company-intro-tit">企业简介</span>
							<div class="co" v-html="this.qiyjj"></div>
						</div>
						<div style="height: 0.15rem;background: #f4f4f4;"></div>
						<div class="content-tit">企业报道</div>
						<div class="banner">
							<swiper :options="swiperOptionCon1" id="swiper-container31" ref="mySwiperCon1">
								<swiper-slide class="swiper-slide" v-for="list in qyData.company_news">
									<img v-lazy="list.thumb">
									<div class="report-tip">
										<span>{{list.title}}</span>
									</div>
								</swiper-slide>
							</swiper>
							<swiper :options="swiperOptionTab1" id="swiper-container21" ref="mySwiperTab1">
								<swiper-slide class="body_bottom" style="width: 3.5rem;margin-left:0.1rem;" v-for="list in qyData.company_news">
									<div class="report-item">
										<img v-lazy="list.thumb">
										<p>{{list.title}}</p>
									</div>
								</swiper-slide>
							</swiper>
						</div>
						<!--<router-link :to="{path:'/more_baodao',query:{id:this.$route.query.id}}">
							<div class="more-first-info more-new">更多报道</div>
						</router-link>-->
						<div class="content-tit">联系方式</div>
						<div style="margin: 0 0.2rem;">
							<div class="first-info" v-for="(list,index) in qyData.company_address">
								<div class="first-info-thead" style="text-align: center;">联系方式 {{index+1}}</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">部门名称</div>
									<div class="first-info-tr-right">{{list.name}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">负责人</div>
									<div class="first-info-tr-right">{{list.link_name}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">电话</div>
									<div class="first-info-tr-right">{{list.link_phone}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">所在地</div>
									<div class="first-info-tr-right">{{list.province}} {{list.city}} {{list.district}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">详细地址</div>
									<div class="first-info-tr-right">{{list.address}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">邮编</div>
									<div class="first-info-tr-right">{{list.zipcode}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">邮箱</div>
									<div class="first-info-tr-right">{{list.link_email}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">网址链接</div>
									<div class="first-info-tr-right">{{list.web_url}}/</div>
									<div style="clear:both"></div>
								</div>
								<router-link :to="{path:'/map',query:{lng:list.lng, lat:list.lat}}" style="color: #000;">
								<div class="first-info-footer" style="text-align: center;">查看地图信息</div>
								</router-link>
							</div>
						</div>

					</div>
				</swiper-slide>
				<!--企业信息-->
				<swiper-slide>
					<div class="first" type="2" contype="2">
						<div style="height: 0.15rem;background: #f4f4f4;"></div>
						<div class="content-list">
							<div class="content-tit">
								<span>企业资质</span>
								<div class="onOrDown on"></div>
							</div>
							<div class="company-intro" style="padding-top: 0;" v-html="company_info.qiyzz">

							</div>
							<div class="borders" style="height: 0.15rem;background: #f4f4f4;"></div>
						</div>
						<div class="content-list">
							<div class="content-tit">
								<span>经营范围</span>
								<div class="onOrDown on"></div>
							</div>
							<div class="company-intro" style="padding-top: 0;" v-html="company_info.jinyfw">

							</div>
							<div class="borders" style="height: 0.15rem;background: #f4f4f4;"></div>
						</div>
						<div class="content-list">
							<div class="content-tit">
								<span>企业证书</span>
								<div class="onOrDown"></div>
							</div>
							<div class="company-intro" style="padding-top: 0;" v-html="company_info.qiyzs">

							</div>
							<div class="borders" style="height: 0.15rem;background: #f4f4f4;"></div>
						</div>
						<div class="content-list">
							<div class="content-tit">
								<span>图片展示</span>
								<div class="onOrDown"></div>
							</div>
							<div class="company-intro" style="padding-top: 0;" v-for="img in xinxiData.show_img">
								<div v-html="img.content"></div>
							</div>
							<div class="borders" style="height: 0.15rem;background: #f4f4f4;"></div>
						</div>
						<div class="content-list">
							<div class="content-tit">
								<span>视频展示</span>
								<div class="onOrDown"></div>
							</div>
							<div class="company-intro" style="padding-top: 0;">
										<video v-for="video in xinxiData.show_video" preload="none" controls="controls" style="width: 100%;height: 3.34rem;" :src="video.fileurl" type="video/mp4">
										</video>
							</div>
							<div class="borders" style="height: 0.15rem;background: #f4f4f4;"></div>
						</div>
					</div>
				</swiper-slide>
				<!--企业新闻-->
				<swiper-slide>
					<div class="first" type="3" contype="3">
						<div class="company-news" v-for="list in newData.company_news">
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
				</swiper-slide>
				<!--企业产品-->
				<swiper-slide>
					<div class="first" type="4" contype="4">
						<swiper :options="swiperOptionTabzt" id="swiper-container22" ref="mySwiperTabzt">
							<swiper-slide :class="index==0 ? 'active-nav2' : ''" v-for="(list,index) in chanpinData.cat_list" :key="index" :cp_catid="list.catid"><span>{{list.catname}}</span></swiper-slide>
						</swiper>
						<swiper :options="swiperOptionConzt" id="swiper-container3" ref="mySwiperConzt">
							<swiper-slide v-for="(list,index) in chanpinData.cat_list">
								<div class="first" id="zhuanti">
									<router-link v-for="(list,index) in chanpinData.product_list" :to="{path:'/pro_details',query:{id:list.id}}">
									<div class="chang">
										<div class="chang-left">
											<img v-lazy="list.thumb" />
										</div>
										<div class="keep-list-right">
											<ul>
												<li class="li1">{{list.title}}</li>
												<li class="li3">品牌：{{list.brand}} 产地：{{list.yieldly}}</li>
												<li class="li2" v-text="list.price==0?'面议':'￥'+list.price"></li>
											</ul>
										</div>
										<div class="chang-right"></div>
										
									</div>
									</router-link>
								</div>
							</swiper-slide>
						</swiper>
					</div>
				</swiper-slide>
				<!--企业品牌-->
				<swiper-slide>
					<div class="first" type="5" contype="5">
						<div class="pinpai" v-for="list in pinpaiData.brand_data">
							<div class="pinpailist">
								<ul>
									<router-link :to="{path:'/shopdetails',query:{brand_id:list.id,company_id:list.uid}}">
										<li class="li1"><img v-lazy="list.thumb" /></li>
										<li class="li2">{{list.title}}</li>
										<li class="li3" v-html="list.content"></li>
										<li class="li4">查看详情</li>
									</router-link>
									<li class="li5">
										<!-- :href="list.url"-->
										<a style="color: #898991;">进去品牌官网</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</swiper-slide>
				<!--联系方式-->
				<swiper-slide>
					<div class="first" type="6" contype="6">
						<div style="margin: 0 0.2rem;margin-top: 0.1rem;">
							<div class="first-info" v-for="(list,index) in mobileData.company_address">
								<div class="first-info-thead" style="text-align: center;">联系方式 {{index+1}}</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">部门名称</div>
									<div class="first-info-tr-right">{{list.name}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">负责人</div>
									<div class="first-info-tr-right">{{list.link_name}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">电话</div>
									<div class="first-info-tr-right">{{list.link_phone}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">所在地</div>
									<div class="first-info-tr-right">{{list.province}} {{list.city}} {{list.district}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">详细地址</div>
									<div class="first-info-tr-right">{{list.address}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">邮编</div>
									<div class="first-info-tr-right">{{list.zipcode}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">邮箱</div>
									<div class="first-info-tr-right">{{list.link_email}}</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-info-tr" style="color:#787883">
									<div class="first-info-tr-left">网址链接</div>
									<div class="first-info-tr-right">
										<a style="display: block;height: 100%;" :href="list.web_url">{{list.web_url}}</a>
									</div>
									<div style="clear:both"></div>
								</div>
								<router-link :to="{path:'/map',query:{lng:list.lng, lat:list.lat}}" style="color: #000;">
								<div class="first-info-footer" style="text-align: center;">查看地图信息</div>
								</router-link>
							</div>
						</div>

					</div>
				</swiper-slide>
			</swiper>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				tips: '',
				loading: false,
				goodsname:'',
				qyData: [],
				newData: [],
				mobileData: [],
				pinpaiData: [],
				chanpinData: [],
				xinxiData: [],
				company_info: [],
				bannercode: '',
				zzjgdm_img: '',
				title: '',
				logo: '',
				ytitle: '',
				qiyjj: '',
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 'auto'
				},
				swiperOptionCon: {
					notNextTick: true,
					autoHeight: true
				},
				swiperOptionTab1: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 'auto'
				},
				swiperOptionCon1: {
					notNextTick: true,
					autoHeight: true
				},

				//第二个swiper（产品）
				swiperOptionTabzt: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
				},
				swiperOptionConzt: {
					autoHeight: true,
					notNextTick: true,
					onlyExternal:true
				}
			}
		},
		mounted() {
			this.type = 1
			this.getData(this.type)
			$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
			//导航
			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
			swiperTab.on('tap', function(obj) {
				swiperCon.slideTo(obj.clickedIndex);
			});

			swiperCon.on('slideChangeStart', function(obj) {
				$('#swiper-container2 .active-nav').removeClass('active-nav')
				var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
				if(activeNav.index() > swiperTab.activeIndex) {
					var thumbsPerNav = Math.floor(swiperTab.width / activeNav.width()) - 1
					swiperTab.slideTo(activeNav.index() - thumbsPerNav)
				} else {
					swiperTab.slideTo(activeNav.index())
				}
			});
			swiperCon.on('slideChangeEnd', (obj) => {
				$('.shop-back').scrollTop(0)
				$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
				this.type = $('#swiper-container2 .active-nav').attr('type')
				this.getData(this.type)
			});

			//轮播1
			var swiperTab1 = this.swiperTab1;
			var swiperCon1 = this.swiperCon1;
			swiperTab1.on('tap', function(obj) {
				swiperCon1.slideTo(obj.clickedIndex);
			});
			swiperCon1.on('slideChangeStart', function(obj) {
				$('#swiper-container21 .active-nav2').removeClass('active-nav1')
				var activeNav = $('#swiper-container21 .swiper-slide').eq(obj.activeIndex).addClass('active-nav1');
				if(activeNav.index() > swiperTab1.activeIndex) {
					var thumbsPerNav = Math.floor(swiperTab1.width / activeNav.width()) - 1
					swiperTab1.slideTo(activeNav.index() - thumbsPerNav)
				} else {
					swiperTab1.slideTo(activeNav.index())
				}
			});
			//第二个swiper
			var swiperTabzt = this.swiperTabzt;
			var swiperConzt = this.swiperConzt;
			//第二个swiper
			swiperTabzt.on('tap', function(obj) {
				swiperConzt.slideTo(obj.clickedIndex);
			});
			swiperConzt.on('slideChangeStart', function(obj) {
				$('#swiper-container22 .active-nav2').removeClass('active-nav2')
				var activeNav = $('#swiper-container22 .swiper-slide').eq(obj.activeIndex).addClass('active-nav2');
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
				window.scrollTo(0, 0)
				this.cp_catid = $('#swiper-container22 .active-nav2').attr('cp_catid')
				this.chanpin(this.cp_catid);
				//				$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
				return;
			});
			
		},
		methods: {
			getData(type) {
				switch(type) {
					case '2':
						this.xinxi()
						break;
					case '3':
						this.newsData()
						break;
					case '4':
						this.chanpin()
						break;
					case '5':
						this.ppData()
						break;
					case '6':
						this.moData()
						break;
					default:
						//推荐
						this.qiyeData();
				}
			},
			qiyeData() {
				this.$http.post(getOpenUrl() + 'store_info', {

						did: this.$route.query.id
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.qyData = res.body
							this.bannercode = this.qyData.ad_data.ad_code
							this.zzjgdm_img = this.qyData.company_info.zzjgdm_img
							this.title = this.qyData.company_info.title
							this.logo = this.qyData.ad_index.ad_code
							this.ytitle = this.qyData.company_info.ytitle
							this.qiyjj = this.qyData.company_info.qiyjj
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
			},
			newsData() {
				this.$http.post(getOpenUrl() + 'company_qyxw', {

						did: this.$route.query.id
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.newData = res.body
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
			},
			moData() {
				this.$http.get(getOpenUrl() + 'company_lxfs', {
						params:{
							did: this.$route.query.id
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.mobileData = res.body
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
			},
			ppData() {
				this.$http.post(getOpenUrl() + 'company_qypp', {

						did: this.$route.query.id
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.pinpaiData = res.body
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
			},
			chanpin() {
				this.$http.post(getOpenUrl() + 'company_qycp', {
						keyword: this.goodsname,
						int_size: 8,
						page: 1,
						brand_id: '',
						did: this.$route.query.id,
						cp_catid:this.cp_catid
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.chanpinData = res.body
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
			},
			xinxi() {
				this.$http.post(getOpenUrl() + 'company_info', {
						keyword: '',
						int_size: 8,
						page: 1,
						brand_id: '',
						did: this.$route.query.id
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.xinxiData = res.body
							this.company_info = res.body.company_info
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
		components: {
			swiper,
			swiperSlide
		},
		computed: {
			//导航
			swiperTab() {
				return this.$refs.mySwiperTab.swiper
			},
			swiperCon() {
				return this.$refs.mySwiperCon.swiper
			},
			//			//轮播1
			swiperTab1() {
				return this.$refs.mySwiperTab1.swiper
			},
			swiperCon1() {
				return this.$refs.mySwiperCon1.swiper
			},
			//			//第二个swiper（产品）
			swiperTabzt() {
				return this.$refs.mySwiperTabzt.swiper
			},
			swiperConzt() {
				return this.$refs.mySwiperConzt.swiper
			}
		}
	}
</script>

<style scoped>
	/*首页*/
	/*content1*/
	
	.content-top1 {
		height: 0.8rem;
		background: #fff;
		position: relative;
	}
	
	.content-top1 span {
		display: block;
		color: #3F3F4E;
		font-size: 0.26rem;
		line-height: 0.8rem;
		margin-left: 0.24rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.content-bottom1 {
		overflow: hidden;
	}
	
	.conbt-top {
		height: 3.2rem;
		width: 100%;
	}
	
	.conbt-top img {
		height: 3.2rem;
		width: 100%;
	}
	
	.conbt-bottom {
		margin-top: 0.14rem;
		overflow: hidden;
		background: #fff;
	}
	
	.conbt-footer {
		background: #fff;
		color: #e5e5e5;
		height: 0.7rem;
		line-height: 0.7rem;
		font-size: 0.22rem;
		text-align: center;
		border-top: 1px solid #eee;
	}
	
	.co>>>span {
		font-size: 0.2rem!important;
	}
	
	.co>>>img {
		width: 100%;
	}
	
	.company-intro>>>img {
		width: 100%;
	}
	
	.swiper1 {
		width: calc(50% - 0.1rem);
		font-size: 0.2rem;
		float: left;
		padding-bottom: 0.17rem;
		margin-right: 0.1rem;
	}
	
	.swiper1-li1 {
		width: 100%;
		height: 3.15rem;
	}
	
	.swiper1-li1 img {
		width: 100%!important;
		height: 100%!important;
	}
	
	.swiper1-li2 {
		line-height: 0.28rem;
		height: 0.28rem;
		color: #3F3F4E;
		margin-top: 0.13rem;
		text-align: left;
		padding-left: 0.2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.swiper1-li3 {
		line-height: 0.48rem;
		color: #fc8209;
		text-align: left;
		padding-left: 0.2rem;
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
	
	.first-info-thead {
		width: calc(100% - 0.2rem);
		height: .6rem;
		line-height: .6rem;
		padding-left: 0.2rem;
		border-bottom: 1px solid #eee;
		font-size: 0.2rem;
	}
	
	.first-info-footer {
		border-bottom: 1px solid #eee;
		font-size: 0.2rem;
		height: 0.45rem;
		padding-top: 0.9rem;
		background: url(../../../static/images/chanpin/map.png) no-repeat center 20%;
		background-size: 1rem;
	}
	
	.first-info-tr {
		width: 100%;
		height: 100%;
	}
	
	.first-info-tr-right {
		width: calc(80% - 1px - 0.2rem);
		height: .6rem;
		line-height: .6rem;
		float: left;
		border-left: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding-left: 0.2rem;
		font-size: 0.2rem;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.first-info-tr-left {
		width: 20%;
		height: .6rem;
		line-height: .6rem;
		font-size: 0.2rem;
		text-align: center;
		float: left;
		border-bottom: 1px solid #eee;
	}
	
	.first-info {
		width: 100%;
		border: 1px solid #eee;
		border-bottom: none;
		margin-bottom: 0.1rem;
	}
	
	#swiper-container31 .swiper-slide img {
		width: 100%;
		height: 3rem;
		position: relative;
	}
	
	#swiper-container31 .swiper-slide .report-tip span {
		width: 5rem;
		display: block;
		overflow: hidden;
		white-space: nowrap;
		margin: 0 auto;
		text-overflow: ellipsis;
	}
	
	#swiper-container31 .swiper-slide .report-tip {
		width: 100%;
		position: absolute;
		line-height: 0.85rem;
		bottom: 0;
		height: 0.85rem;
		color: #fff;
		background: rgba(0, 0, 0, .5);
	}
	
	#swiper-container21 .body_bottom.active-nav {
		background: #fff !important;
	}
	
	#swiper-container21 .body_bottom .report-item {
		width: 3.5rem;
		height: 3rem;
		float: left;
	}
	
	#swiper-container21 .body_bottom .report-item p {
		padding: 0.2rem 0.3rem 0 0.2rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	#swiper-container21 .body_bottom .report-item img {
		width: 100%;
		display: block;
		height: 2rem;
		background: #b8c9db;
	}
	/*#swiper-container21 .body_bottom{*/
	/*width:3.5rem;*/
	/*}*/
	
	#swiper-container21 {
		width: 100%;
		margin-top: 0.1rem;
	}
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
		border-bottom: 2px solid #fd9b3a;
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	/*第二个swiper*/
	
	#swiper-container23 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
	}
	
	#swiper-container23 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	#swiper-container23 .active-nav3 {
		background: #fff !important;
	}
	
	#swiper-container23 .active-nav3 span {
		display: inline-block;
		border-bottom: 2px solid #fd9b3a;
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	
	.company-intro p {
		line-height: 0.5rem;
		text-indent: 0.6rem;
		font-size: 0.22rem;
	}
	
	.company-intro img {
		width: 100%;
		height: 2.56rem;
		background: #b6c0c2;
	}
	
	.company-intro .company-intro-tit {
		font-size: 0.26rem;
		height: 0.48rem;
		display: block;
	}
	
	.company-intro {
		padding-top: 0.3rem;
		margin: 0 0.2rem;
	}
	
	.more-first-info {
		height: 0.75rem;
		line-height: 0.75rem;
		color: #ff651d;
		text-align: center;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		font-size: 0.2rem;
		background: url(../../../static/images/chanpin/yellowRight.png) no-repeat 68% 45%;
		background-size: 0.2rem;
	}
	
	.more-new {
		background: url(../../../static/images/chanpin/yellowRight.png) no-repeat 60% 45%;
		background-size: 0.2rem;
	}
	
	.table-pro-list ul {
		width: calc(50% - 0.05rem);
		height: 4.25rem;
		float: left;
	}
	
	.table-pro-list ul {
		padding-right: 0.05rem;
	}
	
	.table-pro-list ul:nth-child(2n) {
		padding-right: 0;
		padding-left: 0.05rem;
	}
	
	.table-pro-list ul .pro-list-money {
		font-size: 0.2rem;
		padding-left: 0.2rem;
		line-height: normal;
		text-align: left;
		color: #ff651d;
	}
	
	.table-pro-list ul .pro-list-tit {
		font-size: 0.2rem;
		padding-left: 0.2rem;
		padding-top: 0.2rem;
		text-align: left;
		line-height: normal;
	}
	
	.table-pro-list ul li img {
		width: 100%;
		height: 3.2rem;
		background: #f0e1dc;
	}
	
	.content-banner {
		height: 3.2rem;
	}
	
	.content-banner img {
		width: 100%;
		height: 3.2rem;
		display: block;
		background: #f7ece9;
	}
	
	.content-tit {
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
		color: #000;
		padding-left: 0.26rem;
		text-align: left;
	}
	
	.content-tit .onOrDown.on {
		/*background: url(../../../static/images/chanpin/bigDown.png) no-repeat 0 50%;*/
		/*background-size: 0.3rem auto;*/
		transform: rotate(180deg);
	}
	
	.content-tit .onOrDown {
		width: 0.35rem;
		height: 0.8rem;
		float: right;
		background: url(../../../static/images/chanpin/bigOn.png) no-repeat 0 50%;
		background-size: 0.3rem auto;
		margin-right: 0.2rem;
		transition: all .3s ease-in;
	}
	
	.content-tit span {
		float: left;
	}
	
	#swiper-container2 {}
	
	#swiper-container2 .swiper-slide {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		line-height: 0.8rem !important;
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
		border-bottom: 3px solid #fc8209;
		color: #fc8209 !important;
		margin-bottom: -1px;
	}
	
	#swiper-container2 {
		/*border-bottom: 0.1rem solid #f4f4f4;*/
		overflow: visible;
		position: fixed;
		background: #Fff;
		z-index: 6;
		top: 1.9rem;
		width: 100%;
	}
	
	.shop-info img {
		width: 0.48rem;
		height: 0.48rem;
		background: #40484d;
		margin-left: 0.24rem;
		margin-right: 0.1rem;
		float: left;
	}
	
	.shop-info {
		font-size: 0.2rem;
		color: #fff;
		margin-top: 0.1rem;
	}
	
	.header .a2 {
		width: 0.45rem;
		height: 100%;
		display: block;
		background: url(../../../static/images/chanpin/whiteMessage.png) no-repeat 0 50%;
		background-size: 0.45rem;
		float: left;
		margin-left: 0.12rem;
	}
	
	.header .input-box input {
		float: left;
		margin-left: 0.2rem;
		color: #fff;
	}
	
	.header .input-box input::-webkit-input-placeholder {
		color: #fff;
		font-size: 0.22rem;
	}
	
	.header .input-box .search {
		width: 0.27rem;
		height: 0.26rem;
		float: left;
	}
	
	.header .input-box {
		width: 4.7rem;
		height: 0.45rem;
		padding-left: 0.1rem;
		padding-top: 0.15rem;
		border: 1px solid #fff;
		background: rgba(255, 255, 255, .5);
		float: left;
		border-radius: 0.05rem;
		margin-top: 0.12rem;
		margin-left: 0.2rem;
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
		/*height: 1.6rem;*/
		padding-top: 0.2rem;
		background: url(../../../static/images/chanpin/bk.png) no-repeat;
		background-size: 100% 2.18rem;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	
	.pinpai {
		overflow: hidden;
		background: #f4f4f4;
		padding: 0 0.12rem;
		padding-top: 0.12rem;
	}
	
	.pinpailist {
		overflow: hidden;
		width: 2.78rem;
		float: left;
		margin: 0 0.15rem;
	}
	
	.pinpailist ul {
		width: 2.78rem;
		float: left;
		overflow: hidden;
		text-align: center;
		background: #fff;
		margin-bottom: 0.12rem;
	}
	
	.pinpailist .li1 {
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto;
	}
	
	.pinpailist .li1 img {
		width: 1.1rem;
		height: 1.1rem;
	}
	
	.pinpailist .li2 {
		font-size: 0.22rem;
		color: #3F3F4E;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.pinpailist .li3 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.16rem;
		color: #5b5b67;
	}
	
	.pinpailist .li4 {
		font-size: 0.2rem;
		color: #5b5b67;
		line-height: 0.6rem;
	}
	
	.pinpailist .li5 {
		font-size: 0.2rem;
		color: #898991;
		line-height: 0.6rem;
		height: 0.6rem;
		border-top: 4px solid #f4f4f4;
	}
	/*厂家*/
	
	.chang {
		margin: 0 0.24rem;
		margin-top: 0.14rem;
		margin-bottom: 5px;
		overflow: hidden;
		display: flex;
		background: #fff;
		box-shadow: 0 2px 5px #AAABAD;
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
	
	.chang-right {
		width: 0.38rem;
		height: 1.7rem;
		margin-left: 0.32rem;
		margin-right: 0.18rem;
		background: url(../../../static/images/index/rightorange.png) no-repeat 0 50%;
		background-size: 0.38rem auto;
		float: right;
	}
	
	.keep-list-right {
		float: left;
		margin-left: 0.23rem;
		margin-top: 0.17rem;
		flex: 1;
		/*position: relative;*/
	}
	
	.keep-list-right .li1 {
		height: 0.65rem;
		line-height: 0.33rem;
		font-size: 0.24rem;
		color: #3F3F4E;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.keep-list-right .li2 {
		line-height: 0.37rem;
		font-size: 0.2rem;
		color: #FF852C;
		/*position: absolute;
		bottom: 0.2rem;*/
	}
	
	.keep-list-right .li3 {
		line-height: 0.3rem;
		font-size: 0.22rem;
		color: #74747d;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	/*video*/
	
	.shop>>>.video-js {
		width: 100%;
		height: 3.34rem;
	}
	
	.shop>>>.vjs-big-play-button {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 0.6rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border-radius: 50%;
		font-size: 0.3rem;
	}
	
	.shop>>>.video-js button {
		outline: none;
	}
	
	.shop>>>.vjs-tech {
		height: auto;
	}
</style>