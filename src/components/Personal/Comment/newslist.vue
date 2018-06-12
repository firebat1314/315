<template>
	<div class="keep">
		<my-header :title="this.$route.query.title" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<router-link :to="{ path: 'newsupload', query: { headername: '添加新闻',title:this.$route.query.title, type: this.$route.query.type}}">
			<div class="body-top">添加</div>
		</router-link>
		<div class="keep-all">
			<!--<router-link :to="{ path: 'newsupload', query: {title:this.$route.query.title}}">-->
			<swipeout v-for="list in listData">
				<swipeout-item :disabled="disabled" ref="swipeoutItem" :right-menu-width="210" :sensitivity="15">
					<div slot="right-menu">
						<swipeout-button @click.native="onButtonClick(list.id)" type="warn" :width="70">{{ ('删除')}}</swipeout-button>
					</div>
					<div slot="content" class="demo-content vux-1px-b">
						<router-link :to="{ path: 'newsupload', query: {headername: '编辑'+list.title,id:list.id,type:type}}">
							<div class="keep-list">
								<div class="keep-list-left">
									<img v-lazy="list.thumbs"/>
								</div>
								<div class="keep-list-right">
									<ul>
										<li class="li1">{{list.title}}</li>
										<li class="li3">{{list.url}}</li>
									</ul>
								</div>
							</div>
						</router-link>
					</div>
				</swipeout-item>
			</swipeout>
			<!--</router-link>-->
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
	import { getOpenUrl, getToken} from '../../../assets/js/common.js'
	var type=''
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				listData:[],
				disabled: false,
				popupVisible:false,
				tips:'',
				up:''
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
			if(this.$route.query.title=="企业新闻"){
				var type="company"
				this.getData(type)
			}
			if(this.$route.query.title=="产品新闻"){
				var type="product"
				this.getData(type)
			}
		},
		methods: {
			onButtonClick(type) {
				this.delData(type)
			},
			//获取新闻列表
			getData(type){
				this.type=type
				this.$http.get(getOpenUrl() + 'companyNews', {
					params:{
						type:type	
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.listData=res.body.data
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
			//删除新闻列表
			delData(type){
				this.$http.get(getOpenUrl() + 'delNews', {
					params:{
						id:type	
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					if(res.body.code == '0000') {
						this.getData(this.type)
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
			}
		}
	}
</script>

<style scoped>
	.keep {
		background: #f4f4f4;
		overflow-y: scroll;
	}
	.keep>>>.header{position: fixed;width: 100%;}
	.body-top {
		height: 1.28rem;
		line-height: 0.88rem;
		color: #3F3F4E;
		font-size: 0.24rem;
		position: absolute;
	    	top: 0;
	    	right: 0.24rem;
	    	z-index: 100;
	    	padding-top: 0.4rem;
	}
	.keep-all{
		margin: 0 0.24rem;
		position: relative;
		top: 1.48rem;
		overflow-y: scroll;
	}
	.keep-list {
		height: 1.7rem;
		
		margin-bottom: 0.14rem;
		background: #fff;
		box-shadow: 0 2px 5px #C2C2C2;
		border-radius: 0.05rem;
	}
	
	.keep-list-left {
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 0.05rem;
		overflow: hidden;
		left: 0.2rem;
		float: left;
		margin-left: 0.2rem;
		margin-top: 0.2rem;
	}
	
	.keep-list-left img {
		width: 1.3rem;
		height: 1.3rem;
	}
	
	.keep-list-right {
		float: left;
		margin-left: 0.23rem;
		margin-top: 0.17rem;
		width: calc(100% - 2.7rem);
	}
	
	.keep-list-right .li1 {
		height: 0.65rem;
		line-height: 0.33rem;
		font-size: 0.24rem;
		color: #3F3F4E;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.keep-list-right .li3 {
		line-height: 0.38rem;
		font-size: 0.22rem;
		color: #74747d;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	.keep-up{height: 1.7rem;width: 1.42rem;position: absolute;right: 0;}
	.keep-up img{height: 1.7rem;width: 1.42rem;position: absolute;}
	.keep>>>.vux-swipeout-button-warn{outline: none;}
</style>