<template>
	<div class="header">
		<a class="a1" href="javascript:history.back(-1);"></a>
		<span class="forget">{{title}}</span>
	</div>
</template>

<script>
	export default {
		name: 'my-header',
		props: {
			title: {
				type: String,
				default: ""
			}
		},
		methods:{
			
		}
	}
</script>
<style scoped>
	.header{height: 0.88rem;z-index: 99;padding-top: 0.4rem;}
	.header a{width: 0.17rem;height: 0.88rem;display: block;background: url(../../../static/images/leftback.png) no-repeat 0 50%;background-size: 0.17rem 0.32rem;float:left;margin-left: 0.24rem;}
	.forget{line-height:0.88rem;font-size:0.26rem;float: left;color: #3f3f4e;margin-left: 0.3rem;}
</style>