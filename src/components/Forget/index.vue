<template>
	<div class="forget">
		<my-header title="忘记密码"></my-header>
		<div class="bottom">
			<div class="input">
				<input type="text" placeholder="手机号" v-model="mail" ref="mail"/>
			</div>
			<div class="input bd" style="position: relative;">
				<input type="text" placeholder="请输入验证码" v-model="yzm" ref="yzm"/>
				<div style="position: relative;">
					<img src="../../../static/images/login_loading.gif" style="position: absolute;width: 0.5rem;height: 0.5rem;top: 50%;left:50%;transform: translate(-50%,-50%);" alt="" v-show="loadyz">
					<input type="button" class="btnyzm" value="获取短信验证码" style="color: #fff;font-size: 0.2rem;" v-bind:class="{isDj:is_yz}" @click="yzmmail()"/>
				</div>
			</div>
			<div class="input">
				<input type="password" placeholder="新密码" v-model="password" ref="tab"/>
				<input type="button" id="passbtn" @click="tab"/>
			</div>
			<div class="input">
				<input type="password" placeholder="确认密码" v-model="password1" ref="tab1" @keyup.13="forget"/>
				<input type="button" id="passbtn" @click="tab1"/>
			</div>
		</div>
		<div class="footer">
			<img src="../../../static/images/login_loading.gif" style="position: absolute;width: 0.5rem;height: 0.5rem;top: 50%;transform: translateY(-50%);left: 1.65rem;" alt="" v-show="loadinging">
			<input type="button" value="完成" style="color: #fff;" v-bind:class="{isDj:is_dianji}" @click="forget()"/>
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
		name: 'register',
		data() {
			return {
				tip: '',
				popupVisible:false,
				loadinging: false,
				is_dianji: false,
				is_yz:false,
				loadyz:false,
				password: '',
				password1:'',
				mail:'',
				yzm:''
			}
		},
		mounted(){
			this.$http.post(getOpenUrl() + 'token',{
					
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				})
				.then((res) => {
					this.token=res.body.data.token,
					this.token_key=res.body.data.token_key
				})	
		},
		methods: {
			tab(){
		        if(this.$refs.tab.type=="password"){
		            this.$refs.tab.type="text"
		        }else{
		            this.$refs.tab.type="password"
        			}
			},
			tab1(){
		        if(this.$refs.tab1.type=="password"){
		            this.$refs.tab1.type="text"
		        }else{
		            this.$refs.tab1.type="password"
        			}
			},
			yzmmail(){
				this.is_yz=true
				this.loadyz=true
				var data = qs.stringify({
					username:this.username,
					mobile:this.mail,
					sms_token:this.token,
					skey:this.token_key,
					type:"findpwd"
				})
				/*接口请求*/
				this.$http.post(getOpenUrl() + 'sms',data,{
					
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				})
				.then((res) => {
					/*接口的传值是(0000,用户存在),(其他账号或密码输入错误)，同时还会检测管理员账号的值*/
					if (res.body.code == 0) {
						this.skey=res.body.data.key
						this.tip = "获取短信验证码成功"
						this.popupVisible=true
						setTimeout(()=> {
							this.popupVisible=false
						}, 1500)
						this.is_yz=false
						this.loadyz=false
						this.token=res.body.data.token
					} else {
						this.tip = res.body.error_description;
						this.popupVisible=true
						setTimeout(()=> {
							this.popupVisible=false
						}, 1500)
						this.is_yz=false
						this.loadyz=false
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
			forget() {
				this.is_dianji = true;
				this.loadinging = true;
				//邮箱号
				var mail = /^1[34578]\d{9}$/;
				var umail = this.$refs.mail
				if(this.mail == ""){
					this.tip = '请输入手机号';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				if(!mail.test(umail.value)) {
					this.tip = '手机号格式不正确';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				//验证码
				if(this.yzm == ""){
					this.tip = '请输入验证码';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				//密码
				var password = /(?!^[0-9]+$)(?!^[^A-z0-9]+$)^.{6,}$/;
				var upassword = this.$refs.tab
				if(this.password == ""){
					this.tip = '请输入密码';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				if(!password.test(upassword.value)) {
					this.tip = '密码不能是纯数字并且至少六位';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				if(this.password1 == ""){
					this.tip = '请再次输入密码';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				if(this.password1 != this.password){
					this.tip = '两次输入的密码不同';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500)
					this.is_dianji = false;
					this.loadinging = false;
					return;
				}
				var data = qs.stringify({
					email:this.mail,
					password:this.password,
					cpassword:this.password1,
					emailsms:this.yzm,
					skey:this.skey
				})
				/*接口请求*/
				this.$http.post(getOpenUrl() + 'Findpwd',data,{
					
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				})
				.then((res) => {
					/*接口的传值是(0000,用户存在),(其他账号或密码输入错误)，同时还会检测管理员账号的值*/
					if (res.body.code == 0) {
						this.tip = "重置密码成功"
						this.popupVisible=true
						setTimeout(()=> {
							this.popupVisible=false
							this.$router.push('/login')
						}, 1500)
						this.is_dianji = false;
						this.loadinging = false;
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
	}
</script>

<style scoped>
.login{height: 100%;overflow-y: auto;}
	.header{height: 0.88rem;}
	.header a{width: 0.13rem;height: 0.88rem;display: block;background: url(../../../static/images/leftback.png) no-repeat 0 50%;background-size: 0.13rem 0.23rem;float:left;margin-left: 0.24rem;}
	.forget{height: 100%;overflow-y: auto;}
	.bottom{width: 5.62rem;margin: 0 auto;margin-top: 0.98rem;}
	.bottom .input{display: flex;color: #8c8c95;font-size: 0.2rem;line-height: 0.6rem;height:0.6rem;margin-top: 0.1rem;border-bottom: 1px solid #cfcfcf;}
	.input input{height: 100%;}
	.input input[type="text"]{flex: 1;border-bottom: 1px solid #cfcfcf;}
	.bd{border-bottom: 0!important;}
	.input input[type="password"]{flex: 1;}
	#passbtn{width:0.33rem;height:0.6rem;background: url(../../../static/images/yanjing.png) no-repeat 0 50%;background-size:0.33rem 0.22rem;margin-right:0.24rem;float: right;}
	.footer{width: 5.57rem;height: 0.73rem;border-radius: 0.05rem;text-align: center;font-size: 0.22rem;line-height: 0.73rem;margin: 0 auto;background: #ff7d1d;margin-top: 0.45rem;position: relative;}
	.footer input[type="button"]{width:100%;height:100%;}
	.btn{font-size: 0.2rem;height: 0.9rem;line-height: 0.9rem;width: 5.4rem;margin: 0 auto;color: #3f3f4e;text-align: center;}
	.btnyzm{height: 0.63rem;width: 1.91rem;border: 1px solid #e5e5e5;background: #ff7d1d;margin-left: 0.15rem;}
	.isDj {pointer-events: none;background: rgba(172, 207, 224, 0.8);}
</style>