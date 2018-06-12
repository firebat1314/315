<template>
	<div class="products">
		<div class="header">
			<div class='header-top'>
				<a class="a1" href="javascript:history.back(-1);"></a>
				<!--<a href="javascript:history.back(-1);" class="a1"></a>-->
				<div class="header-search">
					<router-link :to="{path:'/search'}">
						<input type="text" placeholder="请输入关键字" />
					</router-link>
				</div>
				<a class="a2" :class="{active:!isTable}" @click="listTable"></a>
			</div>
			<div class="chanpin-tab">
				<div class="tab" @click="toggleTime">
					发布时间
				</div>
				<div class="tab jiage" @click="toggleDangci">
					<span class="jc-sanjiao">价格</span>
				</div>
				<div class="tabs sx" @click="toggle()">筛选</div>
			</div>
		</div>
		<div class="page-loadmore backtop" style="position:relative;top:2rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 2rem);">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
				<div v-if="isTable" class="first">
					<router-link :to="{path:'/pro_details',query:{id:data.id}}" class="chang" v-for="(data,index) in items" :key="index">
						<div class="chang-left">
							<img v-lazy="data.thumb" />
						</div>
						<div class="chang-center" style="position: relative;">
							<ul>
								<li class="changli1">{{data.title}}</li>
								<li class="changli2" v-text="data.price==0?'面议':'￥'+data.price"></li>
								<li class="changli3"><span style="margin-right: 0.2rem;">品牌：{{data.brand}}</span><span>产地：{{data.yieldly}}</span></li>
							</ul>
						</div>
						<div class="chang-right"></div>
					</router-link>
				</div>
				<div v-if="!isTable">
					<div class="ano-chang">
						<ul v-for="(data,index) in items" :key="index">
							<router-link :to="{path:'/pro_details',query:{id:data.id}}">
								<li>
									<img v-lazy="data.thumb">
								</li>
								<li style="margin:0.2rem 0.3rem 0 0.24rem;">
									<p style="line-height: 0.35rem;height: 0.35rem;color:#82828c;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{data.title}}</p>
									<p style="line-height: 0.35rem;height: 0.35rem;color:#82828c;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{data.description}}</p>
									<p style="line-height: 0.35rem;height: 0.35rem;font-size:0.24rem;color:#fc8209;padding-bottom: 0.1rem;" v-text="data.price==0?'面议':'￥'+data.price"></p>
								</li>
							</router-link>
						</ul>
					</div>
					<div style="clear: both;"></div>
				</div>
			</mt-loadmore>
		</div>

		<mt-popup v-model="popupVisible" position="right" class="all-fenlei">
			<div style="width: 100%;height:calc(100% - 0.8rem);position: relative;overflow-y:scroll;
    overflow-x: hidden;">
				<div class="all-fenlei-header" style="margin-top: 0.2rem;">
					<p>按产地</p>
					<span class="goAll" @click="toggleCity()">全部</span>
				</div>
				<div class="city-box">
					<!--{active:city.selected}-->
					<span v-for="(city,index) in allData.province" :key="index" :class="{active:city.selected}" @click="selectCity(index,city);" v-show="index<12">{{city.area_title}}</span>
				</div>
				<div class="all-fenlei-header">
					<p>价格区间</p>
				</div>
				<!--<div class="min-max">
					<div class="min-box">
						<input type="text" autocapitalize="off" autocomplete="off" placeholder="最低价">
					</div>
					<div style="width: 0.25rem;height:0.03rem;margin:0.2rem 0.1rem;background:#d0d1d3;float: left;"></div>
					<div class="min-box max-box">
						<input type="text" autocapitalize="off" autocomplete="off" placeholder="最高价">
					</div>
				</div>-->
				<div class="price-interval-content">
					<span v-for="(price,index) in allData.price_array" :class="{active:price.selected}" :key="index" @click="selectPrices(index,price);">{{price.start}}-{{price.end}}</span>
					
				</div>
				<div class="all-fenlei-header" style="padding:0.2rem 0.2rem;">
					<p>全部分类</p>
					<span class="goAll" @click="goAllfenlei()">全部</span>
				</div>
				<div style="width:100%;height:0.15rem;background:#f3f3f3;"></div>
				<div class="all-fenlei-header" style="padding:0.2rem 0.2rem;">
					<p>品牌</p>
					<span @click="goAllFashion()" class="goAll">全部</span>
				</div>
				<div class="fashion-box">
					<div class="fashion-little-box" v-for="(list,index) in brand" :class="{active:list.selected}" v-show="index<3" @click="brandlist(index,list);">
						<span>{{list.title}}</span>
					</div>
				</div>
				<div class="all-fenlei-header">
					<p>厂家</p>
					<span @click="goAllCompany()" class="goAll">全部</span>
				</div>
				<div class="changjia-box" style="padding-top: 0.1rem">
					<span v-for="(gs,index) in allData.company" :class="{active:gs.selected}" v-show="index<3" @click="companylist(index,gs);" :key="index">{{gs.title}}</span>
				</div>
				<!--<div v-for="(range,index) in allData.range_array">
					<div class="all-fenlei-header">
						<p>测试通用范围指标</p>
					</div>
					<div class="min-max">
						<div style="font-size: 0.24rem;line-height: 0.42rem;float: left;">{{range.attr_name}}：</div>
						<div class="min-box" style="width:1.5rem;margin-bottom: 0.2rem;">
							<input type="text" autocapitalize="off" autocomplete="off" v-model="min" @click="fanwei(range.attr_id)">
						</div>
						<div style="font-size: 0.2rem;float: left;">-</div>
						<div class="min-box" style="width:1.5rem;margin-bottom: 0.2rem;">
							<input type="text" autocapitalize="off" autocomplete="off" v-model="max" @click="fanwei(range.attr_id)">
						</div>
					</div>
				</div>-->
				<!--<div v-for="(radio,index) in allData.only_array">

					<div class="all-fenlei-header">
						<p>测试通用唯一指标</p>
					</div>
					<div class="index-box">
						<div style="font-size: 0.24rem;line-height: 0.42rem;float: left;">{{radio.attr_name}}：</div>
						<div class="nav-right">
							<p class="li4">
								<label><input type="radio" value="big" name="weiyi" ref="check"><b></b></label>
							</p>
						</div>
						<span>≧</span>
						<div class="nav-right">
							<p class="li4">
								<label><input type="radio" value="small" name="weiyi" ref="check"><b></b></label>
							</p>
						</div>
						<span>≦</span>
						<div class="min-box">
							<input type="text" autocapitalize="off" autocomplete="off">
						</div>
					</div>
				</div>-->
				<div class="all-fenlei-header">
					<p>产品内容</p>
				</div>
				<div class="min-max">
					<div class="min-box" style="width:3.3rem;margin-bottom: 0.2rem;">
						<input type="text" autocapitalize="off" autocomplete="off" v-model="goodname">
					</div>
				</div>

				<div class="button-box">
					<div class="button" @click="initData()">重置</div>
					<div class="button" style="background:#ff7738;color:#fff;" @click="submit()">确定</div>
				</div>
			</div>
		</mt-popup>

		<mt-popup v-model="indexlist" position="right" class="all-fenlei">
			<div class="indexlist-header">
				<a @click="indexlistBack()" class="indexlist-a1"></a>
				<span>产地</span>
				<i @click="submit()">确定</i>
			</div>
			<div style="width: 100%;height:0.15rem;background:#f3f5f7;"></div>
			<div class="indexlist-content">
				<mt-index-list class="area">
					<!--{select:list.selected}-->
					<div class="cell" v-for="(list,index) in allData.province" :class="{select:list.selected}" @click="area(index,list);">{{list.area_title}}</div>
				</mt-index-list>
			</div>
		</mt-popup>
		<!--品牌-->
		<mt-popup v-model="allFashion" position="right" class="all-fenlei" style="padding-top: 0.4rem;">
			<div class="indexlist-header">
				<a @click="fashionBack()" class="indexlist-a1"></a>
				<span>品牌</span>
				<i @click="submit()">确定</i>
			</div>
			<div style="width: 100%;height:0.3rem;background:#f3f5f7;"></div>

			<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
				<swiper-slide style="margin-left:0.2rem;width:auto;padding: 0 0.8rem;" class="active-nav body_bottom" type="1"><span>推荐品牌</span></swiper-slide>
				<swiper-slide style="width:auto;padding: 0 0.8rem;" class="body_bottom" type="2"><span>字母排序</span></swiper-slide>
			</swiper>

			<div class="backtop" style="position:relative;top:0.7rem;bottom:0;overflow-y:scroll;font-size: 0.2rem;height: calc(100% - 1.9rem);">
				<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
					<swiper-slide>
						<div class="first" type="1" contype="1">
							<div class="cell" v-for="(list,index) in brand" :class="{select:list.selected}" @click="brandlist(index,list);getData(this.catid, this.start, this.size, this.order, this.sort,this.area_id,list.brand_id,this.company_id,this.price_id,this.goodname)">{{list.title}}</div>
						</div>
					</swiper-slide>
					<swiper-slide>
						<div class="first" type="2" contype="2">
							<mt-index-list>
								<mt-index-section style="font-size: 0.3rem;" v-for="(brand,index1) in brandData" :index="brand.english">
									<div class="cell" v-for="(list,index) in brand.value_data" :class="{select:list.selected}" @click="branddetail(index1,index,list);getData(this.catid, this.start, this.size, this.order, this.sort,this.area_id,list.brand_id,this.company_id,this.price_id,this.goodname)">{{list.title}}</div>
								</mt-index-section>
							</mt-index-list>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</mt-popup>
		<!--厂家-->
		<mt-popup v-model="allCompany" position="right" class="all-fenlei" style="padding-top: 0.4rem;">
			<div class="indexlist-header">
				<a @click="companyBack()" class="indexlist-a1"></a>
				<span>厂家</span>
				<i @click="submit()">确定</i>
			</div>
			<div style="width: 100%;height:0.3rem;background:#f3f5f7;"></div>

			<swiper :options="swiperOptionTabcj" id="swiper-container21" ref="mySwiperTabcj">
				<swiper-slide style="margin-left:0.2rem;width:auto;padding: 0 0.8rem;" class="active-nav1 body_bottom" type="1"><span>推荐厂家</span></swiper-slide>
				<swiper-slide style="width:auto;padding: 0 0.8rem;" class="body_bottom" type="2"><span>字母排序</span></swiper-slide>
			</swiper>

			<div class="backtop" style="position:relative;top:0.7rem;bottom:0;overflow-y:scroll;font-size: 0.2rem;height: calc(100% - 1.9rem);">
				<swiper :options="swiperOptionConcj" id="swiper-container3" ref="mySwiperConcj">
					<swiper-slide>
						<div class="first" type="1" contype="1">
							<div class="cell" v-for="(list,index) in com" :class="{select:list.selected}" @click="comlist(index,list);getData(this.catid, this.start, this.size, this.order, this.sort,this.area_id,this.brand_id,list.company_id,this.price_id,this.goodname)">{{list.title}}</div>
						</div>
					</swiper-slide>
					<swiper-slide>
						<div class="first" type="2" contype="2">
							<mt-index-list>
								<mt-index-section style="font-size: 0.3rem;" v-for="(com,index1) in comData" :index="com.english">
									<div class="cell" v-for="(list,index) in com.value_data" :class="{select:list.selected}" @click="comdetail(index1,index,list);getData(this.catid, this.start, this.size, this.order, this.sort,this.area_id,this.brand_id,list.company_id,this.price_id,this.goodname)">{{list.title}}</div>
								</mt-index-section>
							</mt-index-list>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</mt-popup>

		<mt-popup v-model="allFenlei" position="right" class="all-fenlei" style="padding-top: 0.4rem;">
			<div class="indexlist-header">
				<a @click="fenleiBack()" class="indexlist-a1"></a>
				<span style="left:42%;">全部分类</span>
			</div>
			<div style="width: 100%;height:0.3rem;background:#f3f5f7;"></div>

			<swiper :options="swiperOptionTab1" id="swiper-container22" ref="mySwiperTab1">
				<swiper-slide class="body_bottom" :class="pcatid == list.catid ? 'active-nav2' : ''" v-for="(list, index) in TData" :id="list.catid">
					<span @click="getCData(list.catid)" class="sp1" :class="pcatid == list.catid ? 'active' : ''">{{list.catname}}</span>
				</swiper-slide>
			</swiper>

			<div style="background: #f3f5f7;position:relative;top:0.75rem;bottom:0;font-size: 0.22rem;height: calc(100% - 0.75rem);">
				<swiper :options="swiperOptionCon1" id="swiper-container3" ref="mySwiperCon1">
					<swiper-slide v-for="(list, index) in TData">
						<ul class="navl" style="height: calc(100% - 2.6rem);position: relative;top:0;bottom: 0;overflow-y: scroll;">
							<li @click="getCData(list.catid)">
								<div class="nav-child" :id="index">
									<div class="navr" :id="data.catid" v-for="(data, index) in CData" :style="pcatid == data.pcatid ? 'display:block' : 'display:none;'">
										<span v-for="(list, index) in data.list" class="sp2" :class="pcatid1 == list.catid ? 'active1' : ''" @click="getCData1(list.catid)">{{list.catname}}</span>
									</div>
								</div>
							</li>
						</ul>
						<div class="content" style="height: calc(100% - 2.6rem);position: relative;bottom: 0;overflow-y: scroll;">
							<div class="content-a" v-for="(data, index) in childData">
								<div v-for="(list, index) in data.list" :style="pcatid1 == data.pcatid1 ? 'display:block' : 'display:none;'">
									<div class="content-t">{{list.catname}}</div>
									<div class="content-b">
										<ul>
											<li v-for="(child, index) in list.children">
												<span @click="getData(child.catid,this.start, this.size, this.order, this.sort)">{{child.catname}}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</mt-popup>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible1" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import Vue from 'vue'
	import { IndexList, IndexSection } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import { Popup } from 'mint-ui';
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(IndexList.name, IndexList);
	Vue.component(IndexSection.name, IndexSection);
	Vue.component(Popup.name, Popup);
	var top = '';
	var start = 1,
		size = 7,
		order = 'listorder',
		sort = "desc",
		catid = '',
		area_id = '',
		brand_id = '',
		company_id = '',
		price_id=""
	export default {
		data() {
			return {
				showProvince:false,
				loading:false,
				//				dcsxShow: false,
				//				timeShow:false,
				//				markShow: false,
				//				markTimeShow: false,
				//测试范围
				min:'',
				max:'',
				//搜索内容
				goodname:'',
				//分类
				pcatid: 0,
				pcatid1: 0,
				catid: 0,
				TData: {},
				CData: [],
				childData: [],
				
				area_id : '',
				brand_id : '',
				company_id : '',
				price_id:"",
				
				isTable: true,
				allData: '',
				items: [],
				brand: [],
				brandData: [],
				com: [],
				comData: [],
				allFenlei: false,
				allFashion: false,
				selected: '',
				//厂家弹窗
				allCompany: false,
				indexlist: false,
				popupVisible: false,
				popupVisible1: false,
				tips:'',
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 'auto'
				},
				swiperOptionCon: {
					autoHeight: true,
					notNextTick: true
				},
				//厂家
				swiperOptionTabcj: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 'auto'
				},
				swiperOptionConcj: {
					autoHeight: true,
					notNextTick: true
				},
				swiperOptionTab1: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
				},
				swiperOptionCon1: {
					autoHeight: true,
					notNextTick: true
				},
				allLoaded: false,
				topStatus: ''
			}
		},
		mounted() {
			//分类
			var pid = this.$route.query.pid;
			var cid = this.$route.query.cid;
//			this.pcatid = !!pid ? pid : 0;
//			this.pcatid1 = !!pid ? pid : 0;
//			this.catid = !!cid ? cid : 0;
			if(typeof this.TData.length == 'undefined') {
				this.getData1();
			}

			this.start = start;
			this.bottom = size;
			this.order = order;
			this.sort = sort;

			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
			//厂家
			var swiperTabcj = this.swiperTabcj;
			var swiperConcj = this.swiperConcj;

			var swiperTab1 = this.swiperTab1;
			var swiperCon1 = this.swiperCon1;

			//全部品牌
			var self = this;
			swiperTab.on('tap', function(obj) {
				swiperCon.slideTo(obj.clickedIndex);
			});

			swiperCon.on('slideChangeStart', function(obj) {
				$('#swiper-container2 .active-nav').removeClass('active-nav')
				var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTab.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTab.width / activeNav.width()) - 1
						swiperTab.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTab.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperCon.on('slideChangeEnd', (obj) => {
				$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
				$('.backtop').scrollTop(0)
				return;
			});
			//厂家
			swiperTabcj.on('tap', function(obj) {
				swiperConcj.slideTo(obj.clickedIndex);
			});

			swiperConcj.on('slideChangeStart', function(obj) {
				$('#swiper-container21 .active-nav1').removeClass('active-nav1')
				var activeNav = $('#swiper-container21 .swiper-slide').eq(obj.activeIndex).addClass('active-nav1');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTabcj.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTabcj.width / activeNav.width()) - 1
						swiperTabcj.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTabcj.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperConcj.on('slideChangeEnd', (obj) => {
				$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
				$('.backtop').scrollTop(0)
				return;
			});
			//全部分类
			swiperTab1.on('tap', function(obj) {
				swiperCon1.slideTo(obj.clickedIndex);
			});

			swiperCon1.on('slideChangeStart', function(obj) {
				$('#swiper-container22 .active-nav2').removeClass('active-nav2')
				var activeNav = $('#swiper-container22 .swiper-slide').eq(obj.activeIndex).addClass('active-nav2');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTab1.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTab1.width / activeNav.width()) - 1
						swiperTab1.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTab1.slideTo(activeNav.index())
					}
				}
				return;
			});
			//$(".mint-indexlist-content").css("height", '80%');
			var self = this;
			swiperCon1.on('slideChangeEnd', (obj) => {
				let newPcId = $('#swiper-container22 .active-nav2').attr('id');
				$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
				this.getCData(newPcId);
				//				$('.backtop').scrollTop(0)
				return;
			});

			//筛选bar的切换样式逻辑
			$('.chanpin-tab .tab').on('touchend', function() {
				$('.chanpin-tab .tab').removeClass('active');
				$(this).addClass('active');
			});

			$('.chanpin-tab .tab').on('touchend', function(event) {
				event.stopPropagation();
			});

			$('.chanpin-tab .jiage').on('touchend', function() {
				if($(this).find('.jc-sanjiao').hasClass('arrow-up')) {
					self.getData(catid, start, size, "price", sort)
					$(this).find('.jc-sanjiao').removeClass('arrow-up');
					$(this).find('.jc-sanjiao').addClass('arrow-down');
				} else {
					self.getData(catid, start, size, "price", "asc")
					$(this).find('.jc-sanjiao').addClass('arrow-up');
					$(this).find('.jc-sanjiao').removeClass('arrow-down');
				}
			});

			$('.chanpin-tab .tab:not(.jiage)').on('touchend', function() {
				$('.chanpin-tab .jiage').find('.jc-sanjiao').removeClass('arrow-up');
				$('.chanpin-tab .jiage').find('.jc-sanjiao').removeClass('arrow-down');
			});
			//全部产地
			$('.indexlist-content .cell').on('touchend', function() {
				$('.indexlist-content .cell').removeClass('select');
				$(this).addClass('select');
			});
			$('.indexlist-content .cell').on('touchend', function(event) {
				event.stopPropagation();
			});
		},

		methods: {
			area(i, list) {
				for(let i = 0; i < this.allData.province.length; i++) {
					this.allData.province[i].selected = false;
				}
				list.selected = true;
				Vue.set(this.allData.province, i, this.allData.province[i]);
			},
			toggleDangci() {

			},
			toggleTime() {
				this.getData(catid, start, size, "inputtime", "asc")
			},
			//厂家
			companylist(i, gs) {
				for(let i = 0; i < this.allData.company.length; i++) {
					this.allData.company[i].selected = false;
				}
				company_id = gs.company_id;
				this.selected = gs.selected = true;
				Vue.set(this.allData.company, i, this.allData.company[i]);
			},
			comlist(i, list) {
				for(let i = 0; i < this.allData.company.length; i++) {
					this.allData.company[i].selected = false;
				}
				this.selected = list.selected = true;
				Vue.set(this.allData.company, i, this.allData.company[i]);
			},
			comdetail(index1, index, list) {
				for(let i = 0; i < this.comData.length; i++) {
					for(let j = 0; j < this.comData[i].value_data.length; j++) {
						this.comData[i].value_data[j].selected = false;
					}
				}
				//数据刷新视图刷新
				Vue.set(this.comData, index1, this.comData[index1]);
				this.comData[index1].value_data[index].selected = true;
				this.selected = list.selected = true;
				brand_id = this.brandData[index1].value_data[index].brand_id;
			},
			//品牌
			brandlist(i, list) {
				for(let i = 0; i < this.allData.brand_list.length; i++) {
					//多选
//					if(list.brand_id == this.allData.brand_list[i].brand_id) {
//						this.allData.brand_list[i].selected = !this.allData.brand_list[i].selected
//					}
					this.allData.brand_list[i].selected = false;
				}

				this.selected = list.selected = true;
				brand_id = list.brand_id;
//				console.log(data);
				Vue.set(this.allData.brand_list, i, this.allData.brand_list[i]);
			},
			branddetail(index1, index, list) {
				for(let i = 0; i < this.brandData.length; i++) {
					for(let j = 0; j < this.brandData[i].value_data.length; j++) {
						this.brandData[i].value_data[j].selected = false;
					}
				}
				//数据刷新视图刷新
				Vue.set(this.brandData, index1, this.brandData[index1]);
				this.brandData[index1].value_data[index].selected = true;
				this.selected = list.selected = true;
//				brand_id = this.brandData[index1].value_data[index].brand_id;
			},
			//			brandlistAll(i, list) {
			//				for(let i = 0; i < this.allData.brand_list.length; i++) {
			//					this.allData.brand_list[i].selected = false;
			//				}
			//				list.selected = true;
			//				Vue.set(this.allData.brand_list, i, this.allData.brand_list[i]);
			//			},
			//产地
			selectCity(i, city) {
				this.showProvince = true;
				this.allData.url_data.area_id = '';
				for(let i = 0; i < this.allData.province.length; i++) {
					this.allData.province[i].selected = false;
				}
				this.selected = city.selected = true;
				area_id = city.area_id;
//				console.log(data);
				Vue.set(this.allData.province, i, this.allData.province[i]);
			},
			//价格
			selectPrices(i, price) {
				for(let i = 0; i < this.allData.price_array.length; i++) {
					//					if(price.price_id == this.allData.price_array[i].price_id) {
					//						this.allData.price_array[i].selected = !this.allData.price_array[i].selected
					//					}
					this.allData.price_array[i].selected = false;
				}
				price_id = price.price_id;
				this.selected = price.selected = true;
				Vue.set(this.allData.price_array, i, this.allData.price_array[i]);
			},
			listTable() {
				this.isTable = !this.isTable;
			},
			toggle() {
				this.popupVisible = !this.popupVisible;
			},
			initData() {
//				this.selected = false
//				//品牌
//				for(let i = 0; i < this.allData.brand_list.length; i++) {
//					this.allData.brand_list[i].selected = false;
//					Vue.set(this.allData.brand_list, i, this.allData.brand_list[i]);
//				}
//				//产地
//				for(let i = 0; i < this.allData.province.length; i++) {
//					this.allData.province[i].selected = false;
//					Vue.set(this.allData.province, i, this.allData.province[i]);
//				}
//				//价格
//				for(let i = 0; i < this.allData.price_array.length; i++) {
//					this.allData.price_array[i].selected = false;
//					Vue.set(this.allData.price_array, i, this.allData.price_array[i]);
//				}
//				//
//				for(let i = 0; i < this.allData.company.length; i++) {
//					this.allData.company[i].selected = false;
//					Vue.set(this.allData.company, i, this.allData.company[i]);
//				}
				this.getData(this.catid, this.start, this.size, this.order, this.sort);
			},
			submit() {
//				this.toggle();
//				this.getData(catid, start, size, order, sort,area_id,brand_id,company_id,price_id)
				this.getData(catid, start, size, order, sort,area_id,brand_id,company_id,price_id)
			},
			toggleCity() {
				this.indexlist = !this.indexlist;
			},
			indexlistBack() {
				this.indexlist = !this.indexlist;
			},
			//品牌
			goAllFashion() {
				this.allFashion = !this.allFashion;
			},
			fashionBack() {
				this.allFashion = !this.allFashion;
			},
			//厂家
			goAllCompany() {
				this.allCompany = !this.allCompany;
			},
			companyBack() {
				this.allCompany = !this.allCompany;
			},
			goAllfenlei() {
				this.allFenlei = !this.allFenlei;
			},
			fenleiBack() {
				this.allFenlei = !this.allFenlei;
			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadTop() { // 刷新数据的操作
				this.start = 1;
				this.$http.get(getOpenUrl() + "/special_list", {
					params:{
						catid: this.$route.query.cat_id,
						page: start,
						limit: size
					},
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then((res) => {
					var data = res.body.data;
					this.items.splice(0, this.items.length);
					if(res.body.code == 0) {
						$.each(data, (key, val) => {
							//self.items.splice(0, self.items.length);
							this.allLoaded = false;
							this.items.push(val);
							this.itemsStart = start;

						});
						this.$refs.loadmore.onTopLoaded();
					} else {
						this.allLoaded = true;
					}
				}, (error) => {
					if(error.status == 401) {
						this.tips = "用户失效，请登录"
						this.popupVisible1 = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible1 = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tips = "网络不稳定，页面丢失"
						this.popupVisible1 = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible1 = false
						}, 1500)
					}
				})
				this.allLoaded = false;
				
			},
			loadBottom() {
				start += 1;
				this.$http.get(getOpenUrl() + "/special_list", {
					params:{
						catid: this.$route.query.cat_id,
						page: start,
						limit: size,
						order: order,
						sort: sort
					},
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then((res) => {
					//					this.items.splice(0, this.items.length);
					this.allData = res.body;
					var data = res.body.data;
					this.brand = res.body.brand_list
					this.com = res.body.company
					if(res.body.code == 0) {
						this.$refs.loadmore.onBottomLoaded();
						$.each(data, (key, val) => {
							this.items.push(val);
							this.itemsStart = start;
						});
						$.each(this.allData.brand, (key, val) => {
							if(val.value_data != undefined) {
								this.brandData.push(val);
							}
						});
						$.each(this.allData.company_data, (key, val) => {
							if(val.value_data != undefined) {
								this.comData.push(val);
							}
						});
					} else {
						this.allLoaded = false;
					}
				}, (error) => {
					if(error.status == 401) {
						this.tips = "用户失效，请登录"
						this.popupVisible1 = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible1 = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tips = "网络不稳定，页面丢失"
						this.popupVisible1 = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible1 = false
						}, 1500)
					}
				})
				//				this.getData(catid,start, size, order, sort)
			},
			fanwei(attr_id){
				console.log("range_min"+attr_id)
				this.rang_min="range_min"+attr_id
				this.rang_max="range_max"+attr_id
			},
			getData(catid, start, size, order, sort,area_id,brand_id,company_id,price_id) {
				this.loading=true
				this.area_id=area_id
				this.brand_id=brand_id
				this.company_id=company_id
				this.price_id=price_id
//				var data={
//					catid: this.$route.query.cat_id,
//					page: start,
//					limit: size,
//					order: order,
//					sort: sort,
//					area_id:this.area_id,
//					brand_id:this.brand_id,
//					company_id:this.company_id,
//					price_id:this.price_id,
//					goodname:this.goodname
//				}
				
				this.$http.get(getOpenUrl() + "/special_list", {
					params:{
						catid: this.$route.query.cat_id,
						page: start,
						limit: size,
						order: order,
						sort: sort,
						area_id:this.area_id,
						brand_id:this.brand_id,
						company_id:this.company_id,
						price_id:this.price_id,
						goodname:this.goodname
					},
					headers: {
						"Authorization": "Bearer " + getToken()
					}
				}).then((res) => {
					this.loading=false
					this.items.splice(0, this.items.length);
					this.brandData.splice(0, this.brandData.length);
					this.comData.splice(0, this.comData.length);
					this.allData = res.body;
					var data = res.body.data;
					this.brand = res.body.brand_list
					this.com = res.body.company
					
					if(res.body.code == 0) {
						this.$refs.loadmore.onBottomLoaded();
						$.each(data, (key, val) => {
							this.items.push(val);
							this.itemsStart = start;
						});
						$.each(this.allData.brand, (key, val) => {
							if(val.value_data != undefined) {
								this.brandData.push(val);
							}
						});
						$.each(this.allData.company_data, (key, val) => {
							if(val.value_data != undefined) {
								this.comData.push(val);
							}
						});
					} else {
						this.loading=false
						this.allLoaded = false;
					}
				}, (error) => {
					if(error.status == 401) {
						this.tips = "用户失效，请登录"
						this.popupVisible1 = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible1 = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tips = "网络不稳定，页面丢失"
						this.popupVisible1 = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible1 = false
						}, 1500)
					}
				})
			},
			//分类
			getData1() {
				this.loading = true
				this.$http.get(getOpenUrl() + "catetree", {
					params: {
						catid: 4,
						level: 1
					},
					headers: {
						'Authorization': 'Bearer ' + getToken()
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
				console.log(this.CData)
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
						level: 1
					},
				}).then((res) => {
					this.loading = false
					var list = res.body.data;
					if(res.body.code == '0000') {
						var data = {};
						data.pcatid = list[0].parentid;
						data.list   = list;
						this.CData.push(data);
						this.getCData1(list[0].catid);
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
			getCData1(catid) {
				this.loading = true
				this.pcatid1 = catid;
				var isCurData = false;
				$.each(this.childData, function(key, val) {
					if(val.pcatid1 == catid && val.list) {
						isCurData = true;
						this.loading = false
						return;
					}
				});
				if(isCurData) {
					this.loading = false
					return;
				}
				this.$http.post(getOpenUrl() + 'catrgory_item', {
					catid: catid
				}, {
					headers: {
						'Authorization': 'Bearer ' + getToken()
					}
				}).then((res) => {
					this.loading = false
					var list = res.body.data;
					if(res.body.code == '0000') {
						var data = {};
						data.pcatid1 = list[0].parentid;
						data.list = list;
						this.childData.push(data);
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
		},
		components: {
			//组件
			swiper,
			swiperSlide
		},
		computed: {
			swiperTab() {
				return this.$refs.mySwiperTab.swiper
			},
			swiperCon() {
				return this.$refs.mySwiperCon.swiper
			},
			//厂家
			swiperTabcj() {

				return this.$refs.mySwiperTabcj.swiper
			},
			swiperConcj() {
				return this.$refs.mySwiperConcj.swiper
			},
			swiperTab1() {
				return this.$refs.mySwiperTab1.swiper
			},
			swiperCon1() {
				return this.$refs.mySwiperCon1.swiper
			}
		},
		created() {
			this.start = 1;
			this.size = 7;
			this.order = 'listorder';
			this.sort = "desc";
			this.catid = this.$route.query.catid;
			this.getData(this.catid, this.start, this.size, this.order, this.sort);
		}
	}
</script>

<style scoped>
	.products>>>.mint-indexlist-content{
		height:12rem !important;
	}
	.mark {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 99;
	}
	
	.ano-chang ul {
		width: calc(50% - 0.05rem);
		font-size: 0.2rem;
		background: #fff;
		margin-bottom: 0.1rem;
		float: left;
	}
	
	.ano-chang ul:nth-of-type(odd) {
		margin-right: 0.05rem;
	}
	
	.ano-chang ul:nth-of-type(even) {
		margin-left: 0.05rem;
		margin-right: 0;
	}
	
	.ano-chang ul li img {
		width: 100%;
		object-fit: cover;
		height: 3.15rem;
		display: block;
	}
	
	.products {
		background: #f2f2f2;
	}
	
	.products>>>.swiper-container-autoheight,
	.swiper-container-autoheight .swiper-slide {
		/*height: 100%;*/
	}
	
	.left-fenlei {
		width: 2.6rem;
		height: calc(100% - 0.6rem);
		float: left;
		background: #fff;
		overflow: auto;
	}
	
	.left-fenlei .fenlei-nav {
		height: 0.5rem;
		background: #fff;
		border-bottom: 1px solid #ccc;
		padding-left: 0.26rem;
		padding-top: 0.3rem;
	}
	
	.fenlei-nav-content {
		padding-left: 0.2rem;
		padding-top: 0.2rem;
	}
	
	.nav-content-item {
		width: 2rem;
		height: 0.5rem;
		color: #60646d;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.right-fenlei {
		width: calc(100% - 2.6rem);
		height: calc(100% - 0.6rem);
		position: absolute;
		top: 0.1rem;
		right: 0;
		overflow: auto;
	}
	
	.right-fenlei .right-fenlei-nav {
		margin-left: 0.2rem;
		padding-top: 0.26rem;
		background: url(../../../static/images/chanpin/onArrow.png) no-repeat 90%;
		background-size: 0.3rem;
		transition: all .3s ease-in;
	}
	
	.right-fenlei .right-fenlei-item.select .right-fenlei-nav {
		border-bottom: 1px solid #fe7f44;
		background: url(../../../static/images/chanpin/downArrow.png) no-repeat 90%;
		background-size: 0.3rem;
	}
	
	.right-fenlei .right-fenlei-item.select .right-fenlei-nav span {
		color: #fe7f44;
	}
	
	.right-fenlei .right-fenlei-nav span {
		width: 1.8rem;
		min-height: 0.5rem;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	#swiper-container2 {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		overflow: visible;
		position: fixed;
		background: #Fff;
		z-index: 6;
		width: 100%;
	}
	
	#swiper-container2 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	#swiper-container2 .active-nav {
		background: #fff !important;
	}
	
	#swiper-container2 .active-nav span {
		display: inline-block;
		border-bottom: 2px solid #ff7738;
		color: #ff7738 !important;
		/*margin-bottom: -1px;*/
	}
	/*厂家*/
	
	#swiper-container21 {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		overflow: visible;
		position: fixed;
		background: #Fff;
		z-index: 6;
		width: 100%;
	}
	
	#swiper-container21 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	#swiper-container21 .active-nav1 {
		background: #fff !important;
	}
	
	#swiper-container21 .active-nav1 span {
		display: inline-block;
		border-bottom: 2px solid #ff7738;
		color: #ff7738 !important;
		/*margin-bottom: -1px;*/
	}
	
	.swiper-slide {
		color: #000;
	}
	
	#swiper-container2 .swiper-slide.shux:after {
		content: "";
		position: absolute;
		top: 25%;
		right: 0;
		height: 50%;
		width: 1px;
		background: #ccc;
	}
	
	.cell {
		height: 0.8rem;
		line-height: 0.8rem;
		padding-left: 0.2rem;
		font-size: 0.24rem;
		background: #fff;
		border-top: 1px solid #ccc;
	}
	
	.cell.select {
		background: url(../../../static/images/chanpin/yellowYes.png) no-repeat 90%;
		background-size: 0.3rem;
	}
	
	.indexlist-content {
		width: 100%;
		overflow-y: scroll;
	}
	
	.indexlist-header {
		width: 100%;
		height: 0.9rem;
		position: relative;
	}
	
	.indexlist-header span {
		position: absolute;
		line-height: 0.9rem;
		font-size: 0.26rem;
		color: #000;
		position: absolute;
		left: 50%;
	}
	
	.indexlist-header i {
		font-size: 0.24rem;
		line-height: 0.9rem;
		display: block;
		float: right;
		font-style: normal;
		color: #9e9ea3;
		margin-right: 0.2rem;
	}
	
	.indexlist-a1 {
		width: 0.2rem;
		height: 0.4rem;
		display: block;
		background: url(../../../static/images/leftback.png) no-repeat;
		margin-left: 0.24rem;
		margin-top: 0.24rem;
		background-size: 0.2rem;
		float: left;
	}
	
	.indexlist-a1>>>.swiper-container-autoheight,
	.swiper-container-autoheight .swiper-slide {
		height: 100%;
	}
	/*按钮样式*/
	
	.nav-right {
		float: left;
	}
	
	.nav-right .li4 {
		float: left;
	}
	
	label {
		border-radius: 50%;
		display: block;
	}
	
	input[type="radio"] {
		display: none;
	}
	
	input[type="radio"]+b {
		display: block;
		width: 0.42rem;
		height: 0.42rem;
		border-radius: 50%;
		background: #e5e5e5;
		border: 0.01rem solid #c2c2c2;
	}
	
	input[type="radio"]:checked+b {
		background: #e5e5e5 url(../../../static/images/personal/personalicon/checkbox.png)no-repeat;
		background-size: 0.42rem 0.42rem;
	}
	
	.index-box {
		width: 100%;
		padding-left: 0.2rem;
		margin-bottom: 0.2rem;
	}
	
	.index-box:after {
		content: "";
		display: block;
		clear: both;
		overflow: hidden;
		height: 0;
	}
	
	.index-box span {
		display: block;
		font-size: 0.3rem;
		float: left;
		margin: 0 0.1rem;
	}
	.button-box {
		width: 100%;
		height: 0.8rem;
		border-top: 1px solid #f0f2f5;
		overflow: hidden;
		position: fixed;
		bottom: 0;
	}
	
	.button-box .button {
		width: 50%;
		height: 100%;
		text-align: center;
		padding-top: 0.2rem;
		font-size: 0.24rem;
		float: left;
		border: none;
		outline: none;
		background: #fff;
	}
	
	.fashion-little-box.active {
		color: #ff7738;
		border: 1px solid #ff7738;
		background: #fff;
	}
	
	.fashion-little-box {
		width: 1rem;
		height: 0.5rem;
		text-align: center;
		line-height: 0.5rem;
		font-size: 0.2rem;
		background: #f0f2f5;
		border-radius: 0.05rem;
		margin-right: 0.3rem;
		margin-bottom: 0.2rem;
		border: 1px solid #f0f2f5;
		padding: 0 0.2rem;
		float: left;
	}
	
	.fashion-little-box span {
		width: 100%;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.fashion-box {
		width: 100%;
		overflow: hidden;
		padding-left: 0.2rem;
	}
	
	.price-interval-content span {
		padding: 0.12rem 0.2rem;
		font-size: 0.2rem;
		background: #f0f2f5;
		border-radius: 0.05rem;
		margin-right: 0.3rem;
		margin-bottom: 0.2rem;
		border: 1px solid #f0f2f5;
		float: left;
	}
	
	.price-interval-content span.active {
		color: #ff7738;
		border: 1px solid #ff7738;
		background: #fff;
	}
	
	.price-interval-content {
		width: 100%;
		padding-left: 0.2rem;
		padding-top: 0.2rem;
		overflow: hidden;
		border-bottom: 1px solid #f0f2f5;
	}
	
	.min-box {
		width: 2.3rem;
		height: 0.5rem;
		background: #f0f2f5;
		border-radius: 0.05rem;
		float: left;
	}
	
	.min-box input[type="text"] {
		width: 100%;
		height: 100%;
		text-align: center;
		display: block;
	}
	
	.min-box input[type="text"]::-webkit-input-placeholder {
		color: #b6b8be;
		font-size: 0.2rem;
	}
	
	.min-max {
		width: 100%;
		padding-left: 0.2rem;
		padding-top: 0.2rem;
		overflow: hidden;
	}
	
	.dangci-shaixuan-box {
		width: 100%;
		background: #fff;
		z-index: 999;
		position: absolute;
		top: 0.7rem;
	}
	
	.dangci-shaixuan-box span {
		font-size: 0.24rem;
		padding: 0.2rem 0.3rem;
		display: block;
	}
	
	.dangci-shaixuan-box span.active {
		color: #ff7738;
		background: url(../../../static/images/chanpin/yellowYes.png) no-repeat 90%;
		background-size: 0.35rem;
	}
	
	.dangci-box {
		width: 100%;
		padding-left: 0.2rem;
		padding-top: 0.3rem;
		overflow: hidden;
	}
	
	.dangci-box span {
		padding: 0.12rem 0.2rem;
		font-size: 0.2rem;
		background: #f0f2f5;
		border-radius: 0.05rem;
		margin-right: 0.3rem;
		margin-bottom: 0.2rem;
		float: left;
		border: 1px solid #f0f2f5;
	}
	
	.dangci-box span.active {
		color: #ff7738;
		border: 1px solid #ff7738;
		background: #fff;
	}
	
	.changjia-box {
		width: 100%;
		padding-left: 0.2rem;
		padding-top: 0.3rem;
		overflow: hidden;
	}
	
	.changjia-box span {
		padding: 0.12rem 0.2rem;
		font-size: 0.2rem;
		background: #f0f2f5;
		border-radius: 0.05rem;
		margin-right: 0.3rem;
		margin-bottom: 0.2rem;
		float: left;
		border: 1px solid #f0f2f5;
		width: 1rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
	}
	
	.changjia-box span.active {
		color: #ff7738;
		border: 1px solid #ff7738;
		background: #fff;
	}
	
	.city-box span {
		padding: 0.12rem 0.2rem;
		font-size: 0.2rem;
		background: #f0f2f5;
		border-radius: 0.05rem;
		text-align: center;
		min-width: 0.6rem;
		margin-right: 0.3rem;
		margin-bottom: 0.2rem;
		float: left;
		border: 1px solid #f0f2f5;
	}
	
	.city-box span.active {
		color: #ff7738;
		border: 1px solid #ff7738;
		background: #fff;
	}
	
	.city-box {
		width: 100%;
		padding-left: 0.2rem;
		padding-top: 0.3rem;
		overflow: hidden;
	}
	
	.all-fenlei {
		width: 85%;
		height: 100%;
	}
	
	.all-fenlei-header {
		width: 100%;
		height: 0.5rem;
		padding-left: 0.2rem;
	}
	
	.all-fenlei-header p {
		font-size: 0.24rem;
		line-height: 0.5rem;
		color: #000;
		float: left;
	}
	
	.all-fenlei-header .goAll {
		width: 1rem;
		line-height: 0.5rem;
		font-size: 0.2rem;
		display: block;
		background: url(../../../static/images/chanpin/backRight.png) no-repeat 0.6rem 0.1rem;
		background-size: 0.2rem 0.3rem;
		color: #4e515b;
		margin-right: 0.2rem;
		float: right;
	}
	
	.tab.active {
		color: #ff7738;
	}
	
	.jiage.actived {
		color: #ff7738;
	}
	
	.jc-sanjiao {
		height: 100%;
		display: block;
	}
	
	.jc-sanjiao:after {
		content: "";
		display: inline-block;
		width: 9px;
		height: 11px;
		margin-left: 4px;
		background: url(../../../static/images/chanpin/arrow_block.png) no-repeat center;
		background-size: 0.2rem auto;
	}
	
	.jc-sanjiao.arrow-up:after {
		background: url(../../../static/images/chanpin/arrow_up.png) no-repeat center;
		background-size: 0.2rem auto;
	}
	
	.jc-sanjiao.arrow-down:after {
		background: url(../../../static/images/chanpin/arrow_down.png) no-repeat center;
		background-size: 0.2rem auto;
	}
	
	.tab.dangci.active .bottom-sanjiao {
		background: url(../../../static/images/chanpin/bottomSanjiao_.png) no-repeat;
		background-size: 0.2rem;
		transition: all .2s ease-in;
	}
	
	.tab.dangci .bottom-sanjiao.dcsx {
		transform: rotate(-180deg);
	}
	
	.bottom-sanjiao {
		width: 0.2rem;
		height: 0.2rem;
		position: absolute;
		margin-top: 0.28rem;
		margin-left: 0.1rem;
		background: url(../../../static/images/chanpin/bottomSanjiao.png) no-repeat;
		background-size: 0.2rem;
	}
	
	.tab.actived .bottom-sanjiao {
		background: url(../../../static/images/chanpin/bottomSanjiao_.png) no-repeat;
		background-size: 0.2rem;
	}
	
	.top-sanjiao {
		width: 0.2rem;
		height: 0.2rem;
		position: absolute;
		margin-top: 0.01rem;
		margin-left: 0.088rem;
		background: url(../../../static/images/chanpin/topSanjiao.png) no-repeat;
		background-size: 0.2rem;
	}
	
	.tab.active .top-sanjiao {
		background: url(../../../static/images/chanpin/topSanjiao_.png) no-repeat;
		background-size: 0.2rem;
	}
	
	.tabs.sx {
		width: 25%;
		color: #ff7738;
		background: url(../../../static/images/chanpin/redsx.png) no-repeat 90%;
		background-size: 0.32rem;
	}
	
	.dangci {
		width: 25%;
		position: relative;
	}
	
	.chanpin-tab {
		width: 100%;
		display: flex;
		position: relative;
		/*margin-top: 1.1rem;*/
	}
	
	.tab {
		width: 33.3%;
		font-size: 0.24rem;
		float: left;
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
	}
	
	.tabs {
		width: 25%;
		font-size: 0.24rem;
		float: left;
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
	}
	
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.6rem;
		z-index: 999;
		background: #f0f2f5;
		border-bottom: 1px solid #dcdcdc;
		padding-top: 0.4rem;
	}
	
	.header-top {
		padding: 0 0.24rem;
	}
	
	.header .a1 {
		width: 0.32rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/chanpin/leftArrow.png) no-repeat 0 50%;
		background-size: 0.4rem 0.32rem;
		float: left;
	}
	
	.header .a2 {
		width: 0.42rem;
		height: 0.88rem;
		display: block;
		background: url(../../../static/images/chanpin/shaixuan.png) no-repeat 0 50%;
		background-size: 0.42rem 0.36rem;
		float: right;
	}
	
	.header .a2.active {
		background: url(../../../static/images/chanpin/shaixuan_.png) no-repeat 0 50%;
		background-size: 0.46rem auto;
	}
	
	.header-search {
		height: 0.58rem;
		width: calc(100% - 1.2rem);
		border-radius: 0.05rem;
		background: #fff;
		float: left;
		margin-left: 0.3rem;
		margin-top: 0.17rem;
	}
	
	.header-search input {
		display: block;
		font-size: 0.22rem;
		color: #7e7e7d;
		height: 0.58rem;
		line-height: 0.58rem;
		width: calc(100% - 0.47rem);
		background: url(../../../static/images/searchlogo.png) no-repeat 0.12rem 50%;
		background-size: 0.25rem;
		padding-left: 0.47rem;
	}
	
	.chang {
		margin: 0 0.24rem;
		margin-top: 0.2rem;
		margin-bottom: 5px;
		overflow: hidden;
		display: flex;
		background: #fff;
		box-shadow: 0 2px 5px #AAABAD;
	}
	
	.chang-left {
		width: 1.3rem;
		height: 1.3rem;
		float: left;
		margin-top: 0.2rem;
		margin-left: 0.18rem;
	}
	
	.chang-left img {
		width: 1.3rem!important;
		height: 1.3rem!important;
	}
	
	.chang-center {
		float: left;
		flex: 1;
		margin-left: 0.27rem;
	}
	
	.chang-center ul {
		margin-top: 0.2rem;
	}
	
	.changli1 {
		font-size: 0.24rem;
		color: #3F3F4E;
		line-height: 0.36rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	
	.changli2 {
		margin-top: 0.05rem;
		font-size: 0.24rem;
		color: #ff7738;
		line-height: 0.24rem;
	}
	
	.changli3 {
		margin-top: 0.05rem;
		font-size: 0.22rem;
		color: #74747d;
		line-height: 0.24rem;
	}
	
	.chang-right {
		width: 0.38rem;
		height: 1.7rem;
		margin-left: 0.32rem;
		margin-right: 0.18rem;
		background: url(../../../static/images/index/rightorange.png) no-repeat 0 50%;
		background-size: 0.38rem auto;
		float: right;
	}
	/*分类*/
	
	.nav {
		position: absolute;
		top: 0.88rem;
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
		width: 50%;
		box-sizing: border-box;
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
		width: 100%;
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
		width: calc(50% - 0.16rem);
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
		width: 100%;
		border-radius: 0.05rem;
		overflow: hidden;
	}
	
	.content .content-b ul {
		/*padding: 0.2rem;*/
		overflow: hidden;
	}
	
	.content .content-b ul li {
		line-height: 0.3rem;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		width: 100%;
		float: left;
		/*text-align: center;*/
		box-sizing: border-box;
	}
	
	.content .content-b ul li span {
		width: 100%;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	#swiper-container22 {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		overflow: visible;
		position: fixed;
		background: #Fff;
		z-index: 6;
		width: 100%;
	}
	
	#swiper-container22 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	#swiper-container22 .active-nav2 {
		background: #fff !important;
	}
	
	#swiper-container22 .active-nav2 span {
		display: inline-block;
		border-bottom: 2px solid #ff7738;
		color: #ff7738 !important;
		/*margin-bottom: -1px;*/
	}
</style>