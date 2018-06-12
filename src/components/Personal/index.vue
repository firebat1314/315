<template>
	<div class="personal">
		<div class="header">
			<div class="data">
				<a href="#/myzl">
				<div class="face">
					<img v-lazy="this.detailData.avatar" />
				</div>
				</a>
				<ul class="name">
					<li class="li1">{{this.detailData.nickname}}</li>
					<li class="li2">{{this.detailData.email}}</li>
				</ul>
				<span v-if="detailData.is_company == 99">企业会员</span>
				<span v-else-if="detailData.is_company == -1"><a href="#/apply">申请成为企业会员</a></span>
				<span v-else-if="detailData.is_company > -1">企业会员审核中</span>
			</div>

		</div>
		<div class="minestore">
			<div class="storetop">我的店铺</div>
			<div class="storebottom">
				<a href="#/keep">
					<dl>
						<dt><img src="../../../static/images/personal/personalicon/shoucang.png"/></dt>
						<dd>我的收藏</dd>
					</dl>
				</a>
				<dl @click="qy">
					<dt><img src="../../../static/images/personal/personalicon/qiyexinxi.png"/></dt>
					<dd>企业信息</dd>
				</dl>
				<a href="#/myzl">
					<dl>
						<dt><img src="../../../static/images/personal/personalicon/ziliao.png"/></dt>
						<dd>个人资料</dd>
					</dl>
				</a>
				<a href="#/setting">
					<dl class="br0">
						<dt><img src="../../../static/images/personal/personalicon/safe.png"/></dt>
						<dd>账号安全</dd>
					</dl>
				</a>
			</div>

		</div>
		<div class="ware">
			<img :src="adData.ad_code" @click="adJump(adData)" />
		</div>
		<div class="fun">
			<a href="#/setting">

				<div class="set">

					<ul>
						<li class="li1"></li>
						<li class="li2">设置</li>

					</ul>
				</div>
			</a>
			<a href="#/apply" v-if="detailData.is_company == -1">
				<div class="lv">
					<ul>
						<li class="li1"></li>
						<li class="li2">申请成为企业会员</li>
					</ul>
				</div>
			</a>
			<div class="lv"  v-else-if="detailData.is_company == 99">
				<ul>
					<li class="li1"></li>
					<li class="li2">已经成为企业会员</li>
				</ul>
			</div>
			<div class="lv"  v-else-if="detailData.is_company > -1">
				<ul>
					<li class="li1"></li>
					<li class="li2">提交申请等待审核</li>
				</ul>
			</div>
			<a href="#/help">
				<div class="help">
					<ul>
						<li class="li1"></li>
						<li class="li2">帮助与反馈</li>
					</ul>
				</div>
			</a>
			<!-- <div class="about">
				<ul>
					<li class="li1"></li>
					<li class="li2">关于我们</li>
				</ul>
			</div> -->
			<div class="servicepeo">
				<ul>
					<li class="li1"></li>
					<li class="li2">举报电话<span>{{this.tel}}</span></li>
				</ul>
			</div>
			
		</div>
		<div class="tip">服务时间：周一至周五09:00-17:00</div>
		<div style="height: 1.5rem;"></div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>

		<!--<my-footer></my-footer>-->

	</div>
</template>

<script>
	import qs from 'qs'
	import { getOpenUrl, getToken, adUrl } from '../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				detailData: [],
				adData: '',
				tips: '',
				popupVisible: false,
				tel:''
			}
		},
		mounted() {
			this.getData()
			this.$http.get(getOpenUrl() + "ads",{
				params:{
					type:47
				},
				headers: {
					'Authorization': 'Bearer ' +  getToken()
				}
			}).then((res)=>{
				this.tel = res.body.data[0].ad_desc
			});
		},
		methods: {
			qy() {
				if(this.detailData.is_company == 99) {
					this.$router.push('/information')
				} else if(this.detailData.is_company == -1) {
					this.tips = "您还不是企业会员";
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
						this.$router.push('/jiben')
					}, 1500)
				} else {
					this.tips = "正在审核";
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1500)
				}
			},
			getData() {
				this.$http.get(getOpenUrl() + 'userData', {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.detailData = res.body.data;
					this.adData = res.body.ad_data;

					if(this.detailData.provinces == null) {
						this.detailData.provinces = ''
					}
					if(this.detailData.citys == null) {
						this.detailData.citys = ''
					}
					if(this.detailData.districts == null) {
						this.detailData.districts = ''
					}
				})
			},
			adJump(param) {
				var url = adUrl(param);
				this.$router.push(url);
			}
		},
		activated(){
			this.getData()
		}
	}
