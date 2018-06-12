<template>
	<div style="height: 100%;">
		<div class="header">
			<div class="headerall">
				<a href="javascript:history.back(-1);" class="a1"></a>
				<span class="forget">扫描二维码</span>
			</div>
		</div>
		<div class="qsScanbox">
			<div class="imgbox">
				<img src="../../../static/images/saoma.gif" alt="" style="position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);">
				<p style="font-size:0.2rem;color:#fff;">将二维码置于取景框内系统会自动扫描</p>
			</div>
			<div style="position: absolute;
    bottom: 0;width: 100%;
    padding-left: 0.3rem;">
				<img @click="startFlash" style="width:0.8rem;" src="../../../static/images/flash.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	export default {
		data() {
			return {
				isFlash: false
			}
		},
		mounted() {
			QRScanner.scan(this.displayContents);
			QRScanner.show();
		},
		methods: {
			displayContents(err, text) {
				let self = this;
				if(err) {

				} else {
					var str = text
					var str1 = str.split('down-')
					var str2 = str1[1].split('-')
					if(str2[1] == 'login') {
						var str3 = str2[3].split('.')
						self.$http.post(getOpenUrl() + 'scanCodeLogin', {
							type: str2[1],
							code: str3[0]
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {
							if(res.body.code == 0) {
								this.$router.push({
				                  path: '/home'
				                });
								self.tips = "扫码成功正在登陆"
								self.popupVisible = true
								setTimeout(() => {
									self.popupVisible = false
								}, 1500)
							} else {
								this.$router.push({
				                  path: '/home'
				                });
								self.tips = "扫码失败请重试"
								self.popupVisible = true
								setTimeout(() => {
									self.popupVisible = false
								}, 1500)
							}
						}, (error) => {
							if(error.status == 401) {
								self.tips = "用户失效，请登录"
								self.popupVisible = true
								setTimeout(() => {
									self.popupVisible = false
									self.$router.push({
										path: '/login'
									});
								}, 1500)
							} else {
								self.tips = "网络不稳定，页面丢失"
								self.popupVisible = true
								setTimeout(() => {
									self.popupVisible = false
								}, 1500)
							}
						})
					} else if(str2[1] == 'photo') {
						var str4 = str2[5].split('.')
						self.tips = "扫码成功正在跳转"
						self.popupVisible = true
						setTimeout(() => {
							self.popupVisible = false
							self.$router.push({
								path: '/photodetail',
								query: {
									catid: str2[3],
									id: str4[0]
								}
							})
						}, 1500)
					} else if(str2[1] == 'product') {
						var str4 = str2[5].split('.')
						self.tips = "扫码成功正在跳转"
						self.popupVisible = true
						setTimeout(() => {
							self.popupVisible = false
							self.$router.push({
								path: '/pro_details',
								query: {
									catid: str2[3],
									id: str4[0]
								}
							})
						}, 1500)
					}
				}
			},
			startFlash() {
				this.isFlash = !this.isFlash;
				if(this.isFlash) {
					QRScanner.enableLight(function(err, status) {
						err && console.error(err);
						console.log(status);
					});
				} else {
					QRScanner.disableLight(function(err, status) {
						err && console.error(err);
						console.log(status);
					});
				}
			}
		},
		beforeRouteLeave(to, from, next) {
			QRScanner.destroy(function(status) {
				console.log(status);
			});
			next();
		}
	}
</script>

<style scoped>
	.qsScanbox {
		position: relative;
		/*top:1rem;*/
		height: calc(100% - 1rem);
	}
	
	.qsScanbox .imgbox {
		width: 100%;
		vertical-align: middle;
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.header {
		height: 0.7rem;
		box-shadow: 0 0 5px #000;
		width: 100%;
		z-index: 11;
		margin-bottom: 0.05rem;
		position: fixed;
		padding-top: 0.3rem;
		background: #000;
		opacity: .6;
	}
	
	.headerall {
		padding: 0 0.2rem;
		height: 100%;
	}
	
	.header a {
		padding: 0 0.2rem;
		height: 0.7rem;
		display: block;
		background: url(../../../static/images/leftback.png) no-repeat 0 50%;
		background-size: 0.18rem 0.34rem;
		float: left;
	}
	
	.forget {
		line-height: 0.7rem;
		font-size: 0.24rem;
		display: block;
		float: left;
		color: #fff;
		position: absolute;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
	}
</style>