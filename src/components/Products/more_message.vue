<template>
	<div class="pro-message">
		<my-header title="更多评论" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>

		<div class="bili-box">
			<div class="all-zhichi" style="top:0.12rem;">
				<div class="zhichi-bili" style="height:100%;background:#ffc002;" ref="zhichi"></div>
			</div>
			<div style="font-size:0.2rem;position: absolute;top:0.12rem;left:2.2rem;">{{commentData.support}}%支持</div>
			<div class="all-zhichi" style="top:0.6rem;">
				<div class="zhichi-bili" style="height:100%;background:#06a3f6;" ref="buhaoshuo"></div>
			</div>
			<div style="font-size:0.2rem;position: absolute;top:0.6rem;left:2.2rem;">{{commentData.neutral}}%不好说</div>
			<div class="all-zhichi" style="top:1.05rem;">
				<div class="zhichi-bili" style="height:100%;background:#abed0a;" ref="fandui"></div>
			</div>
			<div style="font-size:0.2rem;position: absolute;top:1.05rem;left:2.2rem;">{{commentData.opposition}}%反对</div>
		</div>
		<div class="pinglun-button" @click="goPinglun" style="color:#000;">
			我也评论
		</div>
		<div class="page-loadmore" style="font-size: 0.2rem;height: calc(100% - 4.08rem);">
			<scroller lock-x scrollbar-y use-pullup height="100%" @on-pullup-loading="loadMore" v-model="status" ref="scroller">
				<div class="pingjia">
					<div class="pingjia-box" v-for="(pl,index) in commentsData" :key="index">
						<div class="pingjia-item">
							<div class="logoItem">
								<img class="item-logo" v-lazy="pl.avatar">
								<span>{{pl.name}}</span>
								<div class="pingjia-icon" v-if="pl.direction==3">
									<img class="pj-icon" src="../../../static/images/chanpin/gantan.png">
									<i>不好说</i>
								</div>
								<div class="pingjia-icon" v-if="pl.direction==1">
									<img class="pj-icon" src="../../../static/images/chanpin/zan.png">
									<i>支持</i>
								</div>
								<div class="pingjia-icon" v-if="pl.direction==2">
									<img class="pj-icon" src="../../../static/images/chanpin/noZan.png">
									<i>不支持</i>
								</div>
								<div style="clear:both"></div>
							</div>
							<div class="pingjia-content" v-html="pl.content"></div>
							<div class="pingjia-time">{{pl.dateline}}</div>
						</div>
					</div>
					<nomore></nomore>
				</div>
				<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
					<span v-show="status.pullupStatus === 'default'"></span>
					<!--<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>-->
					<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
				</div>
			</scroller>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl, getToken } from '../../assets/js/common.js';
	import { Scroller, Spinner } from 'vux';
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		components: {
			Scroller,
			Spinner
		},
		data() {
			return {
				popupVisible: false,
				loading: false,
				tips: '',
				commentData: [],
				commentsData: [],
				companyData: [],
				data: [],
				page: 1,
				status: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
//				upobj: {
//					content: '请下拉刷新数据',
//					pullUpHeight: 60,
//					height: 40,
//					autoRefresh: false,
//					downContent: '请下拉刷新数据',
//					upContent: '松手即刷新',
//					loadingContent: '加载中...',
//					clsPrefix: 'xs-plugin-pullup-'
//				}
			}
		},
		mounted() {
			this.getData()
			this.getcomment()
		},
		methods: {
			loadMore() {
				this.page += 1;
				this.getcomment();
				this.loading = false
			},
			refresh() {
				this.page = 1
				$('.nomore').hide()
				this.$nextTick(() => {
					this.loading = true
					this.$http.post(getOpenUrl() + "/product_comment", {
						id: this.$route.query.id,
					}, {
						headers: {
							"Authorization": "Bearer " + getToken()
						},
					}).then((res) => {
						this.commentsData.splice(0, this.commentsData.length);
						if(res.body.code == '0000') {
							this.commentData = res.body;
							var data = this.commentData.data
							$.each(data, (key, val) => {
								this.commentsData.push(val);
							})
							if(this.commentData.data.length == 0) {
								$('.nomore').show()
							}
							this.$mount(this.$refs);
							this.$refs.zhichi.style.width = this.commentData.support + '%';
							this.$refs.buhaoshuo.style.width = this.commentData.neutral + '%';
							this.$refs.fandui.style.width = this.commentData.opposition + '%';
						}
						this.$refs.scroller.donePulldown()
						this.loading = false
					}, (error) => {
						if(error.status == 401) {
							this.tip = "用户失效，请登录"
							this.popupVisible = true
							setTimeout(() => {
								this.loading = false
								this.popupVisible = false
								this.$router.push({
									path: '/login'
								});
							}, 1500)
						} else {
							this.tip = "网络不稳定，页面丢失"
							this.popupVisible = true
							setTimeout(() => {
								this.loading = false
								this.popupVisible = false
							}, 1500)
						}
					})
				})
			},
			goPinglun() {
				this.$router.push({
					path: '/pro_message',
					query: {
						id: this.data.id,
						uid: this.data.uid,
						catid: this.data.catid
					}
				});
			},
			direction(dir) {
				$('.miaoshu-button').each(function() {
					$(this).removeClass('active');
					if($(this).attr('id') == dir) {
						$(this).addClass('active');
					}
				});
				this.dir = dir
			},
			getData() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/product_info", {
					id: this.$route.query.id,
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.data = res.body.data
						this.companyData = res.body.conpany_info;
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},

			getcomment() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/product_comment", {
					page: this.page,
					id: this.$route.query.id
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.commentData = res.body;
						var data = this.commentData.data
						$.each(data, (key, val) => {
							this.commentsData.push(val);
						})
						if(this.commentData.data.length == 0) {
							$('.nomore').show()
						}
						this.$mount(this.$refs);
						this.$refs.zhichi.style.width = this.commentData.support + '%';
						this.$refs.buhaoshuo.style.width = this.commentData.neutral + '%';
						this.$refs.fandui.style.width = this.commentData.opposition + '%';
					}
					this.$refs.scroller.donePullup()
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
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
	.pro-message>>>.header {
		position: fixed;
		top: 0;
		width: 100%;
	}
	
	.all-zhichi {
		width: 2.2rem;
		height: 0.25rem;
		position: absolute;
	}
	
	.bili-box {
		position: relative;
		height: 1.4rem;
		margin: 0.3rem 0.24rem;
		border-left: 1px solid #ccc;
		margin-top: 1.58rem;
	}
	
	.pro-editor textarea {
		width: 100%;
		height: 2.5rem;
		border-bottom: 1px solid #eee;
	}
	
	.pro-editor {
		padding-top: 0.2rem;
		margin: 0 0.24rem;
	}
	
	.pro-header .pro-header-miaoshu .miaoshu-button {
		width: 1.1rem;
		height: 0.5rem;
		border: 1px solid #ccc;
		float: left;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 0.55rem;
		margin-top: 0.1rem;
		margin-left: 0.2rem;
	}
	
	.pro-header .pro-header-miaoshu .miaoshu-button.active {
		border: 1px solid #ff651d;
		color: #ff651d;
	}
	
	.pro-header .pro-header-miaoshu p {
		float: left;
		margin-top: 0.25rem;
		margin-left: 0.2rem;
	}
	
	.pro-header .pro-header-miaoshu img {
		width: 0.8rem;
		height: 0.8rem;
		background: #d3ddef;
		float: left;
	}
	
	.pro-header .pro-header-miaoshu {
		margin-top: 0.2rem;
		margin-left: 0.24rem;
		height: 100%;
		font-size: 0.2rem;
	}
	
	.pro-header {
		height: 1rem;
		border-bottom: 1px solid #eee;
	}
	
	.pingjia-time {
		height: 0.6rem;
		line-height: 0.6rem;
		color: #9f9fa6;
		font-size: 0.2rem;
		text-align: left;
	}
	
	.pingjia-icon {
		float: right;
	}
	
	.pingjia-icon i {
		font-size: 0.16rem;
		color: #ff651d;
		float: left;
		font-style: normal;
	}
	
	.pingjia-icon .pj-icon {
		width: 0.26rem;
		height: 0.24rem;
		display: block;
		float: left;
		margin-top: 0.17rem;
		margin-right: 0.1rem;
		object-fit: cover;
	}
	
	.pinglun-button {
		width: 2.1rem;
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
		border-radius: 0.15rem;
		border: 1px solid #ccc;
		margin: 0 auto;
		font-size: 0.2rem;
		margin-bottom: 0.1rem;
	}
	
	.pingjia-button {
		height: 0.9rem;
		padding-left: 0.2rem;
	}
	
	.pingjia-button-left {
		width: 2.8rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border: 1px solid #ccc;
		text-align: center;
		font-size: 0.22rem;
		border-radius: 0.05rem;
		float: left;
		margin-right: 0.15rem;
	}
	
	.pingjia .pingjia-box {
		border-bottom: 1px solid #eee;
	}
	
	.pingjia .pingjia-box:last-child {
		border-bottom: none;
	}
	
	.pingjia-content {
		color: #656571;
		font-size: 0.2rem;
		line-height: 0.32rem;
	}
	
	.pingjia-item {
		margin: 0.26rem 0.3rem 0.3rem;
	}
	
	.logoItem span {
		font-size: 0.24rem;
		display: block;
		float: left;
		margin-left: 0.2rem;
	}
	
	.logoItem .item-logo {
		width: 0.57rem;
		height: 0.57rem;
		border-radius: 50%;
		background: #ee8a46;
		float: left;
	}
	
	.logoItem {
		height: 0.6rem;
		line-height: 0.6rem;
	}
	
	.pingjia-header-right {
		float: right;
	}
	
	.pingjia-header-left {
		float: left;
	}
	
	.pingjia-header {
		height: 0.7rem;
		line-height: 0.7rem;
		border-bottom: 1px solid #eee;
		padding-left: 0.3rem;
		padding-right: 0.6rem;
		font-size: 0.2rem;
	}
</style>