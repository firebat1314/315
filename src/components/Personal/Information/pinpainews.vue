<template>
	<div class="information">
		<my-header title="品牌信息" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="right">
			<router-link :to="{ path:'editor',query:{title:'添加'}}" style="color: #3F3F4E;">
				添加
			</router-link>
		</div>
		<div class="body">
			<div class="bodytop">
				<swipeout v-for="list in listData">
					<swipeout-item :disabled="disabled" ref="swipeoutItem" :right-menu-width="210" :sensitivity="15">
						<div slot="right-menu">
							<swipeout-button @click.native="onButtonClick(list.id)" type="warn" :width="70">{{ ('删除')}}</swipeout-button>
						</div>
						<div slot="content" class="demo-content vux-1px-b">
							<div class="list">
								<router-link :to="{ path:'editor',query:{title:list.title,id:list.id}}" style="width: 100%;height: 100%;display: block;overflow: hidden;">
									<span class="sp1">{{list.title}}</span>
									<span class="backright"></span>
								</router-link>
							</div>
						</div>
					</swipeout-item>
				</swipeout>
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>
<script>
	import qs from 'qs'
	import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
	import { getOpenUrl, getToken } from '../../../assets/js/common.js';
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				disabled: false,
				popupVisible:false,
				tips:'',
				listData: []
			}
		},
		components: {
			GroupTitle,
			Swipeout,
			SwipeoutItem,
			SwipeoutButton,
			XButton
		},
		mounted() {
			this.ppnewsData()
		},
		methods: {
			onButtonClick(type) {
				this.delData(type)
			},
			delData(type){
				this.$http.get(getOpenUrl() + 'delBrand', {
					params: {
						id: type
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					if(res.body.code == '0000') {
						this.ppnewsData()
						this.tips = "删除成功";
						this.popupVisible = true
						setTimeout(()=> {
							this.popupVisible = false
						}, 1000)
					} else {
						this.tips = res.body.error_description;
						this.popupVisible = true
						setTimeout(()=> {
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
			ppnewsData() {
				this.$http.get(getOpenUrl() + 'brandList', {
					params: {
						id: ''
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.listData = res.body.data
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
	.information {
		background: #F4F4F4;
		overflow-y: scroll;
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
	
	.right {
		height: 0.88rem;
		line-height: 0.88rem;
		position: absolute;
		top: 0;
		right: 0.24rem;
		font-size: 0.26rem;
		color: #3F3F4E;
		padding-top: .4rem;
	}
	
	.information>>>.vux-swipeout-button-warn {
		outline: none;
	}
</style>