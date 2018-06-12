<template>
	<div class="grjj">
		<my-header title="视频展示" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<div class="bodytop">
				<router-link :to="{ path: 'upload', query: { title: '展示视频一', id:0}}">
					<div class="list">
						<span class="sp1">展示视频一</span>
						<span class="backright"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'upload', query: { title: '展示视频二', id:1}}">
					<div class="list bb0">
						<span class="sp1">展示视频二</span>
						<span class="backright"></span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl ,getToken,insertHtmlAtCaret} from '../../../assets/js/common.js'
	var expireDays = 1000 * 60 * 60;
	export default {
		data () {
			return {
				videoData:[],
				id1:'',
				id2:''
			};
		},
		methods: {
			setData(){
				this.$http.get(getOpenUrl() + 'setVideo', {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.videoData=res.body.data

					if(this.videoData != undefined){
						this.id1 = this.videoData[0].id
						this.id2 = this.videoData[1].id
					}
				}, (error) => {
							if(error.status == 401) {
								this.tips = "用户失效，请登录"
								this.popupVisible = true
								setTimeout(() => {
									this.loading = false
									this.popupVisible = false
									this.$router.push({
										path: '/login'
									});
								}, 1500)
							} else {
								this.tips = "网络不稳定，页面丢失"
								this.popupVisible = true
								setTimeout(() => {
									this.loading = false
									this.popupVisible = false
								}, 1500)
							}
						})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.grjj{background: #f4f4f4;}
	.right{height:0.88rem;line-height:0.88rem;position: absolute;top: 0;right: 0.24rem;font-size: 0.26rem;color: #3F3F4E;}
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