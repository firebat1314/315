<template>
	<div class="setting">

		<my-header title="设置" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="nav">

			<div class="guanli">
				<p>账号管理</p>
				<ul>

					<li style="border-bottom: 1px solid #f4f4f4;">
						<a href="#/myzl">个人资料</a>
					</li>
					<li style="border-bottom: 1px solid #f4f4f4;">
						<a href="#/xgmm">修改密码</a>
					</li>
					<li style="border-bottom: 1px solid #f4f4f4;">
						<a href="#/xgyx">修改邮箱</a>
					</li>
					<li>
						<a href="#/xgphone">修改手机号</a>
					</li>
				</ul>
			</div>
			<!--<div class="guanyu">
				<p>关于</p>
				<ul>
					<li>
						<a href="#/guanyu">关于鉴材315</a>
					</li>
				</ul>
			</div>-->
			<!-- <div class="sheding">
				<p>设定</p>
				<ul>
					<li style="border-bottom: 1px solid #f4f4f4;">清除缓存</li>
					<li>退出应用</li>
				</ul>
			</div> -->
		</div>
		<div class="bottom">
			<input type="button" name="" id="" value="退出账号" @click="loginOut" />
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>

	</div>
</template>
<script>
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				tips: ""
			};
		},
		mounted() {

		},
		methods: {
			clearCookie() {
				var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if(keys) {
					for(var i = keys.length; i--;) {
						document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
					}
				}
			},
			loginOut() {
				MessageBox.confirm('', {
					message: "确定退出吗？",
					title: "提示",
					showConfirmButton: true,
					showCancelButton: true
				}).then(action => {
					this.$http.get(getOpenUrl() + "goOut", {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					}).then((res) => {
						if(res.body.code == '0000') {
							localStorage.removeItem('token');
							setCookie('token', "", -1);
							this.clearCookie();
							this.tips = "退出成功"
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false;
//								window.location.reload()
								this.$router.push('/login')
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
				}).catch(err => {

				});

			}
		}
	}
</script>

<style scoped>
	.setting {
		background: #f4f4f4;
	}
	
	.guanli p {
		color: #3F3F4E;
		font-size: 0.22rem;
		line-height: 0.66rem;
		padding-top: 0.32rem;
		padding-left: 0.24rem;
	}
	
	.guanyu p {
		color: #3F3F4E;
		font-size: 0.22rem;
		line-height: 0.66rem;
		padding-top: 0.32rem;
		padding-left: 0.24rem;
	}
	
	.sheding p {
		color: #3F3F4E;
		font-size: 0.22rem;
		line-height: 0.66rem;
		padding-top: 0.32rem;
		padding-left: 0.24rem;
	}
	
	.nav ul li a {
		color: #3f3f4e;
		display: block;
	}
	
	.nav ul li {
		font-size: 0.2rem;
		color: #3f3f4e;
		line-height: 0.78rem;
		background: #fff;
		padding-left: 0.24rem;
	}
	
	.bottom {
		width: 5.74rem;
		height: 0.68rem;
		border: 1px solid #dcdcdc;
		border-radius: 0.34rem;
		color: #3F3F4E;
		font-size: 0.2rem;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 0.56rem;
		background: #fff;
	}
	
	.bottom input {
		display: block;
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 0.68rem;
	}
</style>