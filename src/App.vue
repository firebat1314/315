<template>
	<div id="app">
		<!--<transition :name="transitionName">-->
		<!--<navigation>-->
		<!--<router-view class="Router"></router-view>-->
		<!--</navigation>-->
		<!--</transition>-->
		<div v-if="netDown" style="width:100%;background:#ffeeee;position: fixed;padding-left: 0.2rem;padding-top: 0.4rem;z-index: 999;">
			<img src="../static/images/alert.png" style="padding-top: 0.3rem;width: 0.3rem;position: absolute;top:50%;transform: translateY(-50%);">
			<p style="font-size: 0.2rem;float:left;padding: 0.2rem 0.4rem;">网路连接不可用</p>
			<div style="clear: both;"></div>
		</div>
		<transition :name="transitionName">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive" class="Router"></router-view>
			</keep-alive>
		</transition>
		<my-footer></my-footer>
		<transition :name="transitionName">
			<router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
		</transition>
		<!--<my-footer></my-footer>-->
	</div>
</template>

<script>
	import Vue from 'vue'
	import Router from 'vue-router'
	export default {
		name: 'app',
		data() {
			return {
				netDown:false,
				transitionName: 'slide-right' // 默认动态路由变化为slide-right
			}
		},
		mounted() {
			document.addEventListener('online', () => {
				this.netDown = false;
				//      if (navigator.connection.type == Connection.WIFI) {
				//        this.$toast('已经切换到Wifi网络',{
				//          duration:'1500'
				//        })
				//      }else if (navigator.connection.type == Connection.CELL_4G) {
				//        this.$toast('当前使用4G网络',{
				//          duration:'1500'
				//        })
				//      }else if (navigator.connection.type == Connection.CELL_2G) {
				//        this.$toast('当前使用2G网络',{
				//          duration:'1500'
				//        })
				//      }else if (navigator.connection.type == Connection.CELL_3G) {
				//        this.$toast('当前使用3G网络',{
				//          duration:'1500'
				//        })
				//      }
			}, false)

			document.addEventListener('offline', () => {
				this.netDown = true;
				this.$toast('当前网络不可用,请检查你的网络设置', {
					duration: '1500'
				})
			}, false)
		},
		watch: {
			'$route' (to, from) {
				let keep = this.$route.meta.keepAlive
				//				console.log(this.$route.meta.keepAlive)
				//				let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
				//				//console.log(this.$router.isBack);
				//				if(isBack) {
				//					//console.log(1)
				//					this.$router.isBack = false;
				//					this.transitionName = 'slide-right'
				//				} else {
				//					//console.log(2)
				//					this.$router.isBack = true;
				//					this.transitionName = 'slide-left'
				//				}
				if(!keep) {
					//console.log(1)
					this.$router.isBack = false;
					this.transitionName = 'slide-right'
				} else {
					//console.log(2)
					this.$router.isBack = true;
					this.transitionName = 'slide-left'
				}
				//this.$router.isBack = true;
			}
		}
	}
</script>

<style>
	.Router {
		position: absolute;
		width: 100%;
		height: 100%;
		transition: all .3s ease;
		/*top: 40px;*/
		-webkit-overflow-scrolling: touch;
	}
	
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(100%, 0);
		transform: translate(100%, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-100%, 0);
		transform: translate(-100% 0);
	}
	
	.fade-enter-active,
	.fade-leave-active {
		opacity: 1;
		transition: opacity .3s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
</style>