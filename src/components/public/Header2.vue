<template>
	<div class="header">
		<a class="a1" href="javascript:history.back(-1);"></a>
		<div class="header-search">
			<router-link :to="{path:'/search', query:{type: type}}">
				<input type="text" placeholder="请输入关键字" />
			</router-link>
		</div>
		<a href="#/help" class="a2"></a>
	</div>
</template>

<script>
	export default {
		name: 'my-header2',
		props: {
			title: {
				type: String,
				default: "头部标题"
			},
			type: {
				type: String,
				default: ""
			}
		},
		methods: {
			
			//扫码
			scanCode() {
				cordova.plugins.barcodeScanner.scan(
					(result) => {
						alert("We got a barcode\n" +
							"Result: " + result.text + "\n" +
							"Format: " + result.format + "\n" +
							"Cancelled: " + result.cancelled);
					},
					(error) => {
						alert("Scanning failed: " + error);
					}
				)
			}
		}
	}
</script>

<style scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: calc(100% - 0.48rem);
		height: 0.88rem;
		z-index: 99;
		background: #f0f2f5;
		border-bottom: 1px solid #dcdcdc;
		padding: 0 0.24rem;
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
	
	.header-search {
		height: 0.58rem;
		width: calc(100% - 1.2rem);
		border-radius: 0.05rem;
		background: #fff;
		float: left;
		margin-left: 0.3rem;
		margin-top: 0.17rem;
	}
	
	.header-search input {
		display: block;
		font-size: 0.22rem;
		color: #7e7e7d;
		height: 0.58rem;
		line-height: 0.58rem;
		width: calc(100% - 0.47rem);
		background: url(../../../static/images/searchlogo.png) no-repeat 0.12rem 50%;
		background-size: 0.25rem;
		padding-left: 0.47rem;
	}
</style>