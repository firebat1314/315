<template>
	<div class="help">
		<my-header title="帮助中心" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<div class="bodytop">
				<a :href="'#/helpdetail?catid='+data.catid+'&title='+data.catname" v-for="(data, index) in listData">
					<div class="list">
						<span class="sp1">{{data.catname}}</span>
						<span class="backright"></span>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import { getOpenUrl, getToken } from '../../../assets/js/common.js';
	export default {
		data() {
			return {
				listData: {}
			}
		},
		mounted() {
			//获取帮助中心数据
			this.getData(59);
		},
		methods: {
			getData(catid){
				this.$http.get(getOpenUrl() + 'arr_category',{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					params: {
						catid: catid,
						source: 1
					}
				}).then((res) => {
					this.listData = res.body.data;
				},(error) => {
						if (error.status == 401){
							this.tips = "用户失效，请登录"
							this.popupVisible = true
							setTimeout(() => {
								clearInterval(this.timer);
								this.popupVisible = false
								this.$router.push({
									path: '/login'
								});
							}, 1500)
						}else{
							this.tips = "网络不稳定，页面丢失"
							this.popupVisible = true
						}
					})
			}
		},
		activated() {
			//路由缓存 前进后退
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.help {
		background: #F4F4F4;
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
</style>