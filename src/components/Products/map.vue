<template>
	<div class="information">
		<my-header title="联系地址" style="background: #f0f2f5;border-bottom: 1px solid #dcdcdc;"></my-header>
		<div class="body">
			<div class="bodytop">
				<div id="container" style="width:100%; height:3rem"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import {getOpenUrl,getToken} from '../../assets/js/common.js'
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				tips: '',
				popupVisible:false,
			}
		},
		mounted() {
			this.lng = this.$route.query.lng;
			this.lat = this.$route.query.lat;
			this.map(this.lng, this.lat);
		},
		methods: {
			map(lng, lat) {
				let $_self = this;
				$_self.map = new BMap.Map('container')
				$_self.localSearch = new BMap.LocalSearch($_self.map);
				if (!lng || !lat){
					//不存在经纬度，定位附近
					this.geolocation = new BMap.Geolocation();
					this.geolocation.getCurrentPosition(function (r){
						if (this.getStatus() == BMAP_STATUS_SUCCESS) {
							$_self._setMap(r.point);
						}
					});
				}else{
					$_self._setMap(new BMap.Point(lng, lat));
				}
			},

			_setMap(point, zoom){
				zoom = !zoom ? 12 : zoom;
				this.map.centerAndZoom(point, zoom);
				this.marker = new BMap.Marker(point);
				this.marker.enableDragging();
				this.map.addOverlay(this.marker);//将标注点添加到地图上
				this.map.enableScrollWheelZoom()//启用滚轮放大缩小，默认禁用
				this.map.enableContinuousZoom()//启用地图惯性拖拽，默认禁用
				this.map.addControl(new BMap.NavigationControl())  // 添加默认缩放平移控件
				this.map.addControl(new BMap.OverviewMapControl()) // 添加默认缩略地图控件

				// 开启标注拖拽事件监听
				this.marker.addEventListener("dragend", (e) => {
					this.map.centerAndZoom(e.point, this.map.getZoom());
					this.lng = e.point.lng; //经度
					this.lat = e.point.lat; //纬度
					MessageBox.confirm('', {
						message: "确认执行此操作？",
						title: "提示",
						showConfirmButton: true,
						showCancelButton: true
					}).then(action => {
						if(action == 'confirm') {
							this.mapMarker = true;
							this.marker.disableDragging();//确定后不能在拖拽
							this._getAddress(e.point);//根据经纬度获取地址
						}
					}).catch(err => {
						
					});
				});
			},

			//获取地址信息，设置地址label
			_getAddress(point){
				var gc = new BMap.Geocoder();
				gc.getLocation(point, (rs) => {
					console.log(rs);
					var addComp  = rs.addressComponents;
					this.address = addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
					document.getElementById("address").value = this.address;
				});
			},

			getData(id) {
				if (id > 0){
					this.$http.get(getOpenUrl() + 'setContact', {
						params: {
							id: id
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.listData = res.body.data[0];
						this.address = this.$refs.address.value = this.listData.address;
						this.lng     = this.listData.lng;
						this.lat     = this.listData.lat;
						this.map(this.lng, this.lat);
					})
				}else{
					this.map();
				}
			},

			searchByStationName() {
				var keyword = document.getElementById("address").value;
				this.localSearch.setSearchCompleteCallback((searchResult) => {
					var poi = searchResult.getPoi(0);
					console.log(poi);
					if (poi && !this.mapMarker){
						this.lng = poi.point.lng;
						this.lat = poi.point.lat;
						this.map.clearOverlays();//清除之前的标注
						this._setMap(poi.point, this.map.getZoom());
					}
			　　});
				if (keyword){
					this.localSearch.search(keyword);
				}
			},

			submit(){
				var address = this.$refs.address.value;
				if (!address){
					this.tips = '请填写地址';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1500)
					return ;
				}
				if (!this.lng && !this.lat){
					this.tips = '请确认地址标注';
					this.popupVisible = true
					setTimeout(() => {
						this.popupVisible = false
					}, 1500)
					return ;
				}
				this.$http.post(getOpenUrl() + 'setContact', {
					id: this.$route.query.id,
					address: address,
					lng: this.lng,
					lat: this.lat,
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
	.information {
		background: #F4F4F4;
	}
	
	.body {
		margin-top: 0.2rem;
	}
	
	.bodytop {
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
		display: flex;
	}
	
	.sp1 {
		color: #656571;
		display: block;
		float: left;
		line-height: 0.78rem;
	}
	
	.sp2 {
		color: #3F3F4E;
		line-height: 0.78rem;
		flex: 1;
		margin-left: 0.2rem;
	}
	.mint-popup-4 {
		width: 100%;
	}
	.mint-popup-4 .picker-slot-wrapper, .page-popup .mint-popup-4 .picker-item {
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}
	.mint-datetime-action{width:60px}
	.mint-datetime-cancel{color:#666;}
	.mint-datetime-confirm{color:#337ab7}

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