<template>
	<div class="pro-message">
		<my-header title="更多报道" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="zxbz-box">
			<a :href="rp.url" v-for="(rp,index) in otherReport" :key="index">
			<div class="zxbz-item">
				
				<img v-lazy="rp.thumb">
				<p style="color: #000;">{{rp.title}}</p>
				<span>{{rp.add_time}}</span>
				
			</div>
			</a>
			<div style="clear:both"></div>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				loading: false,
				tips: '',
				otherReport:[]
			}
		},
		mounted() {
			this.getBj()
		},
		methods: {
			getBj() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/goods_other", {
					id: this.$route.query.id,
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.otherReport = res.body.report_data;
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
			
		}
	}
</script>

<style scoped>
	.pro-message>>>.header{
		position: fixed;
		top: 0;
		width: 100%;
	}
	.zxbz-box{
		padding: 0.24rem;
		padding-top: 1.52rem;
	}
	.zxbz-item {
		width: 100%;
		font-size: 0.2rem;
		margin-bottom: 0.25rem;
	}
	
	.zxbz-item img {
		width: 1.4rem;
		height: 1.4rem;
		background: #75cffe;
		float: left;
		margin-right: 0.2rem;
	}
	
	.zxbz-item p {
		margin-bottom: 0.9rem;
	}
	
	.zxbz-item span {
		color: #787883;
	}
</style>