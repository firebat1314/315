<template>
	<div class="zl">
		<my-header title="个人资料" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<div class="bodytop">
				<div class="list" style="position: relative;">
					<span class="sp1 lh1">头像：</span>
					<span class="r">
						<input style="z-index:111;opacity:0;width: 0.8rem;height: 0.8rem;border-radius: 50%;display: block;position: absolute;top: 50%;right: 0.4rem;transform: translateY(-50%);" type="file"  accept="image/*" @change="onchange">
						<img id="logo" v-lazy="this.detailData.avatar"/>
					</span>
				</div>
				<div class="list">
					<span class="sp1">用户名：</span>
					<span class="r">{{this.detailData.username}}</span>
				</div>
				<router-link :to="{ path: 'text', query: { title: '昵称' ,value:this.detailData.nickname}}">
					<div class="list">
						<span class="sp1">昵称：</span>
						<span class="backright"></span>
						<span class="r mr">{{this.detailData.nickname}}</span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '真实姓名' ,value:this.detailData.realname}}">
					<div class="list">
						<span class="sp1">真实姓名：</span>
						<span class="backright"></span>
						<span class="r mr">{{this.detailData.realname}}</span>
					</div>
				</router-link>
				<router-link :to="{ path: 'sex', query: { title: '性别' ,value:this.detailData.gender}}">
					<div class="list">
						<span class="sp1">性别：</span>
						<span class="backright"></span>
						<span class="r mr" v-text="this.detailData.gender==1?'男':this.detailData.gender==2?'女':''"></span>
					</div>
				</router-link>
				<div class="list" @click="setDate">
					<span class="sp1">生日：</span>
					<span class="backright"></span>
					<span class="r mr" ref="time">{{this.detailData.birthdays}}</span>
				</div>
				<router-link :to="{ path: 'text', query: { title: '电话' ,value:this.detailData.mobile}}">
					<div class="list bb0">
						<span class="sp1">电话</span>
						<span class="backright"></span>
						<span class="r mr">{{this.detailData.mobile}}</span>
					</div>
				</router-link>
			</div>
			<div class="bodybottom">
				<router-link :to="{ path: 'Dz', query: { title: '联系地址' ,value:this.detailData.provinces+' '+this.detailData.citys+' '+this.detailData.districts}}">
					<div class="list">
						<span class="sp1">联系地址</span>
						<span class="backright"></span>
						<span class="r mr">{{this.detailData.provinces}} {{this.detailData.citys}} {{this.detailData.districts}}</span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '详细地址' ,value:this.detailData.address}}">
					<div class="list">
						<span class="sp1">详细地址</span>
						<span class="backright"></span>
						<span class="r mr">{{this.detailData.address}}</span>
					</div>
				</router-link>
				<router-link :to="{ path: 'grjj',query: {value:this.detailData.profile}}">
					<div class="list">
						<span class="sp1">个人简介</span>
						<span class="backright"></span>
						<span class="r mr">{{this.detailData.profile}}</span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '单位名称' ,value:this.detailData.companyname}}">
					<div class="list">
						<span class="sp1">单位名称</span>
						<span class="backright"></span>
						<span class="r mr">{{this.detailData.companyname}}</span>
					</div>
				</router-link>
				<router-link :to="{ path: 'dwxz', query: { value:this.detailData.companytype}}">
					<div class="list">
						<span class="sp1">单位性质</span>
						<span class="backright"></span>
						<span class="r mr">{{this.detailData.companytype}}</span>
					</div>
				</router-link>
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>
<script>
	import lrz from 'lrz'
	import { getOpenUrl, getToken, insertHtmlAtCaret } from '../../../assets/js/common.js'
	import Calendar from 'vue2-datepick';
	Vue.use(Calendar)
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				data: {},
				detailData: [],
				tips: '',
				popupVisible: false,
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			//上传logo
			onchange(e) {
				if(!e) {
					return;
				}
				var reader = new FileReader();
				//获取文件
				var file = e['target']['files'][0];
				var imageType = /^image\//;
				//是否是图片
				if(!imageType.test(file['type'])) {
					this.tips = '请选择图片';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1000)
					return;
				}
				//读取完成
				reader.onload = (e) => {
					//获取图片dom
					var img = document.getElementById("logo");
					var img_ava = e.target['result'];
					img.src = img_ava;
					this.imgBase = img_ava;
					let self = this;
					lrz(file, {
						width: 200
					}).then((rst) => {
						this.detailData.avatar = rst.base64
						self.$http.post(getOpenUrl() + "Upload", {
							logo: rst.base64,
							type: 'avatar',
							category: 'images'
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}
						}).then((res) => {
							var data = res.body.data;
							this.thumb = data.path
							if(res.body.code == '0000') {
								this.show = true
								this.tips = "上传成功";
								this.popupVisible = true
								setTimeout(() => {
									this.popupVisible = false
									this.avatarData()
								}, 1000)
							} else {
								this.tips = res.body.error_description;
								this.popupVisible = true
								setTimeout(() => {
									this.popupVisible = false
								}, 1000)
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
									android.change1()
									this.popupVisible = false
								}, 1500)
							}
						})
						return rst;
					}).always(function() {
						// 清空文件上传控件的值
						e.target.value = null;
					});

				};
				reader.readAsDataURL(file);
			},
			setDate() {
				this.$calendar.show({
					onOk: (date) => {
						this.$refs.time.innerText = date;
						this.birData()
					}
				});
			},
			birData() {
				//				var start = new Date(this.$refs.time.innerText).getTime().toString().substr(0,10);
				var start = Date.parse(new Date(this.$refs.time.innerText))
				this.$http.post(getOpenUrl() + 'userDataEdit', {
						birthdays: this.$refs.time.innerText
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
			getData() {
				this.$http.get(getOpenUrl() + 'userData', {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.detailData = res.body.data
						if(this.detailData.provinces == null) {
							this.detailData.provinces = ''
						}
						if(this.detailData.citys == null) {
							this.detailData.citys = ''
						}
						if(this.detailData.districts == null) {
							this.detailData.districts = ''
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
			avatarData() {
				this.$http.post(getOpenUrl() + 'userDataEdit', {
						avatar: this.thumb
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.zl {
		background: #F4F4F4;
		height: auto;
	}
	
	.zl>>>.header {
		position: fixed;
		width: 100%;
	}
	
	.body {
		margin-top: 1.48rem;
	}
	
	.bodytop {
		margin-bottom: 0.14rem;
		background: #FFFFFF;
	}
	
	.bodybottom {
		background: #FFFFFF;
	}
	
	.bb0 {
		border-bottom: 0!important;
	}
	
	.list {
		border-bottom: 1px solid #ebebeb;
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
		width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;
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
	
	.mr {
		padding-right: 0.28rem!important;
	}
	
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