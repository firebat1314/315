<template>
	<div class="dwxz">
		<my-header title="主营行业" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="dwxz-list">
			<ul>
				<label v-for="list in listData">
					<li>
						<div class="nav-right">
							<p class="li4">
								<label>
									<input type="checkbox" ref="check" :value="list.catid"><b></b>
								</label>
							</p>
						</div>
						<span>{{list.catname}}</span>
					</li>
				</label>
			</ul>
		</div>
		<div class="tishi">可以多选哦</div>
		<div class="footer">
			<input type="button" value="确定" style="color: #fff;" @click="setData()" />
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import {setCookie,getCookie} from '../../../assets/js/cookie.js'
	import {getOpenUrl,getToken} from '../../../assets/js/common.js'
	var expireDays = 1000 * 60 * 60;
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				listData: [],
				tips: '',
				popupVisible: false
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			setData() {
				var check = this.$refs.check
				var data = []
				for(var i = 0; i < check.length; i++) {
					if(check[i].checked) {
						data.push(check[i].value)
					}
				}
				setCookie("data",data, expireDays);
				this.$router.back(-1)
				return
				this.catid = data.toString()
				this.$http.post(getOpenUrl() + 'companytype', {
					catid: this.catid
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					if(res.body.code == 0) {
						this.tips = "修改成功";
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
							this.$router.back(-1)
						}, 1500)
					} else {
						this.tips = res.body.error_description;
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
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
			},
			getData() {
				this.$http.get(getOpenUrl() + 'companytype', {

					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.listData = res.body.data.type
					this.$mount(this.$refs)
					var check = this.$refs.check
					var id=getCookie("data").split(',')
					for(var i = 0; i < check.length; i++) {
						if(id.indexOf(check[i].value)>-1) {
							check[i].checked=true
						}
						console.log(id,check[i].value)
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
			},
			submit(){
				
			}
		}
	}
</script>

<style scoped>
	.dwxz {
		background: #f4f4f4;
	}
	
	.dwxz-list {
		margin-top: 0.22rem;
	}
	
	.dwxz-list ul li a {
		color: #3f3f4e;
		display: block;
	}
	
	.dwxz-list ul li {
		font-size: 0.2rem;
		color: #3f3f4e;
		line-height: 0.76rem;
		background: #fff;
		padding-left: 0.24rem;
		margin-bottom: 0.07rem;
	}
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
	
	.li4 label {
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
	
	input[type="checkbox"] {
		display: none;
		position: absolute;
	}
	
	input[type="checkbox"]+b {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		width: 0.26rem;
		height: 0.26rem;
		border-radius: 50%;
		background: #e5e5e5;
		vertical-align: middle;
	}
	
	input[type="checkbox"]:checked+b {
		background: url(../../../../static/images/personal/personalicon/checkbox.png)no-repeat;
		background-size: 0.26rem 0.26rem;
		border: none;
	}
	
	.tishi {
		color: #9999a1;
		font-size: 0.2rem;
		text-align: center;
		line-height: 0.7rem;
	}
	
	.footer {
		width: 5.57rem;
		height: 0.73rem;
		border-radius: 0.05rem;
		text-align: center;
		font-size: 0.22rem;
		line-height: 0.73rem;
		margin: 0 auto;
		background: #ff7d1d;
		position: relative;
	}
	
	.footer input[type="button"] {
		width: 100%;
		height: 100%;
	}
</style>