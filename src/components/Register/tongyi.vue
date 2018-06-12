<template>
	<div class="tongyi">
		<my-header title="鉴材用户协议"></my-header>
		<div class="xieyi" v-html="this.adData"></div>
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	export default {
		data() {
			return {
				adData:''
			}
		},
		mounted() {
			this.$http.get(getOpenUrl() + "ads",{
				params:{
					type:49
				},
				headers: {
					'Authorization': 'Bearer ' +  getToken()
				}
			}).then((res)=>{
				this.adData = res.body.data[0].ad_code
			});
		}
	}
</script>

<style scoped>
	.tongyi>>>.header{position: fixed;width: 100%;background: #fff;}
	.xieyi{
		font-size: 0.22rem;
		padding: 0 0.24rem;
		padding-top: 1.28rem;
	}
</style>