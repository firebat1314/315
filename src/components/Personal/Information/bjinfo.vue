<template>
	<div class="information">
		<my-header :title="this.$route.query.plus=='添加' ? '添加联系信息' : '编辑联系信息'" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<!--<div class="right" v-if="this.$route.query.plus!='添加'">删除</div>-->
		<div class="body">
			<div class="bodytop">
				<router-link :to="{ path: 'text', query: { title: '编辑部门名称' ,v:'编辑',id:aid, plus:this.$route.query.plus}}">
					<div class="list">
						<span class="sp1">部门名称</span>
						<span class="backright"></span>
						<span class="r" ref="name"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '编辑部门类型' ,v:'编辑',id:aid, plus:this.$route.query.plus}}">
					<div class="list">
						<span class="sp1">部门类型</span>
						<span class="backright"></span>
						<span class="r" ref="type"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '编辑联系人' ,v:'编辑',id:aid, plus:this.$route.query.plus}}">
					<div class="list">
						<span class="sp1">联系人</span>
						<span class="backright"></span>
						<span class="r" ref="linkname"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '编辑电话' ,v:'编辑',id:aid, plus:this.$route.query.plus}}">
					<div class="list">
						<span class="sp1">电话</span>
						<span class="backright"></span>
						<span class="r" ref="linkphone"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'bjdz', query:{title: '编辑联系地址', id: aid, plus: this.$route.query.plus}}">
					<div class="list">
						<span class="sp1">联系地址</span>
						<span class="backright"></span>
						<span class="r" ref="address"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '编辑邮编' ,v:'编辑',id:aid,plus:this.$route.query.plus}}">
					<div class="list">
						<span class="sp1">邮编</span>
						<span class="backright"></span>
						<span class="r" ref="zipcode"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '编辑邮箱' ,v:'编辑',id:aid,plus:this.$route.query.plus}}">
					<div class="list">
						<span class="sp1">邮箱</span>
						<span class="backright"></span>
						<span class="r" ref="email"></span>
					</div>
				</router-link>
				<router-link :to="{ path: 'text', query: { title: '编辑网址连接' ,v:'编辑',id:aid,plus:this.$route.query.plus}}">
					<div class="list">
						<span class="sp1">网址连接</span>
						<span class="backright"></span>
						<span class="r" ref="weburl"></span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import { getOpenUrl, getToken } from '../../../assets/js/common.js'
	import { setCookie, getCookie } from '../../../assets/js/cookie.js'
	export default {
		data() {
			return {
				aid: ''
			}
		},
		mounted() {
			this.aid = this.$route.query.id;
			if (!this.aid){
				this.aid = getCookie('addressId');
			}else{
				setCookie('addressId', '', -1);
			}
			console.log(this.aid);
			if (this.aid > 0){
				this.getData(this.aid);
			}
		},
		methods: {
			getData(id){
				this.$http.get(getOpenUrl() + 'setContact', {
					params: {
						id:id
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					this.listData = res.body.data[0]
					this.$refs.name.innerHTML      = this.listData.name
					this.$refs.type.innerHTML      = this.listData.type
					this.$refs.linkname.innerHTML  = this.listData.link_name
					this.$refs.linkphone.innerHTML = this.listData.link_phone
					this.$refs.address.innerHTML   = this.listData.address
					this.$refs.zipcode.innerHTML   = this.listData.zipcode
					this.$refs.email.innerHTML     = this.listData.link_email
					this.$refs.weburl.innerHTML    = this.listData.web_url
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
		},
		activated() {
			//路由缓存 前进后退
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.information{background: #F4F4F4;}
	.body{margin-top: 0.2rem;}
	.bodytop{background: #FFFFFF;}
	.bb0{border-bottom: 0!important;}
	.list {
		border-bottom:1px solid #ebebeb;
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
	.right{height:0.88rem;line-height:0.88rem;position: absolute;top: 0;right: 0.24rem;font-size: 0.26rem;color: #3F3F4E;}

	.r {
		line-height: 0.78rem;
		float: right;
		color: #787883;
		width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;
	}
	.mr{padding-right: 0.28rem!important;}

	.backright {
	    height: 0.78rem;
	    width: 0.12rem;
		padding-left:0.28rem;
	    float: left;
	    background: url(../../../../static/images/personal/personalicon/backright.png) no-repeat right 50%;
	    background-size: 0.12rem 0.24rem;
	    display: block;
	    float: right;
	}
</style>