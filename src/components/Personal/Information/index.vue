<template>
	<div class="information">
		<my-header1 title="企业信息"></my-header1>
		<div class="body">
			<div class="bodytop">
				<a href="#/jiben">
					<div class="list">
						<span class="sp1">基本信息</span>
						<span class="backright"></span>
					</div>
				</a>
				<a href="#/show">
					<div class="list">
						<span class="sp1">展示信息</span>
						<span class="backright"></span>
					</div>
				</a>
				<a href="#/ppnews">
					<div class="list">
						<span class="sp1">品牌信息</span>
						<span class="backright"></span>
					</div>
				</a>
				<a href="#/info">
					<div class="list">
						<span class="sp1">联系信息</span>
						<span class="backright"></span>
					</div>
				</a>
				<a href="#/qyxw">
					<div class="list bb0">
						<span class="sp1">企业新闻</span>
						<span class="backright"></span>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			setDate() {
				this.$calendar.show({
					onOk: (date) => {
						this.$refs.time.innerHTML = date;
					}
				});

			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.information{background: #F4F4F4;}
	.body{margin-top: 0.6rem;position: relative;top: 0.88rem;}
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
	
	.r {
		line-height: 0.78rem;
		float: right;
		padding-right: 0.4rem;
		color: #787883;
	}
	
	.r img {
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		display: block;
		position: absolute;
		top: 50%;
		right: 0.4rem;
		transform: translateY(-50%);
	}
	.mr{padding-right: 0.28rem!important;}
	.lh1 {
		line-height: 1rem;
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