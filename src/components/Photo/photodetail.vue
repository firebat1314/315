<template>
	<div class="photodetail">
		<div style="height: 11.5rem;overflow-y: scroll;">
			<!--<scroller lock-x scrollbar-y height="-0.8rem">
				<div>-->
				<div class="banner">
					<div class="header">
						<a class="a1" href="javascript:history.back(-1);"></a>
						<!--<a class="a2"></a>-->
					</div>
					<img v-lazy="listData.thumb" />
				</div>
				<div class="p" style="padding-bottom: 0.8rem;">

					<div class="navlist">
						<ul>
							<li class="li1">{{listData.title}} </li>
						</ul>
					</div>
					<div class="text" v-html="listData.content"></div>
					<div class="nav-bottom">
						<p>相关推荐</p>
						<div class="nav-bottom-detail" v-for="(list,index) in listData1">
							<div @click="getData(list.catid, list.id)">
								<div class="detail-left">
									<img v-lazy="list.thumb" />
								</div>
								<div class="detail-right">
									<ul style="width: calc(100% - 2.8rem);">
										<li class="li1">{{list.title}}</li>
										<li class="li2" v-html="list.description"></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--</div>
			</scroller>-->
		</div>
		<div class="footer">
			<ul>
				<li class="footer-li1" @click="online">在线阅读</li>
				<!--<a :href="listData.magadownurl" download>-->
					<!--url(listData.magadownurl)-->
				<li @click="download" class="footer-li2">立即下载</li>
				<!--</a>-->
			</ul>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from '../../assets/js/common.js';
	import { Scroller, Spinner } from 'vux'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		components: {
			Scroller,
			Spinner
		},
		data() {
			return {
				loading: false,
				popupVisible: false,
				tips: '',
				listData: {},
				listData1: {}
			};
		},
		mounted() {
			let catid = this.$route.query.catid;
			let id = this.$route.query.id;
			this.getData(catid, id);
		},
		methods: {
			url(lianjie) {
				console.log(lianjie)
				cordova.InAppBrowser.open(lianjie, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭')
			},
			online() {
				this.tips = "暂不支持在线阅读敬请期待"
				this.popupVisible = true
				setTimeout(() => {
					this.popupVisible = false
				}, 1500)
			},
			download() {
				this.tips = "暂不支持下载敬请期待"
				this.popupVisible = true
				setTimeout(() => {
					this.popupVisible = false
				}, 1500)
			},
			getData(catid, id) {
				this.loading = true
				window.scrollTo(0, 0)
				this.$http.post(getOpenUrl() + 'guide_show', {
						catid: catid,
						id: id,
						page: 1,
						int_size: 8
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.listData = res.body.desc_info
							this.listData1 = res.body.lists_data
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
			},
			down() {
				if(this.listData.magadown == 1) {
					if(!cordova.InAppBrowser) {
						return;
					}
					// toolbar=yes 仅iOS有效,提供关闭、返回、前进三个按钮
					// toolbarposition=top/bottom 仅iOS有效,决定toolbar的位置
					// closebuttoncaption=关闭 仅iOS有效
					cordova.InAppBrowser.open(this.listData.magadownurl, '_system', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
				} else {
					this.tips = "暂不支持下载"
					this.popupVisible = true
					setTimeout(() => {
						this.loading = false
						this.popupVisible = false
					}, 1500)
				}
			}
		},
		updated() {
			$('.text img').css({
				width: '100%',
				height: 'auto',
				marginLeft: '0',
				marginRight: '0'
			});
			$('.text table').css({
				width: '100%'
			});
		}
	}
</script>

<style scoped>
	.photodetail {
		background: #eeeeee;
		height: auto;
	}
	
	.header {
		background: #f5f4f4;
		height: 0.88rem;
		position: fixed;
		width: 100%;
		padding-top: 0.4rem;
		z-index: 99;
	}
	
	.header .a1 {
		width: 0.4rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/backgray.png) no-repeat 0 50%;
		background-size: 0.4rem 0.4rem;
		float: left;
		margin-left: 0.24rem;
	}
	
	.header .a2 {
		width: 0.4rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/backdian.png) no-repeat 0 50%;
		background-size: 0.4rem 0.4rem;
		float: left;
		margin-right: 0.24rem;
		float: right;
	}
	
	.banner {
		width: 100%;
		height: 5.98rem;
		background: #f5f4f4;
		position: relative;
	}
	
	.banner img {
		width: 4.12rem;
		height: 3.06rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.navlist {
		padding: 0.18rem 0.24rem;
		background: #fff;
		margin-bottom: 0.14rem;
	}
	
	.navlist ul li {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: break-word;
	}
	
	.li1,
	.li2 {
		color: #3F3F4E;
	}
	
	.li1 {
		font-size: 0.3rem;
		line-height: 0.42rem;
	}
	
	.li2 {
		font-size: 0.2rem;
		line-height: 0.32rem;
	}
	
	.li3 {
		color: #656571;
		font-size: 0.2rem;
		line-height: 0.37rem;
	}
	
	.appraise {
		background: #fff;
		margin-top: 0.14rem;
		margin-bottom: 0.14rem;
	}
	
	.appraise-p {
		line-height: 0.73rem;
		color: #3F3F4E;
		font-size: 0.2rem;
		padding-left: 0.24rem;
		border-bottom: 1px solid #eee;
	}
	
	.appraisebottom {
		padding: 0 0.24rem;
		padding-bottom: 0.22rem;
		border-bottom: 1px solid #eee;
	}
	
	.appraisebottom-top {
		overflow: hidden;
		margin-top: 0.28rem;
	}
	
	.appraisebottom-top img {
		width: 0.56rem;
		height: 0.56rem;
		border-radius: 50%;
		float: left;
	}
	
	.appraisebottom-top .p1 {
		font-size: 0.22rem;
		color: #3F3F4E;
		float: left;
		line-height: 0.56rem;
		margin-left: 0.2rem;
	}
	
	.appraisebottom-bottom {
		margin-top: 0.11rem;
	}
	
	.appraisebottom-bottom .p2 {
		font-size: 0.2rem;
		color: #656571;
		line-height: 0.34rem;
	}
	
	.seeall {
		padding-bottom: 0.28rem;
	}
	
	.seeall p {
		border: 1px solid #e3e1e1;
		height: 0.58rem;
		width: 2.88rem;
		line-height: 0.58rem;
		text-align: center;
		font-size: 0.2rem;
		color: #3F3F4E;
		border-radius: 0.05rem;
		margin: 0 auto;
	}
	
	.photodetail>>>.mint-tab-item-label {
		border-right: 1px solid #eeeeee;
	}
	
	.li3>>>.mint-tab-item-label {
		border-right: 0;
	}
	
	.mint-navbar .mint-tab-item {
		font-size: 0.2rem;
		margin-bottom: 0;
		border-bottom: 0;
		line-height: 0.2rem;
		padding: 0.32rem 0;
		color: #3F3F4E;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		color: #ff651d;
	}
	
	.mint-tab-container {
		margin-bottom: 0.14rem;
	}
	
	.tab {
		background: #fff;
	}
	
	.mint-navbar {
		border-bottom: 1px solid #eee;
		margin: 0 0.24rem;
	}
	
	.text {
		line-height: 0.42rem;
		font-size: 0.24rem;
		color: #3F3F4E;
		background: #fff;
		padding: 0.2rem 0.24rem;
	}
	
	.text>>>p {
		margin-left: 0!important;
	}
	
	.text>>>span {
		font-size: 0.2rem!important;
	}
	
	.text>>>img {
		width: 100%;
	}
	
	.nav-bottom {
		background: #fff;
		overflow: hidden;
		padding-bottom: 0.4rem;
	}
	
	.nav-bottom p {
		height: 0.93rem;
		line-height: 0.93rem;
		font-size: 0.26rem;
		color: #3F3F4E;
		padding-left: 0.24rem;
	}
	
	.nav-bottom-detail {
		overflow: hidden;
		padding: 0 0.24rem;
		position: relative;
		margin-bottom: 0.1rem;
	}
	
	.detail-left {
		width: 2.13rem;
		height: 1.6rem;
		float: left;
	}
	
	.detail-left img {
		width: 2.13rem;
		height: 1.6rem;
	}
	
	.detail-right {
		float: left;
		flex: 1;
		margin-left: 0.3rem;
	}
	
	.detail-right ul {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.detail-right .li1 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		font-size: 0.24rem;
		line-height: 0.32rem;
		margin-bottom: 0.07rem;
	}
	
	.detail-right .li2 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: break-word;
		font-size: 0.2rem;
		line-height: 0.34rem;
	}
	
	.footer {
		line-height: 0.8rem;
		font-size: 0.24rem;
		text-align: center;
		border-top: 2px solid #eee;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	
	.footer ul {
		width: 100%;
	}
	
	.footer li {
		float: left;
		width: 50%;
	}
	
	.footer .footer-li1 {
		background: #fff;
		color: #3F3F4E;
	}
	
	.footer .footer-li2 {
		background: #ff651d;
		color: #fff;
	}
</style>