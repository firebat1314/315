<template>
	<div>
		<div class="up" @click="jump()">
			<a>跳过<span id="sp1">5</span></a>
		</div>
		<div class="index" :style="adData" @click="adJump(adDatas)">
			<div class="bottom"></div>
			<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
		</div>
	</div>
</template>
<script>
	var t = 5;
	import { setCookie, getCookie } from '../assets/js/cookie.js'
	import { getOpenUrl, getToken, adUrl} from '../assets/js/common.js';
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				timer: null,
				adData: '',
				popupVisible: false,
				tips: '',
				adDatas:[]
			}
		},
		mounted() {
			this._token();
			this.$http.get(getOpenUrl() + "ads",{
				params:{
					type:43
				},
				headers: {
					'Authorization': 'Bearer ' +  getToken()
				}
			}).then((res)=>{
				if (res.body.code == '0000'){
					this.adDatas=res.body.data[0]
					var ads = res.body.data[0].ad_code;
					this.adData = "background-image:url("+ads+")";
				}
			});
		},
		methods: {
			jump() {
				this.token = getToken();
				if(!this.token) {
					this.tips = "用户失效，请登录"
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
						this.$router.push({
							path: '/login'
						});
					}, 1500)
				}else{
					window.location.href = "#/home";
					clearInterval(this.timer);
				}
			},
			permission() {
				this.timer = setInterval(() => {
					t--;
					var sp = document.getElementById("sp1");
					sp.innerHTML = t;
					if(t <= 0) {
						window.location.href = "#/home";
						clearInterval(this.timer);
						t = 5
					}
				}, 1000);
			},
			_token() {
				this.token = getToken();
				if(!this.token) {
					this.tips = "用户失效，请登录"
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
						this.$router.push({
							path: '/login'
						});
					}, 1500)
				}else{
					this.permission()
				}
			},
			adJump(param) {
				clearInterval(this.timer);
				var url = adUrl(param);
				this.$router.push(url);
			}
		}
	}
</script>

<style scoped>
	a {
		color: #fc8209;
	}
	
	.index {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		position: relative;
		/*background: url(../../static/images/qidongye.png) no-repeat;*/
		background-size: cover;
	}
	
	.bottom {
		max-width: 1080px;
		height: 1.6rem;
		width: 100%;
		background: url(../../static/images/line.png);
		background-size: cover;
		position: absolute;
		bottom: 0;
	}
	
	#sp1 {
		padding-left: 0.05rem;
	}
	
	.up {
		z-index: 1;
		width: 0.923rem;
		height: 0.42rem;
		position: absolute;
		top: 0.6rem;
		right: 0.3rem;
		font-size: 0.2rem;
		color: #fff;
		background: rgba(255, 255, 255, 0.1);
		text-align: center;
		line-height: 0.42rem;
		border-radius: 0.1rem;
		border: 1px solid #fc8209;
	}
</style>