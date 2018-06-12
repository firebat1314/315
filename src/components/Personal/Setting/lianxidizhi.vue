<template>
	<div class="grjj">
		<my-header :title="this.$route.query.title" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<span v-text="region=='undefined'?region='':region"></span>
			<mt-picker :slots="citySlots" class="picker" @change="onAddressChange" :visible-item-count="5" ></mt-picker >
			<div class="bottom1" @click="submit()">确定</div>
		</div>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import {getOpenUrl,getToken} from '../../../assets/js/common.js'
	import Vue from 'vue'
	import { Popup,Picker} from 'mint-ui';
	Vue.component(Popup.name, Popup);
	Vue.component(Picker.name, Picker);
	export default {
		data() {
			return {
				tips: '',
				popupVisible:false,
				region: '',
				citySlots: [{
					flex: 1,
					values: [],
					className: 'slot1',
					textAlign: 'center'
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					flex: 1,
					values: [],
					className: 'slot3',  
					textAlign: 'center'  
				}, {
					divider: true,
					content: '-',
					className: 'slot4'
				}, {
					flex: 1,
					values: ['请选择'],
					className: 'slot5',
					textAlign: 'center'
				}]
			};
		},
		mounted() {
			this.regions = ['请选择', '请选择', '请选择'];
			if(this.$route.query.value) {
				this.region  = this.$route.query.value;
				this.regions = this.region.split(" ");
			} else {
				this.region = '';
			}
		},
		methods: {
			onAddressChange(picker, values){

				//获取省份数据
				//当前选中的省份
				this.province = 0;
				this.city     = 0;
				this.district = 0;
				if (this.provinceData){
					for(var k in this.provinceData){
						if (this.provinceData[k] == values[0]){
							this.province = parseInt(k);
							break;
						}
					}
				}else{
					this.getRegionData(1, 1, picker);
				}

				//获取城市数据
				if(values[0] != this.p){
					//两次选中的省份不一致重新加载市级数据
					this.getRegionData(this.province, 2, picker);
				}
				this.p = values[0];//记录选中的省份
				//当前选中的城市
				if (this.cityData){
					for(var k in this.cityData){
						if (this.cityData[k] == values[1]){
							this.city = parseInt(k);
							break;
						}
					}
				}

				//获取地区数据
				if(values[1] != this.c){
					//两次选中的城市不一致重新加载市级数据
					this.getRegionData(this.city, 3, picker);
				}
				this.c = values[1];//记录
				//当前选中的地区
				if (this.districtData){
					for(var k in this.districtData){
						if (this.districtData[k] == values[2]){
							this.district = parseInt(k);
							break;
						}
					}
				}
					

				var region = (values[0] ? values[0] : '') + ((values[1] ? ' ' + values[1] : '') + (values[2] != '请选择' ? ' ' + values[2] : ''));
				this.region = region ? region : this.$route.query.value;
			},
			getRegionData(id, level, picker){
				//console.log(id, level);
				this.$http.get(getOpenUrl() + 'region',{
					headers: {
						'Authorization': 'Bearer ' + getToken()
					},
					params:{
						pid: id,
						level: level
					}
				})
				.then((res) => {
					switch(level){
						case 1://省份
							//this.citySlots[0].values.push('请选择');
							this.provinceData = res.body.data;
							this.provinces    = [];
							for (var v in this.provinceData){
								this.provinces.push(this.provinceData[v]);
							}
							picker.setSlotValues(0, this.provinces);
							//设置默认选中
							picker.setSlotValue(0, this.regions[0]);
							break;
						case 2://城市
							this.cityData = res.body.data;
							this.citys = [];
							for (var v in this.cityData){
								this.citys.push(this.cityData[v]);
							}
							picker.setSlotValues(1, this.citys);
							//设置默认选中
							picker.setSlotValue(1, this.regions[1]);
							break;
						case 3://地区
							this.districtData = res.body.data;
							this.districts = ['请选择'];
							for (var v in this.districtData){
								this.districts.push(this.districtData[v]);
							}
							picker.setSlotValues(2, this.districts);
							//设置默认选中
							picker.setSlotValue(2, this.regions[2]);
							break;
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
			submit(){
				if (this.province == 0){
					this.tips = '请选择省份';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500);
					return false;
				}
				if (this.city == 0){
					this.tips = '请选择城市';
					this.popupVisible=true
					setTimeout(()=> {
						this.popupVisible=false
					}, 1500);
					return false;
				}
				this.$http.post(getOpenUrl() + 'userDataEdit',{
					province: this.province,
					city: this.city,
					district: this.district
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
	};
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
	
	span {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		outline: none;
		border: 0;
		display: block;
		margin: 0 auto;
		background: #fff;
		padding-left: 0.05rem;
		font-size: 0.22rem;
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
</style>