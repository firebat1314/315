<template>
	<div class="sex">
		<my-header title="性别" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="sex-list">
			<ul>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="radio" ref="check1" name="sex"><b></b>
								</label>
							</p>
						</div>
						<span>男</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="radio" ref="check2" name="sex"><b></b>
								</label>
							</p>
						</div>
						<span>女</span>
					</li>
				</label>
			</ul>
			<div class="bottom1" @click="getData">确定</div>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import qs from 'qs'
	import {getOpenUrl,getToken} from '../../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data () {
             return {
             	popupVisible:false,
             	tips:'',
				detailData:[]
             };
         },
         
         mounted(){
         	if(this.$route.query.value==1){
     	 		this.$refs.check1.checked=true
     	 	}else if(this.$route.query.value==2){
     	 		this.$refs.check2.checked=true
     	 	}else{
     	 		this.$refs.check1.checked=false
     	 		this.$refs.check2.checked=false
     	 	}
         },
         methods: {
         	getData(){
         		if(this.$refs.check1.checked){
         	 		this.gender=1
         	 	}else if(this.$refs.check2.checked){
         	 		this.gender=2
         	 	}else{
         	 		this.gender=0
         	 	}
         		
				this.$http.post(getOpenUrl() + 'userDataEdit',{
					gender:this.gender
				},{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					if (res.body.code == 0) {
						this.tips = '修改成功';
						this.popupVisible=true
						setTimeout(()=> {
							this.popupVisible=false
							this.$router.back(-1)
						}, 1500)
					} else {
						this.tips = res.body.error_description||res.body.info;
						this.popupVisible=true
						setTimeout(()=> {
							this.popupVisible=false
						}, 1500)
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


<style scoped>
	.sex{background: #f4f4f4;}
	.sex-list{margin-top: 0.22rem;}
	.sex-list ul li a{color: #3f3f4e;display: block;}
	.sex-list ul li{font-size: 0.2rem;color: #3f3f4e;line-height: 0.76rem;background: #fff;padding-left: 0.24rem;margin-bottom: 0.07rem;}
	/*按钮样式*/
	.nav-right {
		width: 0.26rem;
		height: 0.76rem;
		margin-right: 0.38rem;
		float: left;
	}
	
	.nav-right .li4 {
		width: 0.26rem;
		height: 0.76rem;
		float: left;
		position: relative;
	}
	label.sex-rbox {
		border: 1px solid #c2c2c2;
		width: 0.24rem;
		height: 0.24rem;
		border-radius: 50%;
		display: block;
		position: relative;
		z-index: 10;
		top: 50%;
		transform: translateY(-50%);
	}
	
	input[type="radio"] {
		display: none;
		position: absolute;
	}
	
	input[type="radio"]+b {
		position: absolute;
		top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
		display: inline-block;
		width: 0.26rem;
		height: 0.26rem;
		border-radius: 50%;
		background: #e5e5e5;
		vertical-align: middle;
	}
	
	input[type="radio"]:checked+b {
		background: url(../../../../static/images/personal/personalicon/checkbox.png)no-repeat;
		background-size: 0.26rem 0.26rem;
		border: none;
	}
	.bottom1{width: 5.57rem;height: 0.73rem;border-radius: 0.05rem;text-align: center;font-size: 0.22rem;line-height: 0.73rem;margin: 0 auto;background: #ff7d1d;margin-top: 0.38rem;color: #fff;}
</style>