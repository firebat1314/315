<template>
	<div class="qymc">
		<my-header title="企业名称" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="nav-list">
			<ul>
				<li style="border-bottom: 1px solid #f4f4f4;"><input type="text" placeholder="企业名称" v-model="ztitle"/></li>
				<li><input type="text" placeholder="英文名称" v-model="ytitle"/></li>
			</ul>
		</div>
		<div class="footer">
			<input type="button" value="确定" style="color: #fff;" @click="submit"/>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import {setCookie,getCookie} from '../../../assets/js/cookie.js'
	var expireDays = 1000 * 60 * 60;
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				tips: '',
				data: {},
				ztitle:'',
				ytitle:''
			}
		},
		mounted() {
			this.ztitle=getCookie("ztitle");
			this.ytitle=getCookie("ytitle");
		},
		methods: {
			submit(){
				if (!this.ztitle){
					this.tips = '请输入企业名称';
					this.popupVisible = true;
					setTimeout(() => {
						this.popupVisible = false
					}, 1000)
					return false;
				}
				setCookie("ztitle", this.ztitle, expireDays);
				setCookie("ytitle", this.ytitle, expireDays);
				this.$router.back(-1)
			}
		}
	}
</script>
<style scoped>
	.qymc{background: #f4f4f4;}
	.nav-list{margin-top: 0.2rem;}
	.nav-list ul li{font-size: 0.2rem;color: #3f3f4e;line-height: 0.78rem;background: #fff;padding-left: 0.24rem;}
	.nav-list input[type="text"]{width:calc(100% - 0.24rem);height:0.78rem;}
	.footer{width: 5.57rem;height: 0.73rem;border-radius: 0.05rem;text-align: center;font-size: 0.22rem;line-height: 0.73rem;margin: 0 auto;background: #ff7d1d;margin-top: 0.45rem;position: relative;}
	.footer input[type="button"]{width:100%;height:100%;}
</style>