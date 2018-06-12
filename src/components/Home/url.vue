<template>
	<div class="finddetail">
		<my-header title="解决方案" style="background: #f0f2f5;"></my-header>
		<div class="right" @click="down"></div>
		<ul v-show="show" class="tanchu">
			<li style="border-bottom: 1px solid #f4f4f4;">鉴材公告</li>
			<li>分享</li>
		</ul>
		<div style="padding-top: 1.28rem;">
			<div class="navall">
				<div class="nav">
					<div style="padding-bottom: 0.17rem;border-bottom: 1px solid #eee;">
						<p class="sign">{{listData.title}}</p>
					</div>
					<div class="content">
						<p style="font-size: 0.2rem;" v-html="listData.content"></p>
					</div>
				</div>
				<div class="articles">
					<div class="nav1">
						<div class="nav1-top">
							<div class="line"></div>
							<p class="nav1-p1">相关文章</p>
							<div class="r"></div>
						</div>
					</div>
					<div class="nav-list">
						<ul v-for="(list,index) in listData1">
							<li class="jt" @click="getData(list.catid, list.id)">{{list.title}}</li>
							<li class="jt1"></li>
						</ul>
					</div>
				</div>
				<div class="commentaries">
					<div class="nav1">
						<div class="nav1-top">
							<div class="line"></div>
							<p class="nav1-p1">评论</p>
							<div class="r"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="pinglun-button" @click="goPinglun" style="color:#000;">
				我也评论
			</div>
			<div class="pingjia">
				<div class="pingjia-box" v-for="(pl,index) in commentData" :key="index">
					<div class="pingjia-item">
						<div class="logoItem">
							<img class="item-logo" v-lazy="pl.avatar">
							<span>{{pl.name}}</span>
							<div class="pingjia-icon" v-if="pl.direction==3">
								<img class="pj-icon" src="../../../static/images/chanpin/gantan.png">
								<i>不好说</i>
							</div>
							<div class="pingjia-icon" v-if="pl.direction==1">
								<img class="pj-icon" src="../../../static/images/chanpin/zan.png">
								<i>支持</i>
							</div>
							<div class="pingjia-icon" v-if="pl.direction==2">
								<img class="pj-icon" src="../../../static/images/chanpin/noZan.png">
								<i>不支持</i>
							</div>
							<div style="clear:both"></div>
						</div>
						<div class="pingjia-content" v-html="pl.content"></div>
						<div class="pingjia-time">{{pl.dateline}}</div>
					</div>
				</div>
			</div>
			<router-link :to="{path:'/fa_more_message',query:{id:this.id,catid:this.catid}}">
				<div class="more-first-info jiazai" v-if="commentData.length>0">加载更多评论</div>
			</router-link>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from '../../assets/js/common.js';
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				show: false,
				loading: false,
				popupVisible: false,
				tips: '',
				listData: [],
				listData1: [],
				commentData: [],
				id: this.$route.query.id,
				catid: this.$route.query.catid
			};
		},

		mounted() {
			//			let catid = this.$route.query.catid;
			//			let id = this.$route.query.id;
			this.getData(this.catid, this.id)
		},
		methods: {
			down() {
				this.show = !this.show
			},
			goPinglun() {
				this.$router.push({
					path: '/fa_message',
					query: {
						id: this.id,
						catid: this.catid
					}
				});
			},
			getData(catid, id) {
				this.loading = true
				window.scrollTo(0, 0)
				this.$http.get(getOpenUrl() + 'solution_Datas', {
						params: {
							catid: catid,
							id: id,
							page: 1,
							int_size: 8
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.loading = false
						if(res.body.code == 0) {
							this.listData = res.body.data
							this.listData1 = res.body.data.arr_xgfa_data
							this.commentData = res.body.data.comment_list
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
	.finddetail {
		overflow-y: scroll;
	}
	
	.header {
		position: fixed;
		top: 0;
		width: 100%;
	}
	
	.right {
		width: 0.3rem;
		height: 0.88rem;
		position: absolute;
		top: 0;
		right: 0.24rem;
		background: url(../../../static/images/dian3.png) no-repeat 0 50%;
		background-size: 0.3rem 0.07rem;
	}
	
	.tanchu {
		position: absolute;
		right: 0.2rem;
		font-size: 0.26rem;
		background: #fff;
		line-height: 0.75rem;
		text-align: center;
		box-shadow: 0 2px 5px #C2C2C2;
		padding: 0 0.4rem;
	}
	
	.tanchu:before {
		content: "";
		position: absolute;
		right: 0.2rem;
		top: -0.1rem;
		display: block;
		width: 0.2rem;
		height: 0.2rem;
		background: #fff;
		box-shadow: 0 2px 5px #C2C2C2;
		transform: rotate(45deg);
	}
	
	.tanchu:after {
		content: "";
		position: absolute;
		right: 0.1rem;
		top: 0;
		display: block;
		width: 0.4rem;
		height: 0.2rem;
		background: #fff;
	}
	
	.navall {
		padding: 0 0.24rem;
		margin-bottom: 0.35rem;
		margin-top: 0.3rem;
		border-bottom: 1px solid #eee;
	}
	
	.nav .sign {
		font-size: 0.26rem;
		/*line-height: 0.7rem;*/
		color: #3F3F4E;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.content {
		border-bottom: 1px solid #eee;
		padding: 0.24rem 0;
		margin-bottom: 0.18rem;
	}
	
	.content>>>img {
		width: 100%!important;
		height: auto!important;
	}
	
	.nav1-top {
		position: relative;
	}
	
	.nav1-p1 {
		font-size: 0.2rem;
		line-height: 0.76rem;
		text-align: center;
	}
	
	.line {
		width: calc(100% - 3.7rem);
		height: 2px;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		background: #eee;
	}
	
	.r {
		width: calc(100% - 3.7rem);
		height: 2px;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background: #eee;
	}
	
	.nav-list ul {
		margin-bottom: 0.18rem;
		width: calc(100% - 0.24rem);
		overflow: hidden;
		padding-left: 0.24rem;
		background-color: #f1f1f1;
	}
	
	.nav-list ul li {
		float: left;
	}
	
	.nav-list .jt {
		width: calc(100% - 0.24rem);
		height: 0.7rem;
		line-height: 0.7rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 0.2rem;
		color: #797979;
	}
	
	.nav-list .jt1 {
		width: 0.11rem;
		height: 0.7rem;
		background: url(../../../static/images/personal/personalicon/backright.png) no-repeat 0 50%;
		background-size: 0.11rem 0.22rem;
	}
	
	.nav1-bottom {
		margin-bottom: 0.35rem;
		overflow: hidden;
	}
	
	.nav1-bottom ul li {
		line-height: 0.58rem;
		font-size: 0.22rem;
		color: #3F3F4E;
		float: left;
	}
	
	.nav1-bottom .li1 {
		margin-right: 0.93rem;
	}
	
	.nav1-bottom .li2 {
		color: #3F3F4E;
		border: 1px solid #eee;
		line-height: 0.48rem;
		margin: 0.05rem 0;
		border-radius: 0.24rem;
		width: 1.08rem;
		text-align: center;
		margin-right: 0.2rem;
	}
	
	.nav1-bottom .li2:hover {
		border-color: #ff6821;
		color: #FF6821;
	}
	
	.say {
		margin: 0 0.24rem;
		border-bottom: 1px solid #eee;
		overflow: hidden;
	}
	
	.say textarea {
		height: 1.2rem;
		width: 100%;
		padding-top: 0.2rem;
		font-size: 0.2rem;
		color: #898991;
	}
	
	.say .p1 {
		font-size: 0.2rem;
		color: #898991;
		border-left: 2px solid #FC8209;
		padding-left: 0.07rem;
		line-height: 0.24rem;
	}
	
	.say .p2 {
		font-size: 0.2rem;
		color: #c1c1c5;
		line-height: 0.55rem;
		float: right;
	}
	
	.poll {
		height: 1.4rem;
		border-left: 1px solid #d2d2d2;
		margin: 0.33rem 0 0.15rem 0.24rem;
	}
	
	.poll ul {
		overflow: hidden;
		float: left;
		width: 5rem;
		margin: 0.11rem 0;
	}
	
	.poll ul li {
		float: left;
		line-height: 0.25rem;
		height: 0.25rem;
		color: #656571;
		font-size: 0.18rem;
	}
	
	.poll .ul1 .li1 {
		background: #ffc002;
		width: 3rem;
	}
	
	.poll .ul2 .li1 {
		background: #06a3f6;
		width: 3rem;
	}
	
	.poll .ul3 .li1 {
		background: #abed0a;
		width: 3rem;
	}
	
	.poll .li2 {
		margin-left: 0.2rem;
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
	
	.appraisebottom-top .p3 {
		color: #ff651d;
		font-size: 0.16rem;
		line-height: 0.56rem;
		float: right;
		padding-left: 0.3rem;
	}
	
	.appraisebottom-top .fd {
		background: url(../../../static/images/bzc.png) no-repeat 0 50%;
		background-size: auto 0.2rem;
	}
	
	.appraisebottom-top .zc {
		background: url(../../../static/images/zc.png) no-repeat 0 50%;
		background-size: auto 0.2rem;
	}
	
	.appraisebottom-top .bhs {
		background: url(../../../static/images/bhs.png) no-repeat 0 50%;
		background-size: auto 0.2rem;
	}
	
	.appraisebottom-bottom {
		margin-top: 0.11rem;
	}
	
	.appraisebottom-bottom .p2 {
		font-size: 0.2rem;
		color: #656571;
		line-height: 0.34rem;
	}
	
	.appraisebottom-bottom .p4 {
		font-size: 0.14rem;
		color: #b0b0b4;
		line-height: 0.34rem;
	}
	
	.bili-box {
		position: relative;
		height: 1.4rem;
		margin: 0.3rem 0.24rem;
		border-left: 1px solid #ccc;
	}
	
	.pingjia-time {
		height: 0.6rem;
		line-height: 0.6rem;
		color: #9f9fa6;
		font-size: 0.2rem;
		text-align: left;
	}
	
	.pingjia-icon {
		float: right;
	}
	
	.pingjia-icon i {
		font-size: 0.16rem;
		color: #ff651d;
		float: left;
		font-style: normal;
	}
	
	.pingjia-icon .pj-icon {
		width: 0.26rem;
		height: 0.24rem;
		display: block;
		float: left;
		margin-top: 0.17rem;
		margin-right: 0.1rem;
		object-fit: cover;
	}
	
	.pinglun-button {
		width: 2.1rem;
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
		border-radius: 0.15rem;
		border: 1px solid #ccc;
		margin: 0 auto;
		font-size: 0.2rem;
		margin-bottom: 0.1rem;
	}
	
	.pingjia-button {
		height: 0.9rem;
		padding-left: 0.2rem;
	}
	
	.pingjia-button-left {
		width: 2.8rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border: 1px solid #ccc;
		text-align: center;
		font-size: 0.22rem;
		border-radius: 0.05rem;
		float: left;
		margin-right: 0.15rem;
	}
	
	.pingjia .pingjia-box {
		border-bottom: 1px solid #eee;
	}
	
	.pingjia .pingjia-box:last-child {
		border-bottom: none;
	}
	
	.pingjia-content {
		color: #656571;
		font-size: 0.2rem;
		line-height: 0.32rem;
	}
	
	.pingjia-item {
		margin: 0.26rem 0.3rem 0.3rem;
	}
	
	.logoItem span {
		font-size: 0.24rem;
		display: block;
		float: left;
		margin-left: 0.2rem;
	}
	
	.logoItem .item-logo {
		width: 0.57rem;
		height: 0.57rem;
		border-radius: 50%;
		background: #ee8a46;
		float: left;
	}
	
	.logoItem {
		height: 0.6rem;
		line-height: 0.6rem;
	}
	
	.pingjia-header-right {
		float: right;
	}
	
	.pingjia-header-left {
		float: left;
	}
	
	.pingjia-header {
		height: 0.7rem;
		line-height: 0.7rem;
		border-bottom: 1px solid #eee;
		padding-left: 0.3rem;
		padding-right: 0.6rem;
		font-size: 0.2rem;
	}
	
	.more-first-info {
		height: 0.75rem;
		line-height: 0.75rem;
		color: #ff651d;
		text-align: center;
		border-top: 1px solid #eee;
		font-size: 0.2rem;
		background: url(../../../static/images/chanpin/yellowRight.png) no-repeat 68% 45%;
		background-size: 0.2rem;
	}
	
	.more-first-info .jiazai {
		background: url(../../../static/images/chanpin/yellowRight.png) no-repeat 62% 45%;
		background-size: 0.2rem;
	}
</style>