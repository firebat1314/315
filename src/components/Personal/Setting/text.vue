<template>
	<div class="grjj">
		<my-header :title="this.$route.query.title" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<ul class="sex-list" v-if="this.$route.query.title=='编辑部门类型'">
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="radio" ref="text" name="type" value="总部"><b></b>
								</label>
							</p>
						</div>
						<span>总部</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="radio" ref="text1" name="type" value="工厂"><b></b>
								</label>
							</p>
						</div>
						<span>工厂</span>
					</li>
				</label>
				<label>
					<li>
						<div class="nav-right">
							<p class="li4">
								<label class="sex-rbox">
									<input type="radio" ref="text2" name="type" value="销售"><b></b>
								</label>
							</p>
						</div>
						<span>销售</span>
					</li>
				</label>
			</ul>
			<input type="text" ref="text" @keyup.13="getData()" v-else />
			<div class="bottom1" @click="getData1" v-if="this.$route.query.v=='编辑'">确定</div>
			<div class="bottom1" @click="getData" v-else>确定</div>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import qs from 'qs'
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	var expireDays = 1000 * 60 * 60;
	export default {
		data() {
			return {
				popupVisible: false,
				tips: '',
				detailData: [],
				listData: []
			};
		},

		mounted() {
			if(this.$route.query.value) {
				this.$refs.text.value = this.$route.query.value
			} else {
				this.$refs.text.value = ''
			}
			if(this.$route.query.plus!='添加'){
				this.setData()
			}
			
		},
		methods: {
			getData() {
				if(this.$route.query.title == "昵称") {
					this.name = this.$refs.text.value
				}
				if(this.$route.query.title == "真实姓名") {
					this.realname = this.$refs.text.value
				}
				if(this.$route.query.title == "电话") {
					this.mobile = this.$refs.text.value
				}
				if(this.$route.query.title == "单位名称") {
					this.companyname = this.$refs.text.value
				}
				if(this.$route.query.title == "详细地址") {
					this.address = this.$refs.text.value
				}
				this.$http.post(getOpenUrl() + 'userDataEdit', {
						nickname: this.name,
						realname: this.realname,
						mobile: this.mobile,
						companyname: this.companyname,
						address: this.address
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
			},
			getData1() {
				if(this.$route.query.title == "编辑部门名称") {
					this.bjname = this.$refs.text.value;
					if (!this.bjname){
						this.tips = '名称不能为空';
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)

						return ;
					}
				}
				if(this.$route.query.title == "编辑部门类型") {
					if (this.$refs.text.checked){
						this.bjtype = '总部'
					}
					if (this.$refs.text1.checked){
						this.bjtype = '工厂'
					}
					if (this.$refs.text2.checked){
						this.bjtype = '销售'
					}

					if (!this.bjtype){
						this.tips = '请选择类型';
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
						return ;
					}
				}
				if(this.$route.query.title == "编辑联系人") {
					this.bjlink_name = this.$refs.text.value
					if (!this.bjlink_name){
						this.tips = '请填写联系人';
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
						return ;
					}
				}
				if(this.$route.query.title == "编辑电话") {
					this.bjlink_phone = this.$refs.text.value
					if (!this.bjlink_phone){
						this.tips = '请填写电话';
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
						return ;
					}
				}
				if(this.$route.query.title == "编辑邮编") {
					this.bjzipcode = this.$refs.text.value
					if (!this.bjzipcode){
						this.tips = '请填写邮编';
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
						return ;
					}
				}
				if(this.$route.query.title == "编辑邮箱") {
					this.bjlink_email = this.$refs.text.value
					if (!this.bjlink_email){
						this.tips = '请填写邮箱';
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
						return ;
					}
				}
				if(this.$route.query.title == "编辑网址链接") {
					this.bjweb_url = this.$refs.text.value
					if (!this.bjweb_url){
						this.tips = '请填写网址';
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
						return ;
					}
				}
				this.$http.post(getOpenUrl() + 'setContact', {
						name: this.bjname,
						type: this.bjtype,
						link_name: this.bjlink_name,
						link_phone: this.bjlink_phone,
						link_email: this.bjlink_email,
						zipcode: this.bjzipcode,
						web_url: this.bjweb_url,
						id:this.$route.query.id
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.tips = '修改成功';
							var data = res.body.data;
							this.popupVisible = true;
							if (data != undefined){
								setCookie("addressId",data.id, 1000 * 60 * 60);
							}
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
			},
			setData() {
				this.$http.get(getOpenUrl() + 'setContact', {
					params: {
						id:this.$route.query.id
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.listData = res.body.data[0]
					if(this.$route.query.title == "编辑部门名称") {
						this.bjname = this.$refs.text.value=this.listData.name 
					}
					if(this.$route.query.title == "编辑部门类型") {
						this.bjtype = this.listData.type
						if (this.bjtype == '总部'){
							 this.$refs.text.checked = true;
						}
						if (this.bjtype == '工厂'){
							 this.$refs.text1.checked = true;
						}
						if (this.bjtype == '销售'){
							 this.$refs.text2.checked = true;
						}
					}
					if(this.$route.query.title == "编辑联系人") {
						this.bjlink_name = this.$refs.text.value=this.listData.link_name 
					}
					if(this.$route.query.title == "编辑电话") {
						this.bjlink_phone = this.$refs.text.value=this.listData.link_phone 
					}
					if(this.$route.query.title == "编辑邮编") {
						this.bjzipcode = this.$refs.text.value=this.listData.zipcode 
					}
					if(this.$route.query.title == "编辑邮箱") {
						this.bjlink_email = this.$refs.text.value=this.listData.link_email 
					}
					if(this.$route.query.title == "编辑网址链接") {
						this.bjweb_url = this.$refs.text.value=this.listData.web_url 
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
	.grjj {
		background: #f4f4f4;
	}
	
	.body {
		width: 100%;
		overflow: hidden;
		margin-top: 0.2rem;
	}
	
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
	
	input {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		outline: none;
		border: 0;
		display: block;
		margin: 0 auto;
		background: #fff;
		padding-left: 0.1rem;
	}
	
	.bottom[type="text"] {
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

	.sex-list li a{color: #3f3f4e;display: block;}
	.sex-list li{font-size: 0.2rem;color: #3f3f4e;line-height: 0.76rem;background: #fff;padding-left: 0.24rem;margin-bottom: 0.07rem;}
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
</style>