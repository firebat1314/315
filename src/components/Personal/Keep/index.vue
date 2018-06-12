<template>
	<div class="keep">

		<my-header1 title="我的收藏"></my-header1>
		<div class="body-top">
			<div class="body-top-left" style="float: left;">
				<ul class="ul1" style="overflow: hidden;" @click="select">
					<li ref="all">全部产品</li>
				</ul>
				<mt-popup v-model="popupVisible" position="top" :modal=true class="pop">
					<swiper :options="swiperOptionImg" id="swiper-container2" ref="mySwiperImg">
						<swiper-slide style="width: 1.2rem;" v-for="fenlei in fenleiData">
							<ul class="ul2">
								<li ref="a1" @click="opbtn(fenlei.catname,fenlei.catid)">{{fenlei.catname}}</li>
							</ul>
						</swiper-slide>
					</swiper>
				</mt-popup>
			</div>
			<div class="body-top-right" style="float: right;" @click="check">编辑</div>
		</div>
		<div style="position:relative;top: 2.1rem;font-size: 0.2rem;height: calc(100% - 2.1rem);">
			<scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" :pulldown-config="upobj" v-model="status" ref="scroller">
				<div class="page-loadmore">

					<div class="keep-list" v-for="(list,index) in listData" :key="index">
						
							<p class="li4" v-show="checkshow">
								<label>
									<input type="checkbox" ref="check" @click="che(index,list.collect_id)"><b></b>
								</label>
							</p>
							<router-link :to="{path:'/pro_details',query:{id:list.target_id}}">
								<div class="keep-list-left">
									<img v-lazy="list.thumb" />
								</div>
								<div class="keep-list-right">
									<ul>
										<li class="li1">{{list.title}}</li>
										<li class="li2">¥{{list.price}}</li>
										<li class="li3">品牌：{{list.brand}} 产地：{{list.province}}</li>
									</ul>
								</div>
							</router-link>
					</div>
					<!--<div v-show="down" style="text-align: center;font-size: 0.24rem;line-height: 0.8rem;color: #3F3F4E;">没有更多数据</div>-->
				</div>
				<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
					<span v-show="status.pullupStatus === 'default'"></span>
					<!--<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>-->
					<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
				</div>
				<nomore></nomore>
			</scroller>
		</div>
		<div class="footer" v-show="checkshow">
			<ul>
				<li class="footer-li1" @click="checkall">全选</li>
				<li class="footer-li2" v-if="ch" @click="del()">删除</li>
				<li class="footer-li2" v-else @click="check">取消</li>
			</ul>
		</div>
		<mt-popup v-model="popupVisible1" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	var page = 1;
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Scroller, Spinner } from 'vux'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				checkshow: false,
				ch: false,
				tips: '',
				down: false,
				listData: [],
				fenleiData: [],
				data: [],
				popupVisible: false,
				popupVisible1: false,
				swiperOptionImg: {
					slidesPerView: "auto",
					spaceBetween: 5
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
			Scroller,
			Spinner,
			swiper,
			swiperSlide,
			Popup
		},
		mounted() {
			this.getData(1);
			this.fenlei()
		},
		methods: {
			refresh() { // 刷新数据的操作
				$('.nomore').hide()
				this.allLoaded = false;
				page = 1
				this.$nextTick(() => {
					this.$http.get(getOpenUrl() + 'collect', {
							params: {
								catid: this.catid,
								page: page,
								limit: 10
							},
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						})
						.then((res) => {
							this.listData.splice(0, this.listData.length);
							var data = res.body.data
							$.each(data, (key, val) => {
								this.listData.push(val);
							})
							this.$refs.scroller.donePulldown()
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
			loadMore() {
				page += 1;
				this.getData(page)
				this.loading = false
			},
			select() {
				this.popupVisible = !this.popupVisible
			},
			check() {
				this.checkshow = !this.checkshow
				for(var i = 0; i < this.$refs.check.length; i++) {
					this.$refs.check[i].checked = false
				}
			},
			//变换取消删除
			che(k, id) {
				if(this.$refs.check[k].checked) {
					this.data.push(id)
				} else {
					for(var i = 0; i < this.data.length; i++) {
						if(id == this.data[i]) {
							this.data.splice(i, 1)
						}
					}
				}
				this.id = this.data.toString()
				var arr = [];
				for(var i = 0; i < this.$refs.check.length; i++) {
					if(this.$refs.check[i].checked == true) {
						arr.push(this.$refs.check[i].checked)
					}
				}
				for(var j = 0; j < this.$refs.check.length; j++) {
					if(arr.length > 0) {
						this.ch = true
					} else {
						this.ch = false
					}
				}
			},
			//全选
			checkall() {
				var arr = []
				for(var i = 0; i < this.$refs.check.length; i++) {
					if(this.$refs.check[i].checked == true) {
						arr.push(this.$refs.check[i].checked)
					}
				}
				for(var j = 0; j < this.$refs.check.length; j++) {
					if(arr.length == this.$refs.check.length) {
						this.$refs.check[j].checked = false
					} else {
						this.$refs.check[j].checked = true
					}
					if(arr.length > 0) {
						this.ch = false
					} else {
						this.ch = true
					}
				}
			},
			//删除收藏
			del() {
				console.log(this.data)
				this.$http.get(getOpenUrl() + 'delCollect', {
						params: {
							id: this.id
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.getData()
						if(res.body.code == 0) {
							this.tips = "删除成功";
							this.popupVisible1 = true
							setTimeout(() => {
								this.popupVisible1 = false
							}, 1500)
						} else {
							this.tips = res.body.error_description;
							this.popupVisible1 = true
							setTimeout(() => {
								this.popupVisible1 = false
							}, 1500)
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
			opbtn(type, catid) {
				this.listData.splice(0, this.listData.length);
				this.catid = catid
				this.$refs.all.innerText = type
				this.popupVisible = false
				this.getData(1)
			},
			getData(page) {
				this.$http.get(getOpenUrl() + 'collect', {
						params: {
							catid: this.catid,
							page: page,
							limit: 10
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						var data = res.body.data
						$.each(data, (key, val) => {
							this.listData.push(val);
						})
						this.$refs.scroller.donePullup()
						if(data == '') {
							$('.nomore').show()
							this.allLoaded = true;
						} else {
							$('.nomore').hide()
							this.allLoaded = false;
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
			fenlei() {
				this.$http.get(getOpenUrl() + 'homepage', {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.fenleiData = res.body.category
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
	.keep {
		background: #f4f4f4;
	}
	
	.keep>>>.header {
		position: fixed;
		top: 0;
		width: calc(100% - 0.48rem);
	}
	
	.body-top {
		height: 0.66rem;
		line-height: 0.66rem;
		background: #fff;
		color: #3F3F4E;
		font-size: 0.24rem;
		padding: 0 0.24rem;
		position: fixed;
		top: 1.28rem;
		width: calc(100% - 0.48rem);
		z-index: 99;
	}
	
	.body-top-left .ul1 li {
		float: left;
		background: url(../../../../static/images/personal/personalicon/down.png) no-repeat right 50%;
		background-size: 0.16rem 0.08rem;
		padding-right: 0.3rem;
	}
	
	.mark {
		width: 100%;
		height: auto;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}
	
	.body-top-left .ul2 {
		width: calc(100% - 0.2rem);
		height: 100%;
		color: #3f3f4e;
		background: #fff;
		position: absolute;
		left: 0;
		padding: 0 0.1rem;
		z-index: 19;
		overflow-x: auto;
	}
	
	.body-top-left .ul2 li {
		padding: 0 0.1rem;
		float: left;
		width: 100%;
	}
	
	.keep-list {
		height: 1.7rem;
		margin: 0 0.24rem;
		margin-bottom: 0.14rem;
		background: #fff;
		box-shadow: 0 2px 5px #C2C2C2;
		border-radius: 0.05rem;
		display: flex;
		position: relative;
		overflow: hidden;
	}
	
	.keep-list-left {
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 0.05rem;
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
		margin: 0 0.23rem;
		margin-top: 0.17rem;
		flex: 1;
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
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.keep>>>.v-modal {
		top: inherit;
	}
	
	.pop {
		width: 100%;
		background: #fff;
		font-size: 0.26rem;
		text-align: center;
		height: 0.8rem;
		color: #fff;
		line-height: 0.8rem;
		position: absolute;
		top: 0.66rem;
	}
	
	#swiper-container2 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
		height: 100%;
	}
	/*按钮样式*/
	
	.li4 {
		width: 0.26rem;
		height: 0.26rem;
		float: left;
		position: absolute;
		top: 0.1rem;
		left: 0.1rem;
	}
	
	label {
		border: 1px solid #c2c2c2;
		width: 0.24rem;
		height: 0.24rem;
		border-radius: 50%;
		display: block;
		position: relative;
		z-index: 10;
		top: 50%;
		transform: translateY(-50%);
	}
	
	input[type="checkbox"] {
		display: none;
		position: absolute;
	}
	
	input[type="checkbox"]+b {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		width: 0.26rem;
		height: 0.26rem;
		border-radius: 50%;
		background: #e5e5e5;
		vertical-align: middle;
	}
	
	input[type="checkbox"]:checked+b {
		background: url(../../../../static/images/personal/personalicon/checkbox.png)no-repeat;
		background-size: 0.26rem 0.26rem;
		border: none;
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