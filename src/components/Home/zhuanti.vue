<template>
	<div class="classify">
		<my-header1 :title="this.$route.query.title"></my-header1>
		<div class="nav" style="height: calc(100% - 1.28rem);position: relative;bottom: 0;overflow-y: scroll;">
			<ul class="navl" style="height: 100%;position: relative;bottom: 0;overflow-y: scroll;">
				<li @click="getCData(list.catid)" v-for="(list, index) in TData">
					<span class="sp1" :class="pcatid == list.catid ? 'active' : ''" @click="toggle(index)">{{list.catname}}</span>
				</li>
			</ul>
			<div class="content" style="height: 100%;position: relative;bottom: 0;overflow-y: scroll;">
				<div class="content-a" v-for="(data, index) in CData">
					<div v-for="(list, index) in data.list" :style="pcatid == data.pcatid? 'display:block' : 'display:none;'">
						<router-link :to="{path:'/zhuantipro',query:{cat_id:list.catid}}" style="color: #000;">
							<div class="content-t">{{list.catname}}</div>
						</router-link>
						<div class="content-b">
							<ul>
								<li v-for="(child, index) in list.children" :style="index%2!=0?'border-right:0;':((index+1)/list.children.length==1)?'border-bottom:0;border-right:0;':''">
									<router-link :to="{path:'/zhuantipro',query:{cat_id:child.catid}}" style="color: #959699;">
										<span :style="index%2!=0?'border-right:0;':((index+1)/list.children.length==1)?'border-bottom:0;border-right:0;':''">{{child.catname}}</span>
									</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
		
	</div>
</template>
<script>
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				pcatid: 0,
				pcatid1: 0,
				catid: 0,
				TData: {},
				CData: [],
				childData: [],
				loading: false,
				popupVisible: false,
				tips: ''
			};
		},
		mounted() {
			
			var pid = this.$route.query.pid;
			var cid = this.$route.query.cid;
			this.pcatid = !!pid ? pid : 0;
			this.pcatid1 = !!pid ? pid : 0;
			this.catid = !!cid ? cid : 0;
			if(typeof this.TData.length == 'undefined') {
				this.getData();
			}
		},
		methods: {
			toggle(index) {
				$('.nav-child').each(function() {
					if($(this).attr('id') == index) {
						if($(this).is(':hidden')) {
							$(this).show()
						} else {
							$(this).hide()
						}
					} else {
						$(this).hide()
					}
				});
			},
			getData() {
				this.loading = true
				this.$http.get(getOpenUrl() + "catetree", {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					params: {
						catid: this.$route.query.catid,
						source:2,
						level: 1
					}
				}).then((res) => {
					this.loading = false
					this.TData = res.body.data;
					if(!this.pcatid || typeof this.pcatid == 'undefined' || this.pcatid == 'undefined') {
						this.pcatid = this.TData[0].catid
					}
					this.getCData(this.pcatid);
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
			getCData(catid) {
				this.loading = true
				this.pcatid = catid;
				var isCurData = false;
				$.each(this.CData, function(key, val) {
					if(val.pcatid == catid && val.list) {
						isCurData = true;
						this.loading = false
						return;
					}
				});
				if(isCurData) {
					this.loading = false
					return;
				}
				this.$http.get(getOpenUrl() + 'catetree', {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					params:{
						catid: catid,
						source:2,
						level: 2
					},
				}).then((res) => {
					this.loading = false
					var list = res.body.data;
					if(res.body.code == '0000') {
						var data = {};
						data.pcatid = list[0].parentid;
						data.list   = list;
						this.CData.push(data);
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
	.classify>>>.header .a2 {
		display: none;
	}
	.nav {
		position: absolute;
		top: 1.28rem;
		bottom: 0.98rem;
		color: #242424;
		font-size: 0.22rem;
		display: flex;
		width: 100%;
		height: calc(100% - .88rem);
	}
	
	.navl {
		float: left;
		border-right: 1px solid #ebebeb;
		overflow: hidden;
		overflow-y: auto;
		width: 1.5rem;
	}
	
	.navl span {
		background-size: 0.25rem auto;
		height: 1rem;
		line-height: 1rem;
		color: #3F3F4E;
		padding-left: 0.2rem;
		margin-left: 0.06rem;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.navl .sp1.active {
		background: url(../../../static/images/dian.png) no-repeat 0 50%;
		background-size: 0.08rem;
	}
	
	.nav-child {
		overflow: hidden;
	}
	
	.nav-child .sp2 {
		margin: 0;
		color: #959699;
	}
	
	.nav-child .sp2.active1 {
		color: #fdb164;
		background: #f2f2f2;
	}
	
	.catbox {
		float: left;
		flex: 1;
	}
	
	.navr {
		float: left;
		flex: 1;
		overflow: hidden;
		overflow-y: auto;
		width: 100%
	}
	
	.navr .navr-t {
		color: #3F3F4E;
		font-size: 0.24rem;
		line-height: 0.9rem;
		height: 0.9;
		margin-left: 0.23rem;
	}
	
	.navr .navr-b {
		overflow: hidden;
	}
	
	.navr .navr-b dl {
		margin: 0 0.33rem;
		width: 0.9rem;
		float: left;
	}
	
	.navr .navr-b dl dt {
		width: 100%;
		height: 1.2rem;
	}
	
	.navr .navr-b dl dt img {
		width: 100%;
		height: 1.2rem;
	}
	
	.navr .navr-b dl dd {
		color: #3F3F4E;
		font-size: 0.2rem;
		line-height: 0.5rem;
		height: 0.9;
		text-align: center;
	}
	
	.content {
		background: #f2f2f2;
		flex: 1;
		padding-left: 0.16rem;
	}
	
	.content .content-t {
		font-size: 0.2rem;
		color: #3F3F4E;
		height: 0.6rem;
		line-height: 0.6rem;
	}
	
	.content .content-b {
		font-size: 0.2rem;
		color: #65676d;
		background: #fff;
		margin-right: 0.24rem;
		border-radius: 0.05rem;
		overflow: hidden;
	}
	
	.content .content-b ul {
		padding: 0.2rem;
		overflow: hidden;
	}
	
	.content .content-b ul li {
		line-height: 0.3rem;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		width: 50%;
		float: left;
		text-align: center;
		border-bottom: 1px solid #f2f2f2;
		box-sizing: border-box;
	}
	
	.content .content-b ul li span {
		width: 100%;
		display: block;
		border-right: 1px solid #f2f2f2;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>