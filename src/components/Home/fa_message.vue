<template>
	<div class="pro-message">
		<my-header title="发表评论" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="right" @click="fabu">发布</div>
		<div class="pro-header">
			<div class="pro-header-miaoshu">
				<p>描述评价</p>
				<div class="miaoshu-button active" id="1" @click="direction(1)">支持</div>
				<div class="miaoshu-button" id="3" @click="direction(3)">不好说</div>
				<div class="miaoshu-button" id="2" @click="direction(2)">反对</div>
			</div>
		</div>
		<div class="pro-editor">
			<textarea placeholder=" 说说你对该产品的看法？说说您的使用心得，分享给更多想使用该产品的用户。" ref="content"></textarea>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				loading: false,
				tips: ''
			}
		},
		mounted() {
			this.dir=1
		},
		methods: {
			direction(dir) {
				$('.miaoshu-button').each(function() {
					$(this).removeClass('active');
					if ($(this).attr('id') == dir){
						$(this).addClass('active');
					}
				});
				this.dir=dir
			},
			fabu() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/addComment", {
					id: this.$route.query.id,
					catid: this.$route.query.catid,
					content: this.$refs.content.value,
					modelid: 5,
					direction: this.dir,
					source:0
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.tips = "发布成功"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.back(-1)
						}, 1500)
					} else {
						this.tips = res.body.error_description
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
//							this.$router.back(-1)
						}, 1500)
					}
					this.loading = false
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
			}
		}
	}
</script>

<style scoped>
	.all-zhichi {
		width: 2.2rem;
		height: 0.25rem;
		position: absolute;
	}
	
	.bili-box {
		position: relative;
		height: 1.4rem;
		margin: 0.3rem 0.24rem;
		border-left: 1px solid #ccc;
	}
	
	.pro-editor textarea {
		width: 100%;
		height: 2.5rem;
		border-bottom: 1px solid #eee;
	}
	
	.pro-editor {
		padding-top: 0.2rem;
		margin: 0 0.24rem;
	}
	
	.pro-header .pro-header-miaoshu .miaoshu-button {
		width: 1.1rem;
		height: 0.5rem;
		border: 1px solid #ccc;
		float: left;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 0.55rem;
		margin-top: 0.1rem;
		margin-left: 0.2rem;
	}
	/*.pro-header .pro-header-miaoshu .miaoshu-button:hover {
		border: 1px solid #ff651d;
		color: #ff651d;
	}*/
	
	.pro-header .pro-header-miaoshu .miaoshu-button.active {
		border: 1px solid #ff651d;
		color: #ff651d;
	}
	
	.pro-header .pro-header-miaoshu p {
		float: left;
		margin-top: 0.25rem;
		margin-left: 0.2rem;
	}
	
	.pro-header .pro-header-miaoshu img {
		width: 0.8rem;
		height: 0.8rem;
		background: #d3ddef;
		float: left;
	}
	
	.pro-header .pro-header-miaoshu {
		margin-top: 0.2rem;
		margin-left: 0.24rem;
		height: 100%;
		font-size: 0.2rem;
	}
	
	.pro-header {
		height: 1rem;
		border-bottom: 1px solid #eee;
	}
	
	.right {
		height: 0.88rem;
		line-height: 0.88rem;
		position: absolute;
		top: 0.4rem;
		right: 0.24rem;
		font-size: 0.22rem;
		color: #ff651d;
	}
</style>