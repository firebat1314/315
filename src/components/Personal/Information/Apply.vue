<template>
	<div class="information">
		<my-header title="基本信息" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<div class="bodytop">
				<a href="#/qymc">
					<div class="list">
						<span class="sp1">企业名称</span>
						<span class="backright"></span>
					</div>
				</a>
				<router-link :to="{ path: 'upload', query: { title: '组织机构代码' }}">
					<div class="list">
						<span class="sp1">组织机构代码</span>
						<span class="backright"></span>
					</div>
				</router-link>
				<a href="#/zyhy">
					<div class="list">
						<span class="sp1">主营行业</span>
						<span class="backright"></span>
					</div>
				</a>
				<router-link :to="{ path: 'upload', query: { title: '经营范围' }}">
					<div class="list">
						<span class="sp1">经营范围</span>
						<span class="backright"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'upload', query: { title: '企业资质' }}">
					<div class="list">
						<span class="sp1">企业资质</span>
						<span class="backright"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'upload', query: { title: '企业证书' }}">
					<div class="list">
						<span class="sp1">企业证书</span>
						<span class="backright"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'upload', query: { title: '企业简介' }}">
					<div class="list bb0">
						<span class="sp1">企业简介</span>
						<span class="backright"></span>
					</div>
				</router-link>
			</div>
		</div>
		<div class="footer">
			<input type="button" value="保存" style="color: #fff;" @click="getData" />
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>
<script>
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	var expireDays = 1000 * 60 * 60;
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				tips: '',
				jibenData: []
			}
		},
		mounted() {
			this.setData()
		},
		methods: {
			setData() {
				setCookie("ztitle", getCookie("ztitle") ? getCookie("ztitle") : '', expireDays);
				setCookie("ytitle", getCookie("ytitle") ? getCookie("ytitle") : '', expireDays);
				setCookie("data", getCookie("data") ? getCookie("data") : '', expireDays);
				setCookie("zzjgdm", getCookie("zzjgdm") ? getCookie("zzjgdm") : '', expireDays);
				setCookie("jyfw", getCookie("jyfw") ? getCookie("jyfw") : '', expireDays);
				setCookie("qyzz", getCookie("qyzz") ? getCookie("qyzz") : '', expireDays);
				setCookie("qyzs", getCookie("qyzs") ? getCookie("qyzs") : '', expireDays);
				setCookie("qyjj", getCookie("qyjj") ? getCookie("qyjj") : '', expireDays);
			},
			getData() {
				this.$http.post(getOpenUrl() + 'applyEdit', {
						title: getCookie("ztitle"),
						ytitle: getCookie("ytitle"),
						zzjgdm: getCookie("zzjgdm"),
						catid: getCookie("data"),
						jinyfw: getCookie("jyfw"),
						qiyzz: getCookie("qyzz"),
						qiyzs: getCookie("qyzs"),
						qiyjj: getCookie("qyjj")
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.tips = res.body.info;
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false
								this.$router.back(-2)
							}, 1000)
						} else {
							this.tips = res.body.error_description;
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false
							}, 1000)
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
			activated() {
				this.setData()
			}
		}
	}
</script>
<style scoped>
	.information {
		background: #F4F4F4;
	}
	
	.body {
		margin-top: 0.2rem;
	}
	
	.bodytop {
		background: #FFFFFF;
	}
	
	.bb0 {
		border-bottom: 0!important;
	}
	
	.list {
		border-bottom: 1px solid #ebebeb;
		padding: 0 0.24rem;
		font-size: 0.22rem;
		overflow: hidden;
	}
	
	.sp1 {
		color: #3F3F4E;
		display: block;
		float: left;
		line-height: 0.78rem;
	}
	
	.backright {
		height: 0.78rem;
		width: 0.12rem;
		float: left;
		background: url(../../../../static/images/personal/personalicon/backright.png) no-repeat 0 50%;
		background-size: 0.12rem 0.24rem;
		display: block;
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
</style>