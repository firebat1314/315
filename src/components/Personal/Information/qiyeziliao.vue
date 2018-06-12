<template>
	<div class="qyzl">
		<my-header title="企业资料" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<div class="bodytop">
				<router-link :to="{ path: 'zlupload', query: { zltitle: '企业资料上传' }}">
					<div class="list">
						<span class="sp1">企业资料</span>
						<span class="backright"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'zlupload', query: { zltitle: '产品资料上传' }}">
					<div class="list bb0">
						<span class="sp1">产品资料</span>
						<span class="backright"></span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	export default {
		data() {
			return {
				data: {}
			}
		},
		mounted() {

		},
		methods: {
			setDate() {
				this.$calendar.show({
					onOk: (date) => {
						this.$refs.time.innerHTML = date;
					}
				});

			},
		},
		activated() {
			//路由缓存 前进后退
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.qyzl{background: #F4F4F4;}
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
</style>