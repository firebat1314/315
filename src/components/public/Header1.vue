<template>
	<div class="header">
		<a class="a1" href="javascript:history.back(-1);"></a>
		<span class="forget">{{title}}</span>
		<a href="#/help" class="a2"></a>
	</div>
</template>

<script>
	export default {
		name: 'my-header1',
		props: {
			title: {
				type: String,
				default: "头部标题"
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.header {
		height: 0.88rem;
		background: #f0f2f5;
		border-bottom: 1px solid #dcdcdc;
		padding: 0 0.24rem;
		z-index: 99;
		position: fixed;
		top: 0;
		width: calc(100% - 0.48rem);
		padding-top: 0.4rem;
	}
	
	.header .a1 {
		width: 0.17rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/leftback.png) no-repeat 0 50%;
		background-size: 0.17rem 0.32rem;
		float: left;
	}
	
	.header .a2 {
		width: 0.42rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/personal/personalicon/message.png) no-repeat 0 50%;
		background-size: 0.42rem 0.36rem;
		float: right;
	}
	
	.forget {
		line-height: 0.88rem;
		font-size: 0.26rem;
		color: #3f3f4e;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>