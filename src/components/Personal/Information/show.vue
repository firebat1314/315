<template>
	<div class="show">
		<my-header title="展示信息" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<div class="bodytop">
				<router-link :to="{ path: 'upload', query: { title: '图片展示' }}">
					<div class="list">
						<span class="sp1">图片展示</span>
						<span class="backright"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'showvideo', query: { title: '视频展示' }}">
					<div class="list bb0">
						<span class="sp1">视频展示</span>
						<span class="backright"></span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	var expireDays = 1000 * 60 * 60;
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.show{background: #F4F4F4;}
	.body{margin-top: 0.2rem;}
	.bodytop{background: #FFFFFF;}
	.bb0{border-bottom: 0!important;}
	.list {
		border-bottom:1px solid #ebebeb;
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
	/*.footer {
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
	}*/
</style>