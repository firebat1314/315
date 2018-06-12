<template>
	<div class="register">
		<my-header title="修改手机号" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="bottom">
			<div class="input">
				<input type="text" placeholder="新手机号" v-model="mail" ref="mail" />
			</div>
			<div class="input bd" style="position: relative;">
				<input type="text" placeholder="请输入验证码" v-model="yzm" ref="yzm" />
				<div style="position: relative;">
					<img src="../../../../static/images/login_loading.gif" style="position: absolute;width: 0.5rem;height: 0.5rem;top: 50%;left:50%;transform: translate(-50%,-50%);" v-show="loadyz">
					<input type="button" class="btnyzm" id="btnyzm" value="获取短信验证码" style="color: #fff;font-size: 0.2rem;" v-bind:class="{isDj:is_yz}" @click="yzmmail()" />
				</div>
			</div>
		</div>
		<div class="footer">
			<img src="../../../../static/images/login_loading.gif" style="position: absolute;width: 0.5rem;height: 0.5rem;top: 50%;transform: translateY(-50%);left: 1.65rem;" v-show="loadinging">
			<input type="button" value="确定" style="color: #fff;" v-bind:class="{isDj:is_dianji}" @click="register()" />
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tip" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import qs from 'qs'
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		name: 'register',
		data() {
			return {
				tip: '',
				popupVisible: false,
				loadinging: false,
				is_dianji: false,
				is_yz: false,
				loadyz: false,
				username: '',
				//				mail1: '',
				mail: '',
				yzm: ''
			}
		},
		mounted() {
			this.$http.post(getOpenUrl() + 'token', {

					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				})
				.then((res) => {
					this.token = res.body.data.token,
						this.token_key = res.body.data.token_key
				})
		},
		methods: {

			yzmmail() {
				this.is_yz = true
				this.loadyz = true
				var data = qs.stringify({
					mobile: this.mail,
					sms_token: this.token,
					skey: this.token_key,
					type: "bindmobile"
				})
				/*接口请求*/
				this.$http.post(getOpenUrl() + 'sms', data, {

						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						}
					})
					.then((res) => {
						/*接口的传值是(0000,用户存在),(其他账号或密码输入错误)，同时还会检测管理员账号的值*/
						if(res.body.code == 0) {
							this.skey = res.body.data.key
							this.tip = "获取短信验证码成功"
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false
							}, 1500)
							this.is_yz = false
							this.loadyz = false
							this.token = res.body.data.token
						} else {
							this.tip = res.body.error_description;
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false
							}, 1500)
							this.is_yz = false
							this.loadyz = false
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
								this.is_dianji = true;
							}, 1500)
						}
					})
			},
			register() {
				this.is_dianji = true;
				this.loadinging = true;
				//邮箱号
				var mail = /^1[34578]\d{9}$/;
				var umail = this.$refs.mail
				//				var umail1 = this.$refs.mail1
				if(this.mail == "") {
					this.tip = '请输入手机号';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				if(!mail.test(umail.value)) {
					this.tip = '手机号格式不正确';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				//验证码
				if(this.yzm == "") {
					this.tip = '请输入验证码';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				/*接口请求*/
				this.$http.post(getOpenUrl() + 'bindmobile', {
						mobile: this.mail,
						mobilesms: this.yzm,
						skey: this.skey
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.tip = '修改成功';
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false
								this.$router.back(-1)
							}, 1500)
							this.is_dianji = false;
							this.loadinging = false;
						} else {
							this.tip = res.body.error_description;
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false
							}, 1500)
							this.is_dianji = false;
							this.loadinging = false;
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
			time() {
				var wait = 60; //时间 
				var self = this;
				this.timer = setInterval(function() {
					if(wait > 0) {
						wait--;
						$(".btnyzm").attr("disabled", true).val(wait + "秒后重新获取");
					} else {
						clearInterval(self.timer);
						self.is_yz = false;
						$(".btnyzm").attr("disabled", false).val("重新获取");

					}
				}, 1000);
			}
		}
	}
</script>

<style scoped>
	.bottom {
		width: 5.62rem;
		margin: 0 auto;
		margin-top: 0.98rem;
	}
	
	.bottom .input {
		display: flex;
		color: #8c8c95;
		font-size: 0.2rem;
		line-height: 0.6rem;
		height: 0.6rem;
		margin-top: 0.1rem;
		border-bottom: 1px solid #cfcfcf;
	}
	
	.input input {
		height: 100%;
	}
	
	.input input[type="text"] {
		flex: 1;
		border-bottom: 1px solid #cfcfcf;
	}
	
	.bd {
		border-bottom: 0!important;
	}
	
	.input input[type="password"] {
		flex: 1;
	}
	
	#passbtn {
		width: 0.33rem;
		height: 0.6rem;
		background: url(../../../../static/images/yanjing.png) no-repeat 0 50%;
		background-size: 0.33rem 0.22rem;
		margin-right: 0.24rem;
		float: right;
	}
	
	.footer {
		width: 5.57rem;
		height: 0.73rem;
		border-radius: 0.05rem;
		text-align: center;
		font-size: 0.22rem;
		line-height: 0.73rem;
		margin: 0 auto;
		background: #ff7d1d;
		margin-top: 0.45rem;
		position: relative;
	}
	
	.footer input[type="button"] {
		width: 100%;
		height: 100%;
	}
	
	.btn {
		font-size: 0.2rem;
		height: 0.9rem;
		line-height: 0.9rem;
		width: 5.4rem;
		margin: 0 auto;
		color: #3f3f4e;
		text-align: center;
	}
	
	.btnyzm {
		height: 0.63rem;
		width: 1.91rem;
		border: 1px solid #e5e5e5;
		background: #ff7d1d;
		margin-left: 0.15rem;
	}
	
	.isDj {
		pointer-events: none;
		background: rgba(172, 207, 224, 0.8);
	}
</style>