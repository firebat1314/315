<template>
	<div class="grjj">
		<my-header :title="this.$route.query.zltitle" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="right" @click="down">编辑</div>
		<ul v-show="show" class="tanchu">
			<li style="border-bottom: 1px solid #f4f4f4;">删除资料</li>
			<li>下载资料</li>
		</ul>
		<div class="body">
			<div style="background: #fff;font-size: 0.22rem;padding-left: 0.24rem;line-height: 0.8rem;">{{this.$route.query.zltitle}}</div>
			<div class="upload">
				<img src="../../../../static/images/personal/upload.png" />
				<span>仅允许上传压缩包</span>
			</div>
			<ul style="overflow: hidden;margin-top: 0.72rem;">
				<li style="background: #48da21;float: left;margin-left: 0.94rem;">下载上传说明</li>
				<li style="background: #209ee7;float: right;margin-right: 0.94rem;">重新上传</li>
			</ul>
			<div class="bottom1">确定</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			};
		},
		methods: {
			down() {
				this.show = !this.show
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.grjj {
		background: #f4f4f4;
	}
	
	.body {
		width: 100%;
		overflow: hidden;
		margin-top: 0.2rem;
	}
	
	.right {
		height: 0.88rem;
		line-height: 0.88rem;
		position: absolute;
		top: 0;
		right: 0.24rem;
		font-size: 0.26rem;
		color: #3F3F4E;
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
		/*width: 0;
		height: 0;
		border-right: .1rem solid transparent;
		border-bottom: .15rem solid #000;
		border-left: .1rem solid transparent;*/
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
		/*width: 0;
		height: 0;
		border-right: .1rem solid transparent;
		border-bottom: .15rem solid #000;
		border-left: .1rem solid transparent;*/
		width: 0.4rem;
		height: 0.2rem;
		background: #fff;
		
	}
	/*.setting2 .sl{width:0.99rem;height:1.14rem;float:left;background:url(../../../images/qzjs.png) no-repeat 50% 50%;background-size:0.36rem 0.34rem;}*/
	
	.body .sr {
		width: calc(100% - 0.99rem);
		;
		height: 1.14rem;
		float: right;
	}
	
	.body .bt0 {
		border-bottom: 0;
	}
	
	.body .sr-ul {
		width: 4.85rem;
		overflow: hidden;
		float: left;
	}
	
	.body .sr-ul-li1 {
		font-size: 0.22rem;
		color: #1a1a1a;
		margin-top: 0.23rem;
		line-height: 0.37rem;
	}
	
	.body .sr-ul-li2 {
		font-size: 0.20rem;
		color: #adadad;
		line-height: 0.36rem;
	}
	
	.upload {
		height: 1.14rem;
		background: #fff;
	}
	
	.upload img {
		padding-top: 0.14rem;
		margin-left: 0.24rem;
		width: 0.86rem;
		height: 0.86rem;
		float: left;
	}
	
	.upload span {
		font-size: 0.2rem;
		color: #3f3f4e;
		margin-left: 0.1rem;
		margin-top: 0.78rem;
		float: left;
	}
	
	.body ul li {
		font-size: 0.22rem;
		color: #fff;
		line-height: 0.58rem;
		width: 1.96rem;
		text-align: center;
	}
	
	.bottom {
		width: 1.36rem;
		height: 0.54rem;
		border-radius: 0.27rem;
		background: #ff7d1d;
		font-size: 0.2rem;
		line-height: 0.54rem;
		text-align: center;
		color: #fff;
		float: right;
		margin: 0.3rem 0.6rem 0 0;
	}
	
	.bottom1 {
		width: 5.57rem;
		height: 0.73rem;
		border-radius: 0.05rem;
		text-align: center;
		font-size: 0.22rem;
		line-height: 0.73rem;
		margin: 0 auto;
		background: #ff7d1d;
		margin-top: 0.38rem;
		color: #fff;
	}
</style>