<template>
	<div class="xydetail" style="height: 100%;overflow-y: scroll;">
		<my-header1 :title="this.$route.query.title"></my-header1>
		<div class="page-loadmore" style="font-size: 0.2rem;height: calc(100% - 1.28rem);position: relative;top: 1.28rem;">
			<scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" :pulldown-config="upobj" v-model="status" ref="scroller">
				<div class="xylist">
					<router-link :to="{ path: 'photodetail', query: { catid: list.catid,id:list.id}}" v-for="(list,index) in xuanyongData">
						<div class="xy-bottom">
							
							<div class="xy-b-l">
								<img v-lazy="list.thumb" />
							</div>
							<div class="xy-b-r">
								<ul>
									<li class="li1">{{list.title}}</li>
									<li class="li2">{{list.description}}</li>
								</ul>
							</div>
						</div>
					</router-link>
				</div>
				<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
					<span v-show="status.pullupStatus === 'default'"></span>
					<!--<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>-->
					<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
				</div>
				<nomore></nomore>
			</scroller>
		</div>
		
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	var page = 1
	import { getOpenUrl, getToken } from '../../assets/js/common.js';
	import { Scroller, Spinner } from 'vux'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				loading: false,
				popupVisible: false,
				tips: '',
				xuanyongData: [],
				status: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
				upobj: {
		          content: '请下拉刷新数据',
		          pullUpHeight: 60,
		          height: 40,
		          autoRefresh: false,
		          downContent: '请下拉刷新数据',
		          upContent: '松手即刷新',
		          loadingContent: '加载中...',
		          clsPrefix: 'xs-plugin-pullup-'
		        }
			}
		},
		components: {
			Scroller,
			Spinner
		},
		mounted() {
			page=1
			this.xuanyong()
		},
		methods: {
			loadMore() {
				page += 1;
				this.xuanyong(page)
				this.loading = false
			},
			refresh() {
				page = 1
				$('.nomore').hide()
				this.$nextTick(() => {
					this.$http.post(getOpenUrl() + 'index/index_guide', {
						keyword: '',
						int_size: 8,
						page: page,
						year: '',
						order: '',
						catid: this.$route.query.catid
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.xuanyongData.splice(0, this.xuanyongData.length);
						//					this.xuanyongData = res.body
						var data = res.body.lists_only
						$.each(data, (key, val) => {
							this.xuanyongData.push(val);
						})
						this.loading = false
						this.$refs.scroller.donePulldown()
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
				})
			},
			xuanyong() {
				this.loading = true
				this.$http.post(getOpenUrl() + 'index/index_guide', {
						keyword: '',
						int_size: 8,
						page: page,
						year: '',
						order: '',
						catid: this.$route.query.catid
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						var data = res.body.lists_only
						$.each(data, (key, val) => {
							this.xuanyongData.push(val);
						})
						console.log()
						if(data.length==0){
							$('.nomore').show()
						}
						this.loading = false
						this.$refs.scroller.donePullup()
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
	.xydetail>>>.mint-loadmore-content{
		margin-top: 1.28rem;
		font-size: 0.2rem;
	}
	.xylist {
		background: #fff;
		margin-top: 1px;
	}
	
	.xylist .xy-top {
		font-size: 0.28rem;
		line-height: 0.82rem;
		color: #3F3F4E;
		padding-left: 0.24rem;
	}
	
	.xy-bottom {
		overflow: hidden;
		display: flex;
		padding-top: 0.24rem;
		margin-right: 0.24rem;
	}
	
	.xy-bottom .xy-b-l {
		width: 2rem;
		height: 2rem;
		float: left;
		position: relative;
		background: #e6ecf2;
	}
	
	.xy-bottom .xy-b-l img {
		width: auto!important;
		height: 1.5rem!important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.xy-bottom .xy-b-r {
		flex: 1;
		overflow: hidden;
		float: left;
		margin-left: 0.27rem;
	}
	
	.xy-bottom .xy-b-r ul li {
		float: left;
		width: 100%;
	}
	
	.xy-bottom .xy-b-r .li1 {
		color: #3F3F4E;
		font-size: 0.24rem;
		line-height: 0.24rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-top: 0.1rem;
	}
	
	.xy-bottom .xy-b-r .li2 {
		color: #74747d;
		font-size: 0.2rem;
		line-height: 0.3rem;
		margin-top: 0.24rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-word;
	}
</style>