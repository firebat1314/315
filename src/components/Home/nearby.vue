<template>
	<div class="first" type="fujin" contype="fujin" style="height: 100%;">
		<div class="fujin">
			<ul>
				<li class="li1" @click="dingwei('总部')">附近厂家</li>
				<li class="li1" @click="dingwei('工厂')">附近工厂</li>
				<li class="li1" @click="dingwei('销售')">附近经销商</li>
			</ul>
			<div class="map" id="allmap" style="width: 100%;height: 7.7rem;font-size: 0.2rem;"></div>
		</div>
	</div>
</template>

<script>
	import { getOpenUrl, getToken } from '../../assets/js/common.js';

	export default {
		data() {
			return {
				listData: []
			}
		},
		mounted() {
			this.dingwei("总部")
			$('.li1').on('touchend', function() {
				$('.li1').removeClass('active');
				$(this).addClass('active');
			});
		},
		methods: {
			getLocation() {
				var options = {
					enableHighAccuracy: true,
					maximumAge: 1000
				}
				if(navigator.geolocation) {
					//浏览器支持geolocation
					navigator.geolocation.getCurrentPosition(this.init, this.onError, this.options);

				} else {
					//浏览器不支持geolocation
				}
			},
			//失败时
			onError(error) {
				switch(error.code) {
					case 1:
						alert("位置服务被拒绝");
						break;

					case 2:
						alert("暂时获取不到位置信息");
						break;

					case 3:
						alert("获取信息超时");
						break;

					case 4:
						alert("未知错误");
						break;
				}

			},
			init(position) {
				//经度
				this.longitude = position.coords.longitude;
				//纬度
				this.latitude = position.coords.latitude;
//				//经度
//				this.longitude = 116.417;
//				//纬度
//				this.latitude = 39.909;
				this.map = new BMap.Map("allmap"); // 创建地图实例 
				var point = new BMap.Point(this.longitude, this.latitude); // 创建点坐标 
//				alert(this.longitude+","+this.latitude)
				this.map.centerAndZoom(point, 13); // 初始化地图，设置中心点坐标和地图级别 
				this.map.enableScrollWheelZoom(true); //地图的鼠标滚轮缩放默认是关闭的，需要配置开启。
				//控件
				this.map.addControl(new BMap.NavigationControl());
				this.map.addControl(new BMap.ScaleControl());
				//				map.addControl(new BMap.OverviewMapControl());
				//				this.map.addControl(new BMap.MapTypeControl());
				var pt = new BMap.Point(this.longitude, this.latitude);
				var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
				var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
				this.map.addOverlay(marker2);
				var opts = {
					type: BMAP_NAVIGATION_CONTROL_SMALL
				}
				this.map.addControl(new BMap.NavigationControl(opts));
				for(var i = 0; i < this.listData.length; i++) {
					var marker = new BMap.Marker(new BMap.Point(this.listData[i].lng, this.listData[i].lat)); // 创建标注
					var content = this.listData[i].address;
					this.map.addOverlay(marker); //将标注添加到地图中
					this.addClickHandler(content, marker);
				}
				//定位
			},
			addClickHandler(content, marker) {
				marker.addEventListener("click", (e) => {
					this.openInfo(content, e)
				});
			},
			openInfo(content, e) {
				var opts1 = {
					width: 250, // 信息窗口宽度
					height: 100, // 信息窗口高度
					//					title: "222", // 信息窗口标题
					enableMessage: true //设置允许信息窗发送短息
				};
				var p = e.target;
				var point = p.point;
				//var point1 = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
				var infoWindow = new BMap.InfoWindow(content, opts1); // 创建信息窗口对象 
				this.map.openInfoWindow(infoWindow, point); //开启信息窗口
			},
			dingwei(type) {
				this.$http.get(getOpenUrl() + 'index_nearby', {
						params: {
							lng: this.longitude,
							lat: this.latitude,
							type: type
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.listData = res.body.data
						if(res.body.code==0){
							this.getLocation()
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
	.fujin ul {
		display: flex;
		width: 100%;
		background: #fff;
		border-bottom: 1px solid #ebeaea;
	}
	
	.fujin li {
		flex: 1;
		color: #3F3F4E;
		font-size: 0.2rem;
		line-height: 0.7rem;
		height: 0.7rem;
		text-align: center;
	}
	
	.fujin>>>.anchorBL {
		display: none!important;
	}
	
	.active {
		color: #fd9b3a!important;
	}
</style>