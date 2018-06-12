<template>
	<div class="classdetail">
		<my-header1 :title="this.$route.query.title"></my-header1>
		<swiper1 :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
			<swiper-slide :class="index==0 ? 'active-nav' : ''" v-for="(list, index) in detailData.solution_parent" :catid="list.catid"><span>{{list.catname}}</span></swiper-slide>
		</swiper1>
		<div class="navigation" style="padding-top: 1.98rem;">
			<swiper1 :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
				<swiper-slide v-for="(list, cindex) in detailData.arr_childrens">
					<div class="max">
						<scroller lock-x height="100%">
							<!--<div>-->
							<div class="first" id="zhuanti">
								<div class="dianping">
									<div class="nav-t">专家点评</div>
									<div class="nav-b" v-for="zjdp in list.zjdp_data" v-html="zjdp.content"></div>
									<div class="gengduo" v-if="list.zjdp_data.length==0" style="color: #3F3F4E;">暂无解决方案</div>
								</div>
								<div class="fangan">
									<div class="nav-t">解决方案</div>
									<div>
										<router-link class="fangan-all" v-for="(jjfa, index) in list.jjfa_data" :to="{ path: 'url', query: {catid:jjfa.catid,id:jjfa.id}}">
											<div class="fangan-l">
												<img v-lazy="jjfa.thumb" />
											</div>
											<div class="fangan-r">
												<ul>
													<li class="li1">{{jjfa.title}}</li>
													<li class="li2">{{jjfa.ttime}}</li>
												</ul>
											</div>
										</router-link>
									</div>
									<!--<div class="gengduo" v-if="list.jjfa_data.length>0">更多方案></div>-->
									<div class="gengduo" v-if="list.jjfa_data.length==0" style="color: #3F3F4E;">暂无解决方案</div>
								</div>
								<div class="fangan">
									<div class="nav-t">相关产品</div>
									<div class="keep-list" v-for="(xgcp, index) in list.xgcp_data">
										<div class="keep-list-left">
											<img v-lazy="xgcp.thumb" />
										</div>
										<div class="keep-list-right">
											<ul>
												<li class="li1">{{xgcp.title}}</li>
												<li class="li3">厂家：{{xgcp.company}}</li>
											</ul>
										</div>
									</div>
									<!--<div class="gengduo" v-if="list.xgcp_data.length>0" style="border: 0;">更多产品></div>-->
									<div class="gengduo" v-if="list.xgcp_data.length==0" style="color: #3F3F4E;border: 0;">暂无相关产品</div>
								</div>
								<div class="fangan">
									<div class="nav-t">相关品牌</div>
									<div class="pinpai">
										<router-link class="chang" v-for="(xgpp,index) in list.xgpp_data" :key="index" :to="{ path: 'shop', query: {id: xgpp.id}}">

											<div class="pinpailist">
												<ul>
													<li class="li1"><img v-lazy="xgpp.thumb" /></li>
													<li class="li2">{{xgpp.title}}</li>
													<li class="li3">{{xgpp.ytitle}}</li>
													<!--<li class="li4">查看详情</li>-->
													<li class="li5">进去品牌官网</li>
												</ul>
											</div>
										</router-link>
									</div>
									<!--<div class="gengduo" v-if="list.xgpp_data.length>0" style="border: 0;">更多品牌></div>-->
									<div class="gengduo" v-if="list.xgpp_data.length==0" style="color: #3F3F4E;border: 0;">暂无相关品牌</div>
								</div>
								<div class="fangan">
									<div class="nav-t">相关标准</div>

									<div style="padding-bottom: 0.24rem;margin: 0 0.24rem;border-bottom: 1px solid #f4f4f4;">

										<div class="fanganlist" @click="url(xgbz.url)" v-for="(xgbz, index) in list.xgbz_data">
											<!--<router-link class="fanganlist" v-for="(xgbz, index) in list.xgbz_data" :to="{ path: 'url', query: {url: xgbz.url}}">-->
											<!--<a target="_system" :href="xgbz.url">-->
											<div class="falist-l">
												<img v-lazy="xgbz.bthumb" />
											</div>
											<div class="falist-r">
												<ul>
													<li class="li1">{{xgbz.bname}}</li>
													<li class="li2">{{xgbz.ctime}}</li>
												</ul>
											</div>
											<!--</a>-->
											<!--</router-link>-->
										</div>

									</div>
									<!--<div class="gengduo" v-if="list.xgbz_data.length>0" style="border: 0;">更多方案></div>-->
									<div class="gengduo" v-if="list.xgbz_data.length==0" style="color: #3F3F4E;border: 0;">暂无相关品牌</div>

								</div>
								<div class="fangan">
									<div class="nav-t">专项图集</div>
									<div style="overflow: hidden;">
										<div class="body-list" :style="index%2!=0?'float: right;background: #ecf6ee':''" v-for="(zxtj,index) in list.zxtj_data" :key="index">
											<router-link :to="{ path: 'photodetail', query: {catid: zxtj.fileurl.catid,id:zxtj.fileurl.id}}">
												<dl>
													<dt><img v-lazy="zxtj.thumb"/></dt>
													<dd>
														<span class="sp1">{{zxtj.title}}</span>
														<span class="sp2">{{zxtj.company}}</span>
													</dd>
												</dl>
											</router-link>
										</div>
									</div>
									<!--<div class="gengduo" v-if="list.zxtj_data.length>0" style="border: 0;">更多方案></div>-->
									<div class="gengduo" v-if="list.zxtj_data.length==0" style="color: #3F3F4E;border: 0;">暂无相关品牌</div>

								</div>
								<div class="fangan">
									<div class="nav-t">相关资源</div>
									<!--<div class="tab-item">
								<ul class="tab-item-ul">
									<li class="tab-item-li active">相关图片</li>
									<li class="tab-item-li">相关视频</li>
									<li class="tab-item-li">资源下载</li>
								</ul>
							</div>-->
									<div class="tab-con">
										<div class="tab-item">
											<ul class="tab-item-ul">
												<li class="tab-item-li">相关图片</li>
											</ul>
										</div>
										<div class="tab-con-box" style="padding-top: 0.14rem;padding-bottom: 0.14rem;overflow: hidden;">
											<div class="pic" v-for="(pic,index) in list.xgtp_data" :key="index" :style="index%2!=0?'float: right':''">
												<img v-lazy='pic.thumb' />
												<span>{{pic.introduce}}</span>
											</div>
											<!--<div v-if="list.xgtp_data.length==0">暂无数据</div>-->
										</div>
										<div class="tab-item">
											<ul class="tab-item-ul">
												<li class="tab-item-li">相关视频</li>
											</ul>
										</div>
										<div class="tab-con-box" style="background: #F4F4F4;">
											<div style="padding: 0.24rem;">
												<swiper v-model="index1" height="auto" :show-dots="false">
													<swiper-item v-for="(video,index) in list.xgsp_data" :key="index">
														<video preload="none" controls="controls" style="width: 100%;height: 3.34rem;" :src="video.fileurl" type="video/mp4">
														</video>
													</swiper-item>
												</swiper>
												<tab :line-width=2 active-color='#fc378c' v-model="index1">
													<tab-item class="vux-center" :selected="index == 0" v-for="(video,index) in list.xgsp_data" :key="index">
														<img :src="video.thumb" style="width: 2.3rem;height: 1.3rem;display: block;" />
													</tab-item>
												</tab>
											</div>
											<!--<div v-if="list.xgsp_data.length==0">暂无数据</div>-->
										</div>
										<div class="tab-item">
											<ul class="tab-item-ul">
												<li class="tab-item-li">资源下载</li>
											</ul>
										</div>
										<div class="tab-con-box">
											<div class="download" v-for="(download,index) in list.zlxz_data" :key="index">
												<div class="download-l">
													<img v-lazy="download.thumb" />
												</div>
												<div class="download-r">
													<ul>
														<li class="li1">{{download.title}}</li>
														<!--<li class="li2">文件<span>34m</span></li>-->
														<!--@click="down"-->
														<li class="li3" @click="down(download.zil_id)">
															<!--<a :href="download.fileurl" @click="url(download.fileurl)" download style="color: #ff852c;">-->
															立即下载
															<!--</a>-->
														</li>
													</ul>
												</div>
											</div>
											
											<!--<div v-if="list.zlxz_data.length==0">暂无数据</div>-->
										</div>
									</div>
								</div>
							</div>
							<!--</div>-->
						</scroller>
					</div>
				</swiper-slide>
			</swiper1>
		</div>
		<mt-popup v-model="popupVisible" popup-transition="popup-fade">
			<div style="position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 5rem;background: #fff;">
				<div class="download" style="border-bottom: 1px solid #F4F4F4;">
					<div class="download-l">
						<img v-lazy='this.thumb'/>
					</div>
					<div class="download-r" style="position: relative;">
						<ul>
							<li class="li1">{{titlewl}}</li>
						</ul>
					</div>
				</div>
				<div class="down-c">
					<span style="font-size: 0.26rem;color: #3F3F4E;line-height: 0.74rem;display: block;padding: 0 0.24rem;">内容简介</span>
					<span style="padding: 0 0.24rem;font-size: 0.22rem;color: #3F3F4E;line-height: 0.36rem;display: block;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;word-wrap: break-word;">{{introduce}}</span>
					<span style="font-size: 0.26rem;color: #3F3F4E;display: block;padding: 0 0.24rem;">下载链接(复制下面链接到除safari的其他浏览器中下载)</span>
					<span style="padding: 0 0.24rem;font-size: 0.22rem;color: #3F3F4E;line-height: 0.36rem;display: block;word-wrap: break-word;" v-if="fileurl!=''">{{fileurl}}</span>
					<span style="padding: 0 0.24rem;font-size: 0.22rem;color: #3F3F4E;line-height: 0.36rem;display: block;word-wrap: break-word;" v-else>暂无链接</span>
					<!--<ul style="margin-top: 0.88rem;height: 0.8rem;line-height: 0.8rem;font-size: 0.24rem;">
						<li style="color: #3F3F4E;width: 50%;background: #efefef;float: left;text-align: center;" @click="down">取消下载</li>
						<li style="color: #fff;width: 50%;background: #FF6821;float: left;text-align: center;">立即下载</li>
					</ul>-->
				</div>
			</div>
		</mt-popup>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible1" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import { Tab, TabItem, Swiper, SwiperItem, Scroller, Spinner } from 'vux'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				loading: false,
				popupVisible1: false,
				tips: '',
				detailData: [],
				index1: 0,
				titlewl:'',
				introduce:'',
				thumb:'',
				fileurl:'',
				//第一个swiper
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
					//					observer: true,//修改swiper自己或子元素时，自动初始化swiper
					//					observeParents: true,//修改swiper的父元素时，自动初始化swiper
				},
				swiperOptionCon: {
					autoHeight: true,
					notNextTick: true,
					onlyExternal: true
				},
				swiperOptionImg: {
					slidesPerView: 3,
					spaceBetween: 5
				}
			}
		},
		components: {
			'swiper1': swiper,
			swiperSlide,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			Scroller,
			Spinner
		},
		mounted() {
			this.catid = this.$route.query.catid;
			this.cid = this.$route.query.cid;
			this.getData(this.catid);
			//第一个swiper
			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
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

			//
			swiperCon.on('slideChangeEnd', (obj) => {
				//				window.scrollTo(0,0)

				return;
			});
			$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
			//			document.addEventListener("deviceready", url, false);
		},
		computed: {
			//第一个swiper
			swiperTab() {
				return this.$refs.mySwiperTab.swiper
			},
			swiperCon() {
				return this.$refs.mySwiperCon.swiper
			}
		},
		methods: {
			//			onTransitionEnd(swiper){
			//				swiper.activeIndex
			//				swiper.onResize()
			//			},
			url(lianjie) {
				cordova.InAppBrowser.open(lianjie, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭')
			},
			down(zil_id) {
				this.popupVisible = !this.popupVisible
				for(var i=0;i<this.detailData.arr_childrens.length;i++){
					for(var j=0;j<this.detailData.arr_childrens[i].zlxz_data.length;j++){
//						console.log(this.detailData.arr_childrens[i].zlxz_data[j])
						if(zil_id==this.detailData.arr_childrens[i].zlxz_data[j].zil_id){
							this.titlewl=this.detailData.arr_childrens[i].zlxz_data[j].title
							this.introduce=this.detailData.arr_childrens[i].zlxz_data[j].introduce
							this.thumb=this.detailData.arr_childrens[i].zlxz_data[j].thumb
							this.fileurl=this.detailData.arr_childrens[i].zlxz_data[j].fileurl
						}
					}
				}
			},
			getData() {
				this.loading = true
				this.$http.post(getOpenUrl() + "solution_all", {
					catid: this.$route.query.catid
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.detailData = res.body;
					this.setSwiperTab();
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
			setSwiperTab() {
				for(var index in this.detailData.solution_parent) {
					if(this.detailData.solution_parent[index].catid == this.cid) {
						this.index = index;

					};
				}
			}
		},
		updated() {
			this.swiperCon.slideTo(this.index);
//			$('.tab-item-li').click(function() {
//
//				//				$(".swiper-wrapper,.swiper-slide").css("height", '100%')
//				$(this).parent().find('li').removeClass('active');
//				$(this).addClass('active');
//				$(this).parent().parent().parent().find('.tab-con-box').hide();
//				$(this).parents('.fangan').find('.tab-con .tab-con-box').eq($(this).index()).show();
//			})
		}
	}
</script>
<style scoped>
	.max {
		height:9.5rem;
	}
	/*@media screen and (min-width: 1024px) {
	    .max {
	        height: 10.7rem;
	    }
	}*/
	
	.classdetail {
		background: #F4F4F4;
		height: auto;
	}
	
	.classdetail>>>.header .a2 {
		display: none;
	}
	
	#swiper-slide {
		width: 2.1rem!important;
	}
	
	#swiper-container2 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
		position: fixed;
		top: 1.28rem;
		width: 100%;
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
		border-bottom: 2px solid #fd9b3a;
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	
	#swiper-container2 img {
		width: 100%;
	}
	
	#swiper-container3 {
		/*padding-top: 0.7rem;*/
	}
	
	.gengduo {
		font-size: 0.24rem;
		line-height: 0.7rem;
		text-align: center;
		color: #ff651d;
		margin: 0 0.24rem;
		border-top: 1px solid #f4f4f4;
	}
	
	.dianping {
		background: #fff;
		margin-top: 0.1rem;
	}
	
	.nav-t {
		line-height: 0.7rem;
		font-size: 0.26rem;
		color: #222632;
		border-bottom: 1px solid #e9e7e7;
		padding-left: 0.24rem;
	}
	
	.nav-b {
		line-height: 0.54rem;
		font-size: 0.24rem;
		color: #52525f;
		padding-left: 0.24rem;
		word-break: break-word;
	}
	
	.nav-b>>>img {
		width: 100%;
	}
	
	.fangan {
		background: #fff;
		margin-top: 0.1rem;
	}
	
	.fangan-all {
		overflow: hidden;
		display: flex;
		margin: 0 0.24rem;
		margin-top: 0.24rem;
		padding-bottom: 0.24rem;
	}
	
	.fangan-all ul {
		position: relative;
		flex: 1;
		overflow: hidden;
		height: 100%;
	}
	
	.fangan-l {
		width: 1.4rem;
		height: 1.4rem;
		float: left;
	}
	
	.fangan-l img {
		width: 1.4rem;
		height: 1.4rem;
	}
	
	.fangan-r {
		margin-left: 0.12rem;
	}
	
	.fangan-r .li1 {
		font-size: 0.2rem;
		color: #3F3F4E;
	}
	
	.fangan-r .li2 {
		font-size: 0.18rem;
		color: #898991;
		position: absolute;
		bottom: 0;
	}
	
	.keep-list {
		height: 1.7rem;
		margin: 0 0.24rem;
		margin-top: 0.14rem;
		background: #fff;
		box-shadow: 0 2px 5px #C2C2C2;
		border-radius: 0.05rem;
	}
	
	.keep-list-left {
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 0.05rem;
		overflow: hidden;
		left: 0.2rem;
		float: left;
		margin-left: 0.2rem;
		margin-top: 0.2rem;
	}
	
	.keep-list-left img {
		width: 1.3rem;
		height: 1.3rem;
	}
	
	.keep-list-right {
		float: left;
		margin-left: 0.23rem;
		margin-top: 0.17rem;
		width: calc(100% - 2rem);
		height: 1.3rem;
		position: relative;
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
		color: #f01717;
	}
	
	.keep-list-right .li3 {
		line-height: 0.38rem;
		font-size: 0.22rem;
		color: #74747d;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		position: absolute;
		bottom: 0;
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
	}
	
	.pinpailist .li3 {
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
	
	.fanganlist {
		overflow: hidden;
		display: flex;
		padding-top: 0.24rem;
	}
	
	.falist-l {
		float: left;
		width: 1.4rem;
		height: 1.4rem;
	}
	
	.falist-l img {
		width: 1.4rem;
		height: 1.4rem;
	}
	
	.falist-r {
		flex: 1;
		position: relative;
		margin-left: 0.2rem;
	}
	
	.falist-r .li1 {
		font-size: 0.22rem;
		color: #3F3F4E;
	}
	
	.falist-r .li2 {
		font-size: 0.18rem;
		color: #898991;
		position: absolute;
		bottom: 0;
	}
	
	.body-list {
		overflow: hidden;
		width: 2.58rem;
		padding: 0.53rem 0.35rem 0 0.26rem;
		background: #f4edea;
		overflow: hidden;
		float: left;
		margin-bottom: 0.04rem;
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
	
	.pic {
		width: 3.13rem;
		height: 1.76rem;
		position: relative;
		margin-bottom: 0.14rem;
		float: left;
	}
	
	.pic img {
		width: 3.13rem;
		height: 1.76rem;
	}
	
	.pic span {
		width: calc(100% - 0.48rem);
		height: 0.58rem;
		display: block;
		background: rgba(0, 0, 0, 0.5);
		position: absolute;
		bottom: 0;
		line-height: 0.3rem;
		font-size: 0.2rem;
		color: #fff;
		padding: 0.04rem 0.24rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.classdetail>>>.mint-tab-item.is-selected {
		margin: 0!important;
		border-bottom: 2px solid #ff651d!important;
		color: #ff651d!important;
	}
	
	.video>>>.vjs_video_3-dimensions {
		width: 5.92rem;
		height: 3.33rem;
		margin: 0 auto;
		position: relative
	}
	
	.video>>>.vjs_video_920-dimensions {
		width: 5.92rem;
		height: 3.33rem;
		margin: 0 auto;
	}
	
	.video>>>.vjs-tech {
		width: 100%;
		position: relative;
	}
	
	.video>>>.video-js {
		width: 100%!important;
		height: auto!important;
	}
	
	.video>>>.vjs-big-play-button {
		display: none;
	}
	
	.video>>>.vjs-progress-control {
		display: none;
	}
	
	.video>>>.vjs-live-control {
		display: none;
	}
	
	.video>>>.vjs-custom-control-spacer {
		display: none;
	}
	
	.video>>>.vjs-hidden {
		display: none;
	}
	
	.video>>>.vjs-fullscreen-control {
		display: none;
	}
	
	.video>>>.vjs-control-text {
		color: red;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.video>>>.vjs-control-bar {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: red;
		height: 3.33rem;
	}
	
	.video>>>.vjs-time-control {
		float: left;
	}
	
	.video>>>.vjs-mute-control {
		display: none;
	}
	
	.download {
		display: flex;
		padding: 0.1rem 0.24rem;
		background: #fff;
	}
	
	.download ul {
		overflow: hidden;
		margin-left: 0.24rem;
	}
	
	.download-l {
		width: 1.5rem;
		height: 1.5rem;
		float: left;
	}
	
	.download-l img {
		width: 1.5rem;
		height: 1.5rem;
	}
	
	.download-r {
		flex: 1;
	}
	
	.download-r .li1 {
		font-size: 0.22rem;
		color: #3F3F4E;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.download-r .li2 {
		font-size: 0.2rem;
		color: #74747d;
	}
	
	.download-r .li3 {
		width: 1.34rem;
		height: 0.58rem;
		line-height: 0.58rem;
		text-align: center;
		font-size: 0.22rem;
		color: #ff852c;
		border: 1px solid #46c9e9;
		float: right;
	}
	/*video*/
	
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
		border: 2px solid #fd9b3a;
	}
	
	.classdetail>>>.vux-swiper {
		height: 3.34rem!important;
	}
	
	.classdetail>>>.vux-tab {
		height: auto!important;
		background: #F4F4F4;
		margin-top: 0.12rem;
	}
	
	.classdetail>>>.vux-tab-item {
		flex: inherit;
		margin: 0 0.1rem;
		width: inherit!important;
		border: 2px solid #F4F4F4!important;
	}
	
	.classdetail>>>.vux-tab .vux-tab-item.vux-tab-selected {
		border: 2px solid #ff852c!important;
		box-sizing: border-box;
		position: relative
	}
	
	.classdetail>>>.vux-tab .vux-tab-item.vux-tab-selected:after {
		content: " ";
		position: absolute;
		top: -6px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 7;
		width: 0;
		height: 0;
		border-right: 6px solid transparent;
		border-bottom: 6px solid #ff852c;
		border-left: 6px solid transparent;
	}
	
	.classdetail>>>.vux-tab-ink-bar {
		display: none!important;
	}
	/*tab切换*/
	
	.tab-item {
		height: 0.7rem;
		color: #3F3F4E;
		line-height: 0.7rem;
		text-align: center;
		font-size: 0.22rem;
	}
	
	.tab-item-ul {
		width: 100%;
		display: flex;
	}
	
	.tab-item li {
		float: left;
		flex: 1;
	}
	
	.active {
		color: #FF852C;
	}
</style>