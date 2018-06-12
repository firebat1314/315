<template>
	<div class="grjj">
		<my-header :title="this.$route.query.headername" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<!--<div class="right">删除</div>-->
		<div class="body">
			<div class="body-top">
				<input type="text" placeholder="新闻主题" v-model="title"/>
			</div>
			<div class="body-top">
				<input type="text" placeholder="新闻链接" v-model="url"/>
			</div>
			<div class="upload">
				<img id="logo" style="margin-top: 0.14rem;margin-left: 0.24rem;width: 0.86rem;height: 0.86rem;float: left;" v-show="show" :src="this.thumb1"/>
				<span class="simg">
					<input class="img" type="file" id="imgView" accept="image/*" capture="camera" @change="onchange">
				</span>
				<span>上传缩略图</span>
			</div>
			<div class="bottom1" @click="getData">确定</div>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { getOpenUrl, getToken, insertHtmlAtCaret} from '../../../assets/js/common.js'
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	import lrz from 'lrz'
	var expireDays = 1000 * 60 * 60;
	var type=''
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				popupVisible:false,
				show:false,
				tips:'',
				title:'',
				url:'',
				thumb1:'',
				thumb2:'',
				imgData:[],
				listData:[]
			};
		},

		mounted() {
			if(this.$route.query.headername!="添加新闻"){
				this.setData(type)
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
					setTimeout(()=> {
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
						width: 100
					}).then((rst)=> {
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
							this.thumb=data.path
							if(res.body.code == '0000') {
								this.show=true
								this.tips = "上传成功";
								this.popupVisible = true
								setTimeout(()=> {
									this.popupVisible = false
//									setCookie("thumburl",this.thumb, expireDays);
								}, 1000)
							} else {
								this.tips = res.body.error_description;
								this.popupVisible = true
								setTimeout(()=> {
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
			getData(type){
				if(this.$route.query.type=="company"){
					var type="company"
				}
				if(this.$route.query.type=="product"){
					var type="product"
				}
				type = type ? type : 'company';
				this.$http.post(getOpenUrl() + 'addNews', {
					news_id:this.$route.query.id,
					title:this.title,
					type:type,
					url:this.url,
					thumb:this.thumb
				},{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.listData=res.body.data
					if(res.body.code == '0000') {
						this.tips = "保存成功";
						this.popupVisible = true
						setTimeout(()=> {
							this.popupVisible = false
							this.$router.back(-1)
						}, 1000)
					} else {
						this.tips = res.body.error_description;
						this.popupVisible = true
						setTimeout(()=> {
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
			},
			setData(type){
				if(this.$route.query.type=="company"){
					var type="company"
				}
				if(this.$route.query.type=="product"){
					var type="product"
				}
				this.$http.get(getOpenUrl() + 'companyNews', {
					params:{
						id:this.$route.query.id,
						type:type
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					if(res.body.code==0){
						this.show=true
						this.listData=res.body.data;
						this.title=this.listData[0].title;
						this.url=this.listData[0].url;
						this.thumb1=this.listData[0].thumbs;
						this.thumb2=this.listData[0].thumb;
						this.thumb=this.thumb2
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
	.grjj {
		background: #f4f4f4;
	}
	
	.body {
		width: 100%;
		overflow: hidden;
		margin-top: 0.2rem;
	}
	.body-top{background: #fff;height: 0.8rem;line-height:0.8rem;padding-left: 0.24rem;font-size: 0.22rem;border-bottom: 1px solid #f4f4f4;}
	.body-top input[type=text]{width: calc(100% - 0.24rem);height: 100%;}
	.right {
		height: 0.88rem;
		line-height: 0.88rem;
		position: absolute;
		top: 0;
		right: 0.24rem;
		font-size: 0.26rem;
		color: #3F3F4E;
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

	
	
	.upload span {
		font-size: 0.2rem;
		color: #3f3f4e;
		margin-left: 0.1rem;
		margin-top: 0.78rem;
		float: left;
	}
	
	
	
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
		font-size: 0.24rem;
		overflow-y: scroll;
	}
</style>