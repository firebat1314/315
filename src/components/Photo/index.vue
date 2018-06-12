<template>
	<div class="photo backtop">
		<my-header2 type="tuji"></my-header2>

		<div class="body-top">
			<div class="body-top-left" style="float: left;flex: 1;">
				<ul class="ul1" @click="selectmajors">
					<li ref="majors">专业</li>
				</ul>
				<ul class="ul2" style="background: #f4f4f4;width: 100%;text-align:center;z-index: 19;" v-show="showmajors">
					<li @click="opbtnmajors('', 37)">请选择</li>
					<li ref="amajors1" @click="opbtnmajors(cate.catname, cate.catid)" v-for="(cate,index) in tujiData.erCate">{{cate.catname}}</li>
				</ul>
			</div>
			<div class="body-top-left" style="float: left;flex: 1;">
				<ul class="ul1" @click="selectyear">
					<li ref="year">年份</li>
				</ul>
				<ul class="ul2" style="background: #f4f4f4;padding: 0 0.2rem;z-index: 19;width:50px;" v-show="showyear">
					<li @click="opbtnyear()">请选择</li>
					<li @click="opbtnyear(year)" v-for="(year,index) in tujiData.time">{{year}}</li>
				</ul>
			</div>
			<div class="body-top-left" style="float: right;flex: 1;">
				<ul class="ul1" @click="selectsort">
					<li ref="sort">倒序</li>
				</ul>
				<ul class="ul2" style="background: #f4f4f4;padding: 0 0.2rem;z-index: 19;" v-show="showsort">
					<li ref="asort1" @click="opbtnsort('asc')">正序</li>
					<li ref="asort2" @click="opbtnsort('desc')">倒序</li>
				</ul>
			</div>
		</div>
		<div class="page-loadmore" style="font-size: 0.2rem;height: calc(100% - 2.95rem);position: relative;top: 1.98rem;bottom: 0.98rem;">
			<scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" :pulldown-config="upobj" v-model="status" ref="scroller">
				<div style="overflow: hidden;">
					<router-link :to="{ path: 'photodetail', query: { catid: list.catid,id:list.id}}" v-for="(list,index) in listsData" :key="index" class="body-list" :style="index%2!=0?'float: right;background: #ecf6ee':''">
						<dl>
							<dt><img  v-lazy="list.thumb"/></dt>
							<dd>
								<span class="sp1">{{list.title}}</span>
								<span class="sp2">{{list.description}}</span>
							</dd>
						</dl>
					</router-link>
				</div>
				<!--pullup slot-->
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
		<!--<my-footer></my-footer>-->
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from '../../assets/js/common.js';
	import { Scroller, Spinner } from 'vux'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	var page = 1;
	var top = ''
	export default {
		data() {
			return {
				loading: false,
				popupVisible: false,
				tips: '',
				showmajors: false,
				showyear: false,
				showsort: false,
				tujiData: [],
				listsData: [],
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
			this.scroll = 0
			$(".page-loadmore").animate({
				"scrollTop": this.scroll
			}, 0)
			this.tuji(this.type, 37, '', 1)
		},
		methods: {
			loadMore() {
				page += 1;
				this.tuji(this.type, this.catid, this.year, page);
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
							year: this.year,
							order: this.type,
							catid: this.catid
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						})
						.then((res) => {
							this.listsData.splice(0, this.listsData.length);
							var data = res.body.lists_data
							this.tujiData = res.body
							$.each(data, (key, val) => {
								this.listsData.push(val);
							})
							if(data.length==0){
								$('.nomore').show()
							}
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
			selectmajors() {
				page = 1
				this.showmajors = !this.showmajors
				this.showyear = false
				this.showsort = false
			},
			selectyear() {
				page = 1
				this.showyear = !this.showyear
				this.showmajors = false
				this.showsort = false
			},
			selectsort() {
				page = 1
				this.showsort = !this.showsort
				this.showyear = false
				this.showmajors = false
			},
			opbtnmajors(type, catid) {
				page = 1
				this.listsData.splice(0, this.listsData.length);
				this.tuji('', catid, this.year, 1)
				this.$refs.majors.innerText = type != '' ? type : '专业'
				this.showmajors = !this.showmajors
			},
			opbtnyear(type) {
				page = 1
				this.listsData.splice(0, this.listsData.length);
				this.tuji('', this.catid, type, 1)
				this.$refs.year.innerText = type ? type : '年份';
				this.showyear = !this.showyear
			},
			opbtnsort(type) {
				page = 1
				switch(type) {
					case 'asc':
						this.listsData.splice(0, this.listsData.length);
						this.tuji(type, this.catid, this.year, 1)
						this.$refs.sort.innerText = this.$refs.asort1.innerText
						this.showsort = !this.showsort
						break;
					case 'desc':
						this.listsData.splice(0, this.listsData.length);
						this.tuji(type, this.catid, this.year, 1)
						this.$refs.sort.innerText = this.$refs.asort2.innerText
						this.showsort = !this.showsort
						break;
				}
			},
			tuji(type, catid, year, page) {
				this.loading = true
				this.catid = catid
				this.type = type
				this.year = year
				this.$http.post(getOpenUrl() + 'index/index_guide', {
						keyword: '',
						int_size: 8,
						page: page,
						year: this.year,
						order: this.type,
						catid: catid
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {

						$('.page-loadmore').scroll(() => {
							this.scroll = $('.page-loadmore').scrollTop();
						})
						var data = res.body.lists_data
						this.tujiData = res.body
						$.each(data, (key, val) => {
							this.listsData.push(val);
						})
						if(data.length==0){
							$('.nomore').show()
						}
						this.$refs.scroller.donePullup()
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
		},
		activated() {
			$(".page-loadmore").animate({
				"scrollTop": this.scroll
			}, 100)
		},
		beforeRouteLeave(to, from, next) {
			top = this.scroll
			this.$store.commit('HOMESTOPF', top)
			next();
		}
	}
</script>

<style scoped>
	.photo>>>.header {
		border-bottom: 0;
	}
	
	.photo>>>.header .a1 {
		display: none;
	}
	/*.photo>>>.mint-loadmore-bottom{display: none;}*/
	/*.photo>>>.mint-loadmore-text{position: relative;bottom: 4rem;left: -25%;}*/
	
	.photo>>>.mint-loadmore-top {
		margin-top: -0.6rem;
		height: 0.6rem;
		line-height: 0.6rem;
	}
	/*.photo>>>.mint-loadmore-content{height: 100%;}*/
	
	.body-top {
		height: 0.7rem;
		line-height: 0.7rem;
		background: #f4f4f4;
		color: #3F3F4E;
		font-size: 0.22rem;
		position: fixed;
		top: 1.28rem;
		width: 100%;
		z-index: 99;
		display: flex;
	}
	
	.body-top-left {
		position: relative;
	}
	
	.body-top-left .ul2 {
		position: absolute;
		left: 50%;
		top: 0.7rem;
		transform: translateX(-50%);
		height: 2rem;
		overflow-y: scroll;
		line-height: 0.5rem;
	}
	
	.body-top-left .ul1 li {
		float: left;
		background: url(../../../static/images/personal/personalicon/down.png) no-repeat right 50%;
		background-size: 0.16rem 0.08rem;
		padding-right: 0.18rem;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 1rem;
		text-align: center;
		width: calc(100% - 0.9rem);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.body-list {
		overflow: hidden;
		width: 50%;
		background: #f4edea;
		overflow: hidden;
		float: left;
		margin-top: 0.04rem;
	}
	
	.body-list dl {
	    padding-top: 0.53rem;
	    padding-bottom: 0.;
	    left: 50%;
	    width: 2.58rem;
	    margin: 0 auto;
	    overflow: hidden;
	}
	
	.body-list dt {
		width: 2.12rem;
		height: 1.57rem;
		border-bottom: 1px solid #e4dcd3;
		float: left;
		padding: 0 0.15rem 0.36rem 0.3rem;
	}
	
	.body-list dt img {
		width: 2.12rem;
		height: 1.57rem;
	}
	
	.body-list dd {
		float: left;
	}
	
	.body-list .sp1 {
		width: 2.58rem;
		font-size: 0.22rem;
		line-height: 0.36rem;
		height: 0.72rem;
		color: #3F3F4E;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.body-list .sp2 {
		width: 2.58rem;
		font-size: 0.16rem;
		line-height: 0.48rem;
		height: 0.48rem;
		color: #75737c;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
</style>