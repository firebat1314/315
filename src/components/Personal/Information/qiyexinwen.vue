<template>
	<div class="qyxw">
		<my-header title="企业新闻" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<div class="bodytop">
				<router-link :to="{ path: 'newslist', query: { title: '企业新闻', type: 'company' }}">
					<div class="list">
						<span class="sp1">企业新闻</span>
						<span class="backright"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'newslist', query: { title: '产品新闻', type: 'product' }}">
					<div class="list bb0">
						<span class="sp1">产品新闻</span>
						<span class="backright"></span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.qyxw{background: #F4F4F4;overflow-y: scroll;}
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