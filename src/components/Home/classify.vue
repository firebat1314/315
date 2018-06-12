<template>
	<div class="classify">
		<my-header1 :title="this.$route.query.title"></my-header1>
		<div class="nav" style="height: calc(100% - 1.28rem);position: relative;bottom: 0;">
			<ul class="navl">
				<a href="javascript:;" @click="getCData(list.catid)" v-for="(list, index) in TData" :class="pcatid == list.catid ? 'active' : ''">
					<li>{{list.catname}}</li>
				</a>
			</ul>
			<div class="navr" :id="data.catid" v-for="(data, index) in CData" :style="pcatid == data.pcatid ? 'display:block' : 'display:none;'">
				<div v-for="(list, index) in data.list">
					<div class="navr-t">{{list.catname}}</div>
					<div class="navr-b">
						<a href="javascript:;" v-for="(ccat, index) in list.children" @click="checkCat(list.catid, list.catname, ccat.catid)">
							<dl>
								<!--<dt><img v-lazy="ccat.image"/></dt>-->
								<dd>{{ccat.catname}}</dd>
							</dl>
						</a>
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
				loading: false,
				popupVisible: false,
				tips: '',
				pcatid: 0,
				catid: 0,
				TData: {},
				CData: []
			};
		},
		mounted() {
			var pid = this.$route.query.pid;
			var cid = this.$route.query.cid;
			this.pcatid = !!pid ? pid : 0;
			this.catid = !!cid ? cid : 0;
			if(typeof this.TData.length == 'undefined') {
				this.getData();
			}
		},
		methods: {
			getData() {
				this.loading = true
				this.$http.post(getOpenUrl() + "solution_item", {

					catid: this.$route.query.catid
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					//				params:{
					//					catid: 0,
					//				},
				}).then((res) => {
					this.TData = res.body.data;
					this.loading = false
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
				this.$http.post(getOpenUrl() + 'solution_item', {
					catid: catid
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					var list = res.body.data;
					if(res.body.code == '0000') {
						var data = {};
						data.pcatid = list[0].parentid;
						data.list = list;
						this.CData.push(data);
						console.log(this.CData)
					}
					this.loading = false
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
			checkCat(catid, title, ccatid) {
				if(catid > 0) {
					location.href = '#/classdetail?catid=' + catid + '&title=' + title + '&cid=' + ccatid;
				} else {
					this.tipmsg = '请选择分类';
					this.istip = true;
					setTimeout(function() {
						$('.tips').hide();
						this.istip = false;
					}, 1000);
				}
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
		height: calc(100% - 1.28rem);
	}
	
	.navl {
		float: left;
		border-right: 1px solid #ebebeb;
		overflow: hidden;
		overflow-y: auto;
		width: 1.7rem;
	}
	
	.navl li {
		background-size: 0.25rem auto;
	}
	
	.navl a {
		display: block;
		padding: 0.2rem;
		color: #3F3F4E;
	}
	
	.navl a.active {
		border-left: 0.04rem solid #FC8209;
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
	}
	
	.navr .navr-t {
		color: #3F3F4E;
		font-size: 0.24rem;
		line-height: 0.9rem;
		height: 0.9rem;
		margin-left: 0.23rem;
	}
	
	.navr .navr-b {
		overflow: hidden;
	}
	
	.navr .navr-b dl {
		margin: 0 0.33rem;
		width: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		float: left;
		
	}
	
	.navr .navr-b dl dt {
		width: 100%;
		height: 1rem;
	}
	
	.navr .navr-b dl dt img {
		width: 0.9rem;
		height: 0.9rem;
	}
	
	.navr .navr-b dl dd {
		color: #3F3F4E;
		font-size: 0.2rem;
		line-height: 0.35rem;
		height: 0.9;
		text-align: center;
	}
	/*.navr a {
		color: #242424;
		display: block;
		height: 0.9rem;
		border-bottom: 1px solid #ebebeb;
	}*/
</style>