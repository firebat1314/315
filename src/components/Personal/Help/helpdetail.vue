<template>
	<div class="help">
		<my-header :title="title" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div style="margin-top: 1.38rem;">
			<div class="body bt" v-for="(data, index) in listData">
				<ul>
					<li class="li1">{{data.title}}</li>
					<li class="li2" v-bind:class="{'auto' : data.active}" v-html="data.content">{{data.content}}</li>
				</ul>
				<div class="more" v-bind:class="{'sq' : data.active, 'zk': !data.active}" @click="toggle(data, index)">{{data.dtext}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { getOpenUrl, getToken } from '../../../assets/js/common.js';
	export default {
		data() {
			return {
				title: '',
				listData: {},
			}
		},
		mounted() {
			this.catid  = this.$route.query.catid;
			this.getData(this.catid);
			this.title  = this.$route.query.title;

			$('.more').click(function(){
				if ($(this).hasClass('zk')){
					$(this).addClass('sq').removeClass('zk');
				}else{
					$(this).addClass('zk').removeClass('sq');
				}
			});
		},
		methods: {
			getData(catid, page){
				this.$http.get(getOpenUrl() + 'help',{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					params: {
						catid: catid,
						page: page
					}
				}).then((res) => {
					let data = [];
					res.body.data.forEach((item) => {
						item.active = false;
						item.dtext  = '展开';
						data.push(item);
					});
					this.listData = data;
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
			},
			toggle(item, index){
				let data = [];
				this.listData.map(function (item, key) {
					if (key == index){
						item.active = !item.active;
						item.dtext  = item.active ? '收起' : '展开';
					}else{
						item.active = false;
						item.dtext  = '展开';
					}
				});
			}
		},
		activated() {
			//路由缓存 前进后退
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.help{background: #f4f4f4;overflow-y: scroll}
	.help>>>.header{position: fixed;width: 100%;}
	.body{background: #fff;}
	.body ul{padding: 0.1rem 0;border-bottom: 1px solid #f4f4f4;margin: 0 0.24rem;}
	.li1{font-size: 0.24rem;color: #33333e;line-height: 0.62rem;}
	.li2{font-size: 0.22rem;color: #4d4d5b;line-height: 0.42rem; height:2.1rem; overflow:hidden;}
	.li2.auto{height:auto}
	.more{font-size: 0.22rem;line-height: 0.68rem;text-align: center;height: 0.68rem;color: #fc8209;}
	.bt{margin-bottom: 0.1rem;}
	.zk{background: url(../../../../static/images/personal/personalicon/zhankai.png) no-repeat 56% 50%;background-size: 0.2rem 0.1rem;}
	.sq{background: url(../../../../static/images/personal/personalicon/shouqi.png) no-repeat 56% 50%;background-size: 0.2rem 0.1rem;}
</style>