<template>
	<div class="grjj">
		<my-header :title="this.$route.query.title" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>

		<div class="body">
			<div class="placeholder" id="editor" contenteditable="true" name="message" ref="message"></div>

			<div class="upload" v-if="this.$route.query.title == '展示视频一' || this.$route.query.title =='展示视频二'">
				<span class="simg">
					<input class="img" type="file" id="imgView" accept="video/mp4" capture="camcorder" @change="video">
				</span>
				<div class="fileurl" ref="fileurl"></div>
			</div>
			<div class="upload" v-else>
				<span class="simg">
					<input class="img" type="file" id="imgView" accept="image/*" capture="camera" @change="onchange">
				</span>
			</div>
			<div class="bottom1" @click="submit">确定</div>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import { getOpenUrl, getToken, insertHtmlAtCaret } from '../../../assets/js/common.js'
	import lrz from 'lrz'
	var expireDays = 1000 * 60 * 60;
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				dialogImageUrl: '',
				imgData: [],
				videoData: [],
				picData: [],
				videoData: [],
				popupVisible: false,
				tips: ''
			};
		},

		mounted() {
			if(this.$route.query.title == "组织机构代码") {
				$('.upload')[0].style.display = "none"
				this.$refs.message.innerHTML = getCookie("zzjgdm");
			}
			if(this.$route.query.title == "经营范围") {
				this.$refs.message.innerHTML = getCookie("jyfw");
			}
			if(this.$route.query.title == "企业资质") {
				this.$refs.message.innerHTML = getCookie("qyzz");
			}
			if(this.$route.query.title == "企业证书") {
				this.$refs.message.innerHTML = getCookie("qyzs");
			}
			if(this.$route.query.title == "企业简介") {
				this.$refs.message.innerHTML = getCookie("qyjj");
			}
			if(this.$route.query.title == "图片展示") {
				this.$refs.message.innerHTML = getCookie("picshow");
				this.setData()
			}
			if(this.$route.query.title == "展示视频一") {
				this.setData1()
			}
			if(this.$route.query.title == "展示视频二") {
				this.setData1()
			}
		},
		methods: {
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
					var img_ava = e.target['result'];
					this.imgBase = img_ava;
					let self = this;
					lrz(file, {
						width: 200
					}).then((rst) => {
						self.$http.post(getOpenUrl() + "Upload", {
							logo: rst.base64,
							type: 'company',
							category: 'images'
						}, {
							headers: {
								'Authorization': 'Bearer ' + getToken()
							}

						}).then((res) => {
							var data = res.body.data;
							if(res.body.code == '0000') {
								this.imgData.push(data.attach_id);
								$('#editor').focus();
								insertHtmlAtCaret('<img src="' + data.url + '" class="uimgs" style="max-width:100%" />');
							} else {
								this.tips = res.body.error_description;
								this.popupVisible = true
								setTimeout(function() {
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
			video(e) {
				//上传
				if(!e) {
					return;
				}
				var reader = new FileReader();
				//获取文件
				var file = e['target']['files'][0];
				var videoType = /^video\//;
				var mp4 = /.+\/mp4/;
				if(!mp4.test(file['type'])) {
					this.tips = '请选择mp4格式！';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1000)
					return;
				}
				//是否是视频
				if(!videoType.test(file['type'])) {
					this.tips = '请选择视频！';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1000)
					return;
				} else if(file['size'] > (100 * 1024 * 1024)) {
					this.tips = '视频超过限制100M';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1000)
					return;
				}

				//读取完成
				reader.onload = (e) => {
					//获取图片dom
					var video_ava = e.target['result'];
					this.videoBase = video_ava;
					$('.load').show();
					this.$http.post(getOpenUrl() + "Upload", {
						logo: this.videoBase,
						type: 'company',
						category: 'video'
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					}).then((res) => {
						$('.load').hide();
						var data = res.body.data;
						if(res.body.code == '0000') {
							this.imgData.push(data.attach_id);
							$('#editor').focus();
							$('.fileurl').html(data.url);
							this.$refs.fileurl.innerHTML = data.url;
						} else {
							this.tips = res.body.error_description;
							this.popupVisible = true
							setTimeout(function() {
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
									this.popupVisible = false
								}, 1500)
							}
						})
				};
				reader.readAsDataURL(file);
			},
			getData() {
				this.$http.post(getOpenUrl() + 'exhibition', {
						id: this.id,
						content: this.$refs.message.innerHTML
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						if(res.body.code == 0) {
							this.tips = "修改成功"
							this.popupVisible = true
							setTimeout(() => {
								this.popupVisible = false
								this.$router.back(-1)
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
									this.popupVisible = false
								}, 1500)
							}
						})
			},
			setData() {
				this.$http.get(getOpenUrl() + 'exhibition', {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.picData = res.body.data
					if(this.id != undefined) {
						this.id = res.body.data.id
					}
					this.$refs.message.innerHTML = this.picData.content;
					setCookie("picshow", this.picData.content, expireDays);
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
				if (this.$refs.message.innerHTML == ''){
					this.tips = "请填写内容"
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false;
					}, 1000)
					return ;
				}

				if (this.$refs.fileurl.innerHTML == ''){
					this.tips = "请上传视频"
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false;
					}, 1000)
					return ;
				}

				this.$http.post(getOpenUrl() + 'setVideo', {
					id: this.id,
					content: this.$refs.message.innerHTML,
					fileurl: this.$refs.fileurl.innerHTML,
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					if(res.body.code == 0) {
						//this.videoData=res.body.data
						this.tips = "修改成功"
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
							this.$router.back(-1)
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
									this.popupVisible = false
								}, 1500)
							}
						})
			},
			setData1() {
				let index = this.$route.query.id;
				this.$http.get(getOpenUrl() + 'setVideo', {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.videoData = res.body.data
					if(this.videoData[index] != undefined) {
						this.$refs.message.innerHTML = this.videoData[index].content;
						this.$refs.fileurl.innerHTML = this.videoData[index].fileurl;
						this.id = this.videoData[index].id;
					} else {
						this.$refs.message.innerHTML = '';
						this.$refs.fileurl.innerHTML = '';
						this.id = '';
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
			submit() {
				if(this.$route.query.title == "组织机构代码") {
					var zzjgdm = this.$refs.message.innerHTML
					setCookie("zzjgdm", zzjgdm, expireDays);
					this.$router.back(-1)
				}
				if(this.$route.query.title == "经营范围") {
					var jyfw = this.$refs.message.innerHTML
					setCookie("jyfw", jyfw, expireDays);
					this.$router.back(-1)
				}
				if(this.$route.query.title == "企业资质") {
					var qyzz = this.$refs.message.innerHTML
					setCookie("qyzz", qyzz, expireDays);
					this.$router.back(-1)
				}
				if(this.$route.query.title == "企业证书") {
					var qyzs = this.$refs.message.innerHTML
					setCookie("qyzs", qyzs, expireDays);
					this.$router.back(-1)
				}
				if(this.$route.query.title == "企业简介") {
					var qyjj = this.$refs.message.innerHTML
					setCookie("qyjj", qyjj, expireDays);
					this.$router.back(-1)
				}
				if(this.$route.query.title == "图片展示") {
					var picshow = this.$refs.message.innerHTML
					setCookie("picshow", picshow, expireDays);
					this.getData()
				}
				if(this.$route.query.title == "展示视频一") {
					var video1 = this.$refs.message.innerHTML
					setCookie("video1", video1, expireDays);
					this.getData1()
				}
				if(this.$route.query.title == "展示视频二") {
					var video2 = this.$refs.message.innerHTML
					setCookie("video2", video2, expireDays);
					this.getData1()
				}
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
	
	.placeholder {
		width: calc(100% - 0.1rem);
		height: 5rem;
		resize: none;
		outline: none;
		border: 0;
		display: block;
		margin: 0 auto;
		background: #fff;
		padding-left: 0.05rem;
		padding-top: 0.1rem;
		margin-bottom: 1px;
		line-height: 0.5rem;
		overflow-y: scroll;
	}
	
	.upload {
		height: 1.14rem;
		background: #fff;
	}
	
	.upload .img {
		width: 0.86rem;
		height: 0.86rem;
		float: left;
		font-size: 0;
		opacity: 0;
	}

	.upload .simg {
		margin-top: 0.14rem;
		margin-left: 0.24rem;
		width: 0.86rem;
		height: 0.86rem;
		float: left;
		background: url(../../../../static/images/personal/upload.png) no-repeat;
		background-size: 100%;
		font-size: 0;
	}

	.upload>>>.fileurl {
		font-size:0.22rem;
		margin-top: 0.14rem;
		line-height: 0.86rem;
		float: right;
		padding-right: 0.4rem;
		color: #787883;
		width: calc(100% - 1.6rem);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;
	}
	
	/*.upload span {
		font-size: 0.2rem;
		color: #3f3f4e;
		margin-left: 0.1rem;
		margin-top: 0.78rem;
		float: left;
	}*/
	
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
	/**/
	
	#editor {
		font-size: .22rem;
		font-weight: normal;
		overflow: auto;
		outline: none;
	}
	
	#editor >>> img {
		max-width: 100%;
	}
	
	.uimgs {
		max-width: 100%;
	}
	
	.placeholder {}
	
	.ftall {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	
	.form1 {
		width: 6rem;
		margin: 0 auto;
		padding: 0.17rem 0;
		overflow: hidden;
	}
</style>