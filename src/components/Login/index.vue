<template>
	<div class="login">
		<div class="header">
			<div class="face">
				<img src="../../../static/images/face.png"/>
			</div>
		</div>
		<div class="body">
			<p class="p1">欢迎登录</p>
			<p class="p2">鉴材315 新的窗口看世界</p>
		</div>
		<div class="bottom">
			<div class="input">
				<input type="text" placeholder="用户名/手机号" v-model="username"/>
			</div>
			<div class="input">
				<input type="password" placeholder="密码" v-model="password" ref="tab" @keyup.13="login"/>
				<input type="button" @click="tab"/>
			</div>
		</div>
		<div class="footer">
			<img src="../../../static/images/login_loading.gif" style="position: absolute;width: 0.5rem;height: 0.5rem;top: 50%;transform: translateY(-50%);left: 1.65rem;" alt="" v-show="loadinging">
			<input type="button" value="登录" style="color: #fff;" v-bind:class="{isDj:is_dianji}" @click="login()"/>
		</div>
		<div class="btn">
			<p class="btn1"><a href="#/register">注册账户</a></p>
			<p class="btn2"><a href="#/forget">忘记密码</a></p>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tip" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import {setCookie,getCookie} from '../../assets/js/cookie.js'
	import {getOpenUrl} from '../../assets/js/common.js'
	import qs from 'qs'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		name: 'login',
		data() {
			return {
				tip:'',
				popupVisible:false,
				loadinging: false,
				is_dianji: false,
				username: '',
				password: ''
			}
		},
		mounted() {
			
		},
		methods: {
			tab(){
		        if(this.$refs.tab.type=="password"){
		            this.$refs.tab.type="text"
		        }else{
		            this.$refs.tab.type="password"
        			}
			},
			login() {
				this.is_dianji = true;
				this.loadinging = true;
				if (this.username == "") {
					this.tip = '请输入用户名';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}if(this.password == ""){
					this.tip = '请输入密码';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				} else {
					var data = qs.stringify({
						client_id:"JCAPP",
						client_secret:"4d996cfcd7040021f797ccacfbff869c",
						username:this.username,
						password:this.password,
						grant_type:"password"
					})
					/*接口请求*/
					this.$http.post(getOpenUrl() + 'login',data,{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						}
					})
					.then((res) => {
						/*接口的传值是(0000,用户存在),(其他账号或密码输入错误)，同时还会检测管理员账号的值*/
						if (res.body.code == 0) {
							this.tip = '登陆成功';
							this.popupVisible=true
							setTimeout(()=> {
								this.popupVisible=false
//								window.location.reload();
								this.$router.push('/home')
							}, 1500)
							this.is_dianji = false;
							this.loadinging = false;
							localStorage.setItem("token", res.body.data.access_token);
							let expireDays = 1000 * 60 * 60;
							setCookie("token", res.body.data.access_token, expireDays);
						} else {
							this.tip = res.body.error_description;
							this.popupVisible=true
							setTimeout(()=> {
								this.popupVisible=false
							}, 1500)
							this.is_dianji = false;
							this.loadinging = false;
						}
					})
				}
			}
		},
//		beforeRouteLeave(to, from, next) {
//			console.log(to,from)
//			if(to.path == '/home') {
//				next();
//				window.location.reload()
//			}
//		}
	}
</script>

<style scoped>
	.login{height: 100%;overflow-y: scroll;}
	.header{height: 3.13rem;background: url(../../../static/images/loginbanner.png) no-repeat;background-size: cover;position: relative;}
	.face{width: 1.7rem;height: 1.7rem;border-radius: 50%;position: absolute;left: 50%;top:2.08rem;transform: translateX(-50%);overflow: hidden;}
	.face img{width: 1.7rem;height: 1.7rem;}
	.body{margin-top: 0.6rem;text-align: center;}
	.body .p1{font-size: 0.29rem;line-height: 0.53rem;color: #3f3f4e;}
	.body .p2{font-size: 0.2rem;line-height: 0.44rem;color: #656571;}
	.bottom{width: 5.62rem;margin: 0 auto;}
	.bottom .input{display: flex;color: #8c8c95;font-size: 0.2rem;line-height: 0.66rem;height:0.66rem;margin-top: 0.15rem;border-bottom: 1px solid #cfcfcf;}
	.input input{height: 100%;}
	.input input[type="text"]{flex: 1;}
	.input input[type="password"]{flex: 1;}
	.bottom input[type="button"]{width:0.33rem;height:0.66rem;background: url(../../../static/images/yanjing.png) no-repeat 0 50%;background-size:0.33rem 0.22rem;margin-right:0.24rem;float: right;}
	.footer{width: 5.57rem;height: 0.73rem;border-radius: 0.05rem;text-align: center;font-size: 0.22rem;line-height: 0.73rem;margin: 0 auto;background: #ff7d1d;margin-top: 0.6rem;position: relative;}
	.footer input[type="button"]{width:100%;height:100%;}
	.btn{font-size: 0.2rem;height: 0.83rem;line-height: 0.83rem;width: 5.4rem;margin: 0 auto;color: #3f3f4e;}
	.btn a{color: #3f3f4e;}
	.btn1{float: left;}
	.btn2{float: right;}
	.isDj {pointer-events: none;background: rgba(172, 207, 224, 0.8);}
</style>