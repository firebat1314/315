<template>
	<div class="header">
		<!--@click="scanCode()"-->
		<!-- <div @click="saoma" class="a1"></div> -->
		<!--<a href="javascript:history.back(-1);" class="a1"></a>-->
		<div class="header-search">
			<router-link :to="{path:'/search', query:{type: type}}">
				<input type="text" placeholder="请输入关键字" />
			</router-link>
		</div>
		<a href="#/help" class="a2"></a>
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
				tips: ''
			}
		},
		name: 'iheader',
		props: {
			title: {
				type: String,
				default: "头部标题"
			},
			type: {
				type: String,
				default: ""
			}
		},
		methods: {
			saoma() {
				let self=this;
				QRScanner.prepare(onDone);
				function onDone(err, status) {
					if(err) {
						console.error(err);
					}
					if(status.authorized) {
						self.$router.push({
							path: '/saoma'
						});
					} else if(status.denied) {
						self.$toast('取消扫码', {
							duration: '1500'
						});
					} else {}
				}
			},

//			scanCode() {
//				let self = this;
//				cordova.plugins.barcodeScanner.scan(
//					function(result) {
//						var str = result.text
//						var str1 = str.split('down-')
//						var str2 = str1[1].split('-')
//						if(str2[1] == 'login') {
//							var str3 = str2[3].split('.')
//							self.$http.post(getOpenUrl() + 'scanCodeLogin', {
//								type: str2[1],
//								code: str3[0]
//							}, {
//								headers: {
//									'Authorization': 'Bearer ' + getToken()
//								}
//							}).then((res) => {
//								if(res.body.code == 0) {
//									self.tips = "扫码成功正在登陆"
//									self.popupVisible = true
//									setTimeout(() => {
//										self.popupVisible = false
//									}, 1500)
//								} else {
//									self.tips = "扫码失败请重试"
//									self.popupVisible = true
//									setTimeout(() => {
//										self.popupVisible = false
//									}, 1500)
//								}
//							}, (error) => {
//								if(error.status == 401) {
//									self.tips = "用户失效，请登录"
//									self.popupVisible = true
//									setTimeout(() => {
//										self.popupVisible = false
//										self.$router.push({
//											path: '/login'
//										});
//									}, 1500)
//								} else {
//									self.tips = "网络不稳定，页面丢失"
//									self.popupVisible = true
//									setTimeout(() => {
//										self.popupVisible = false
//									}, 1500)
//								}
//							})
//						} else if(str2[1] == 'photo') {
//							var str4 = str2[5].split('.')
//							self.tips = "扫码成功正在跳转"
//							self.popupVisible = true
//							setTimeout(() => {
//								self.popupVisible = false
//								self.$router.push({
//									path: '/photodetail',
//									query: {
//										catid: str2[3],
//										id: str4[0]
//									}
//								})
//							}, 1500)
//						} else if(str2[1] == 'product') {
//							var str4 = str2[5].split('.')
//							self.tips = "扫码成功正在跳转"
//							self.popupVisible = true
//							setTimeout(() => {
//								self.popupVisible = false
//								self.$router.push({
//									path: '/pro_details',
//									query: {
//										catid: str2[3],
//										id: str4[0]
//									}
//								})
//							}, 1500)
//						}
//					},
//					function(error) {
//						alert("Scanning failed: " + error);
//					}, {
//						//          preferFrontCamera : true, // iOS and Android
//						//          showFlipCameraButton : true, // iOS and Android
//						showTorchButton: true, // iOS and Android
//						torchOn: true, // Android, launch with the torch switched on (if available)
//						//          saveHistory: true, // Android, save scan history (default false)
//						prompt: "请将条码置于取景框内扫描", // Android
//						//          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//						//          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
//						orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
//						//          disableAnimations : true, // iOS
//						//          disableSuccessBeep: false // iOS and Android
//					});
//			}
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
		border-bottom: 1px solid #dcdcdc;
		padding: 0 0.24rem;
		padding-top: 0.4rem;
	}
	
	.header .a1 {
		width: 0.32rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/index/saoma.png) no-repeat 0 50%;
		background-size: 0.32rem 0.32rem;
		float: left;
	}
	
	.header .a2 {
		width: 0.42rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/personal/personalicon/message.png) no-repeat 0 50%;
		background-size: 0.42rem 0.36rem;
		float: right;
	}
	
	.header-search {
		height: 0.58rem;
		width: calc(100% - 0.7rem);/* 左侧有扫描时-1.2rem */
		border-radius: 0.05rem;
		background: #fff;
		float: left;
		/* margin-left: 0.3rem; */
		margin-top: 0.17rem;
	}
	
	.header-search input {
		display: block;
		font-size: 0.22rem;
		color: #7e7e7d;
		height: 0.58rem;
		line-height: 0.58rem;
		width: calc(100% - 0.47rem);
		background: url(../../../static/images/searchlogo.png) no-repeat 0.12rem 50%;
		background-size: 0.25rem;
		padding-left: 0.47rem;
	}
</style>