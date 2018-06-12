<template>
	<div class="dwxz">
		<my-header title="单位性质" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="dwxz-list">
			<ul>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="checkbox" ref="check"><b></b>
								</label>
							</p>
						</div>
						<input type="hidden" ref="check" value="政府部门"><b></b>
						<span id="text">政府部门</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="checkbox" ref="check"><b></b>
								</label>
							</p>
						</div>
						<input type="hidden" ref="check" value="建设单位"><b></b>
						<span id="text">建设单位</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="checkbox" ref="check"><b></b>
								</label>
							</p>
						</div>
						<input type="hidden" ref="check" value="设计单位"><b></b>
						<span id="text">设计单位</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="checkbox" ref="check"><b></b>
								</label>
							</p>
						</div>
						<input type="hidden" ref="check" value="施工监理"><b></b>
						<span id="text">施工监理</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="checkbox" ref="check"><b></b>
								</label>
							</p>
						</div>
						<input type="hidden" ref="check" value="物业运维"><b></b>
						<span id="text">物业运维</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="checkbox" ref="check"><b></b>
								</label>
							</p>
						</div>
						<input type="hidden" ref="check" value="采购平台"><b></b>
						<span id="text">采购平台</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="checkbox" ref="check"><b></b>
								</label>
							</p>
						</div>
						<input type="hidden" ref="check" value="其他平台"><b></b>
						<span id="text">其他平台</span>
					</li>
				</label>
			</ul>
		</div>
		<div class="tishi">可以多选哦</div>
		<div class="footer">
			<input type="button" name="" id="" value="确定" style="color: #fff;" @click="getData" />
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible: false,
				tips: "",
				comData: []
			}
		},
		mounted() {
			this.comData = []
			var arr = this.$route.query.value.split(',');
			for(var j = 0; j < this.$route.query.value.length; j++) {
				for(var i = 0; i < $("input[type=hidden]").length; i++) {
					if($("input[type=hidden]")[i].defaultValue == arr[j]) {
						$("input[type=checkbox]")[i].checked = true
					}
				}
			}
		},
		methods: {
			getData() {
				this.comData = []
				for(var i = 0; i < $("input[type=checkbox]").length; i++) {
					console.log($("input[type=checkbox]")[i].checked)
					if($("input[type=checkbox]")[i].checked) {
						this.comData.push($("input[type=hidden]")[i].defaultValue)
					}
				}
				this.companytype = this.comData.toString()
				this.$http.post(getOpenUrl() + 'userDataEdit', {
						companytype: this.companytype
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.tips = '修改成功';
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false
								this.$router.back(-1)
							}, 1500)
						} else {
							this.tips = res.body.error_description || res.body.info;
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