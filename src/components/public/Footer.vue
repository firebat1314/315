<template>
	<div class="footer" :class="{footerHide:isHide}">
		<a href="#/find">
			<div class="search1">
				<div style="background: #fff;width: 1.2rem;height: 0.9rem;position: absolute;left: 50%;top: 0.24rem;transform: translateX(-50%);"></div>
				<dl>
					<dt><img src="../../../static/images/icon/search.png" style="width: 0.86rem;height: 0.86rem;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"/></dt>
					<dd></dd>
				</dl>
			</div>
		</a>
		<div>
			<a href="#/home">
				<dl class="index">
					<dt>
							<img v-if="shouye" src="../../../static/images/icon/shoyeorange.png" alt="">
							<img v-else src="../../../static/images/icon/shouye.png"/>
						</dt>
					<dd :class="shouye?'active':''">首页</dd>
				</dl>
			</a>
			<a href="#/class">
				<dl class="list">
					<dt>
							<img v-if="fenlei" src="../../../static/images/icon/fenleiorange.png" alt="">
							<img v-else src="../../../static/images/icon/fenlei.png"/>
						</dt>
					<dd :class="fenlei?'active':''">分类</dd>
				</dl>
			</a>
			<a href="#/personal">
				<dl class="mine" style="float: right;">
					<dt>
						<img v-if="mine" src="../../../static/images/icon/mineorange.png" alt="">
						<img v-else src="../../../static/images/icon/mine.png"/>
					</dt>
					<dd :class="mine?'active':''">我的</dd>
				</dl>
			</a>
			<a href="#/photo">
				<dl class="photo" style="float: right;">
					<dt>
							<img v-if="tuji" src="../../../static/images/icon/tujiorange.png" alt="">
							<img v-else src="../../../static/images/icon/tuji.png"/>
						</dt>
					<dd :class="tuji?'active':''">图集</dd>
				</dl>
			</a>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	var curindex = 0;
	export default {
		name: 'my-footer',
		data() {
			return {
				isHide: false,
				shouye: false,
				fenlei: false,
				tuji: false,
				mine: false,
				findbs: false,
				popupVisible: false,
				tips: ""
			}
		},
		methods: {
			getCurRooute() {
				this.shouye = false;
				this.fenlei = false;
				this.tuji = false;
				this.mine = false;
				switch(this.$route.path) {
					case '/home':
						this.findbs = false;
						this.shouye = true;
						break;
					case '/class':
						this.findbs = false;
						this.fenlei = true;
						break;
					case '/photo':
						this.findbs = false;
						this.tuji = true;
						break;
					case '/personal':
						this.findbs = false;
						this.mine = true;
						break;
				}

				if(this.$route.path == '/home' || this.$route.path == '/class' || this.$route.path == '/photo' || this.$route.path == '/personal' || this.$route.path == '/find') {
					this.isHide = true;
				} else {
					this.isHide = false;
				}
			}
		},
		mounted() {
			this.getCurRooute()
		},
		created() {

		},
		activated() {
			//路由缓存 前进后退

		},
		watch: {
			'$route' (to, from) {
				this.getCurRooute();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.footer.footerHide {
		display: block;
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0.97rem;
		border-top: 0.01rem solid #ebebeb;
		background: #fff;
		z-index: 10;
		box-shadow: 0px 0 5px #ccc;
		display: none;
	}
	
	.footer dl {
		width: 20%;
		float: left;
		margin-top: 0.15rem;
	}
	
	.footer dl dt img {
		width: 0.4rem;
		height: auto;
		margin: 0 auto;
	}
	
	.footer dl dd {
		font-size: 0.14rem;
		text-align: center;
		margin-top: 0.1rem;
		color: #3F3F4E;
	}
	
	.footer .active {
		color: #fc8209;
	}
	
	.search1 {
		width: 1rem!important;
		height: 1rem;
		background: #fff;
		position: absolute;
		left: 50%;
		bottom: 0.2rem;
		margin-top: 0!important;
		transform: translateX(-50%);
		border-radius: 50%;
		box-shadow: 0px -2px 9px #ccc;
	}
</style>