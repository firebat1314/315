<template>
    <div class="grjj">
        <my-header title="个人简介" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
        <div class="body">
        	 <!--@input="descInput"-->
            <textarea ref="text" maxlength="200"></textarea>
            <div class="bottom1" @click="getData()">确定</div>
        </div>
        <mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
    </div>
</template>

<script>
	import {getOpenUrl,getToken} from '../../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data () {
             return {
             	popupVisible:false,
             	tips:""
             }
         },
         
         mounted(){
         	this.$refs.text.value=this.$route.query.value
         },
         methods: {
			getData(){
         		this.profile=this.$refs.text.value
				this.$http.post(getOpenUrl() + 'userDataEdit',{
					profile:this.profile
				},{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				})
				.then((res) => {
					if (res.body.code == 0) {
						this.tips = '修改成功';
						this.popupVisible=true
						setTimeout(()=> {
							this.popupVisible=false
							this.$router.back(-1)
						}, 1500)
					} else {
						this.tips = res.body.error_description||res.body.info;
						this.popupVisible=true
						setTimeout(()=> {
							this.popupVisible=false
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
	.grjj{background: #f4f4f4;}
  	.body{width:100%;overflow:hidden;margin-top: 0.2rem;}
  	/*.setting2 .sl{width:0.99rem;height:1.14rem;float:left;background:url(../../../images/qzjs.png) no-repeat 50% 50%;background-size:0.36rem 0.34rem;}*/
  	.body .sr{width:calc(100% - 0.99rem);;height:1.14rem;float:right;}
  	.body .bt0{border-bottom:0;}
  	.body .sr-ul{width:4.85rem;overflow:hidden;float:left;}
  	.body .sr-ul-li1{font-size:0.22rem;color:#1a1a1a;margin-top:0.23rem;line-height:0.37rem;}
  	.body .sr-ul-li2{font-size:0.20rem;color:#adadad;line-height:0.36rem;}

  	textarea{width: 100%;height:2.7rem;resize: none;outline: none;border: 0;display: block;margin: 0 auto;background:#fff;padding-left: 0.05rem;padding-top: 0.1rem;}
  	.bottom{width:1.36rem;height:0.54rem;border-radius:0.27rem;background:#ff7d1d;font-size:0.2rem;line-height:0.54rem;text-align:center;color:#fff;float:right;margin:0.3rem 0.6rem 0 0;}
	.bottom1{width: 5.57rem;height: 0.73rem;border-radius: 0.05rem;text-align: center;font-size: 0.22rem;line-height: 0.73rem;margin: 0 auto;background: #ff7d1d;margin-top: 0.38rem;color: #fff;}
	
</style>