</script>

<style scoped>
	.personal {
		position: relative;
		bottom: 0.97rem;
		top: 0;
		background: #f5f5f5;
		overflow-y: scroll;
	}
	@media screen and (min-width: 1024px) {
	    .personal {
	        padding-bottom: 3.5rem;
	    }
	}
	.header {
		width: 100%;
		height: 1.9rem;
		padding-top: 0.4rem;
		background: url(../../../static/images/personal/personalbanner.png) no-repeat;
		background-size: cover;
	}
	
	.face {
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 50%;
		overflow: hidden;
		border: 2px solid #fff;
		float: left;
		margin-left: 0.24rem;
	}
	
	.face img {
		width: 0.9rem;
		height: 0.9rem;
	}
	
	.data {
		overflow: hidden;
		position: relative;
		padding-top: 0.42rem;
	}
	
	.name {
		color: #fff;
		float: left;
		margin-left: 0.1rem;
		margin-top: 0.2rem;
	}
	
	.name .li1 {
		font-size: 0.24rem;
		line-height: 0.32rem;
		font-weight: bold;
	}
	
	.name .li2 {
		font-size: 0.14rem;
		line-height: 0.26rem;
	}
	
	.data span {
		color: #964801;
		font-size: 0.2rem;
		background: #fce14c;
		line-height: 0.4rem;
		height: 0.4rem;
		border-radius: 0.2rem;
		padding-left: 0.1rem;
		padding-right: 0.25rem;
		float: right;
		position: absolute;
		right: -0.2rem;
		bottom: 0;
	}
	
	.data span a {
		color: #964801
	}
	
	.minestore {
		background: #fff;
	}
	
	.storetop {
		line-height: 0.7rem;
		border-bottom: 1px solid #f4f4f4;
		font-size: 0.24rem;
		color: #3f3f4e;
		padding-left: 0.24rem;
	}
	
	.storebottom {
		padding: 0 0.24rem;
		margin-top: 0.33rem;
		height: 1.05rem;
	}
	
	.storebottom dl {
		float: left;
		width: 25%;
		border-right: 1px solid #f4f4f4;
		box-sizing: border-box;
	}
	
	.storebottom dl dt img {
		width: 0.4rem;
		height: auto;
		margin: 0 auto;
	}
	
	.storebottom dl dd {
		font-size: 0.2rem;
		color: #3f3f4e;
		text-align: center;
		margin-top: 0.2rem;
	}
	
	.br0 {
		border-right: 0!important;
	}
	
	.ware {
		width: 100%;
		height: 1.8rem;
		background: #fff;
		margin-top: 0.14rem;
	}
	
	.ware img {
		width: 100%;
		height: 1.8rem
	}
	
	.fun {
		margin-top: 0.14rem;
	}
	
	.fun ul {
		height: 0.9rem;
		border-bottom: 1px solid #f4f4f4;
		color: #3f3f4e;
		font-size: 0.24rem;
		line-height: 0.9rem;
	}
	
	.fun ul li {
		float: left;
	}
	
	.fun .li1 {
		width: 0.32rem;
		height: 100%;
		margin-left: 0.24rem;
	}
	
	.fun .li2 {
		margin-left: 0.4rem;
	}
	
	.fun div {
		background: #fff;
	}
	
	.lv {
		margin-bottom: 0.14rem;
	}
	
	.about {
		margin-bottom: 0.14rem;
	}
	
	.set .li1 {
		background: url(../../../static/images/personal/personalicon/setting.png) no-repeat 0 50%;
		background-size: 0.32rem auto;
	}
	
	.lv .li1 {
		background: url(../../../static/images/personal/personalicon/lv.png) no-repeat 0 50%;
		background-size: 0.32rem auto;
	}
	
	.about .li1 {
		background: url(../../../static/images/personal/personalicon/about.png) no-repeat 0 50%;
		background-size: 0.32rem auto;
	}
	
	.help .li1 {
		background: url(../../../static/images/personal/personalicon/help.png) no-repeat 0 50%;
		background-size: 0.32rem auto;
	}
	
	.servicepeo .li1 {
		background: url(../../../static/images/personal/personalicon/servicepeo.png) no-repeat 0 50%;
		background-size: 0.32rem auto;
	}
	
	.servicepeo span {
		margin-left: 0.6rem;
	}
	
	.tip {
		color: #b5b5bb;
		font-size: 0.2rem;
		text-align: center;
		line-height: 0.56rem;
	}
</style>