<template>
	<div class="home">
		<iheader :type="type"></iheader>
		<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab" style="position: fixed;top: 1.28rem;width: 100%;border-bottom: 1px solid #eee;">
			<swiper-slide class="active-nav body_bottom" type="tuijian"><span>推荐</span></swiper-slide>
			<swiper-slide class="body_bottom" type="zhaochanpin"><span>找产品</span></swiper-slide>
			<swiper-slide class="body_bottom" type="zhaochangjia"><span>找厂家</span></swiper-slide>
			<swiper-slide class="body_bottom" type="fangan"><span>方案</span></swiper-slide>
			<swiper-slide class="body_bottom" type="zhuanti"><span>专题</span></swiper-slide>
			<swiper-slide class="body_bottom" type="xuanyong"><span>选用</span></swiper-slide>
			<swiper-slide class="body_bottom" type="zixun"><span>资讯</span></swiper-slide>
			<swiper-slide class="body_bottom" type="fujin"><span>附近</span></swiper-slide>
		</swiper>
		<div style="font-size: 0.2rem;padding-top: 1.98rem;padding-bottom: 0.97rem;">
			<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
				<!--推荐-->
				<swiper-slide>
					<div class="max">
						<scroller lock-x scrollbar-y use-pulldown height="100%" @on-pulldown-loading="refresh" :pulldown-config="upobj" ref="scrollertuijian">

							<div class="first" type="tuijian" contype="tuijian">
								<div class="banner">
									<div class="slide">
										<swiper1 auto loop height="3.2rem">
											<swiper-item class="black" v-for="(banner,index) in bannerData">
												<img :src="banner.ad_code" @click="adJump(banner)" />
											</swiper-item>
										</swiper1>
									</div>
								</div>
								<div class="navigation">
									<swiper :options="swiperOptionImg1" id="swiper-container2" ref="mySwiperImg1">
										<swiper-slide style="flex: 1;" v-for="(list,index) in this.listData.category" :key="index">
											<router-link :to="{path:'/products',query:{cat_id:list.catid}}">
												<dl>
													<dt><img v-lazy="list.web_icon"/></dt>
													<dd>{{list.catname}}</dd>
												</dl>
											</router-link>
										</swiper-slide>
									</swiper>
								</div>

								<div class="content">
									<div class="content-top">
										<span>最新动态</span>
										<swiper :options="swiperOptionImg2" id="swiper-container2" ref="mySwiperImg2" style="height: 0.7rem;width: calc(100% - 1.8rem)!important;margin-left: 1.8rem;">
											<swiper-slide v-for="(tip,index) in tipData">
												<p @click="adJump(tip)">{{tip.title}}</p>
											</swiper-slide>
										</swiper>
									</div>
									<!--<a href="#/search">-->
									<div class="content-bottom">
										<ul class="ul1">
											<router-link :to="{path:'/search',query:{type:'product'}}">
												<li class="li1">
													<img src="../../../static/images/index/zhaochanpin.png" />
												</li>
											</router-link>
										</ul>
										<ul class="ul2">
											<router-link :to="{path:'/search',query:{type:'zhaochangjia'}}">
												<li class="li2">
													<img src="../../../static/images/index/zhaochangjia.png" />
												</li>
											</router-link>
											<router-link :to="{path:'/search',query:{type:'fangan'}}">
												<li class="li3">
													<img src="../../../static/images/index/zhaojiejuefangan.png" />
												</li>
											</router-link>
										</ul>
									</div>
									<!--</a>-->
								</div>
								<div class="content1">
									<div class="content-top1">
										<span>推荐产品</span>
									</div>
									<div class="content-bottom1">
										<div class="conbt-top">
											<!---->
											<router-link :to="{ path: 'finddetail', query: {catid:this.tuijianbanner.type_id,id:this.tuijianbanner.ad_id}}">
											<!--<router-link :to="{path:'/pro_details',query:{id:this.tuijianbanner.ad_id}}">-->
												<img v-lazy="this.tuijianbanner.ad_code" />
											</router-link>
										</div>
									</div>
									<div class="conbt-bottom">
										<swiper :options="swiperOptionImg1" id="swiper-container2" ref="mySwiperImg1">
											<swiper-slide style="width: 1.85rem;" v-for="(list,index) in listData.cp_tj" :key="index" v-if="listData.length!=0">
												<div class="swiper">
													<router-link :to="{path:'/pro_details',query:{id:list.id}}">
														<ul class="swiper-ul">
															<li class="swiper-li1"><img v-lazy="list.thumb" /></li>
															<li class="swiper-li2">{{list.title}}</li>
															<li class="swiper-li3" v-text="list.price==0?'面议':'￥'+list.price"></li>
														</ul>
													</router-link>
												</div>
											</swiper-slide>
										</swiper>
									</div>
								</div>
								<div class="content1" style="margin-top: 0.14rem;">
									<div class="content-top1">
										<span>最新产品</span>
									</div>
									<div class="content-bottom">
										<div class="conbt-top">
											<router-link :to="{ path: 'finddetail', query: {catid:this.zuixinbanner.type_id,id:this.zuixinbanner.ad_id}}">
											<!--<router-link :to="{path:'/pro_details',query:{id:this.zuixinbanner.ad_id}}">-->
												<img v-lazy="this.zuixinbanner.ad_code" />
											</router-link>
										</div>
									</div>
									<div class="conbt-bottom">
										<div class="swiper1" v-for="(list,index) in this.listData.cp_new" :key="index" :style="index%2!=0?'width:50%;margin-right:0':''">
											<router-link :to="{path:'/pro_details',query:{id:list.id}}">
												<ul class="swiper1-ul1">
													<li class="swiper1-li1"><img v-lazy="list.thumb" /></li>
													<li class="swiper1-li2">{{list.title}}</li>
													<li class="swiper1-li2" style="font-size: 0.16rem;color: #74747d;margin-top: 0;">{{list.description}}</li>
													<li class="swiper1-li3" v-text="list.price==0?'面议':'￥'+list.price"></li>
												</ul>
											</router-link>
										</div>
									</div>
									<!--<div class="conbt-footer">
								<span>更多新品</span>
							</div>-->
								</div>
								<div class="content1" style="margin-top: 0.14rem;">
									<div class="content-top1">
										<span>最新图集</span>
									</div>
									<div class="conbt-bottom" style="margin-top: 0;">
										<div class="swiper1" v-for="(list,index) in this.listData.zxtj" :key="index" :style="index%2!=0?'width:50%;margin-right:0':''">
											<router-link :to="{ path: 'photodetail', query: {catid: list.catid,id:list.id}}">
												<ul class="swiper1-ul1">
													<li class="swiper1-li1"><img v-lazy="list.thumb" /></li>
													<li class="swiper1-li2">{{list.title}}</li>
													<li class="swiper1-li2" style="font-size: 0.16rem;color: #898991;margin-top: 0;">{{list.description}}</li>
												</ul>
											</router-link>
										</div>
									</div>
									<div class="conbt-footer">
										<a style="color: #e5e5e5;" href="#/photo">
											<span>更多图集</span>
										</a>
									</div>
								</div>
								<div class="content1" style="margin-top: 0.14rem;">
									<div class="content-top1">
										<span>热门资讯</span>
									</div>
									<div class="content-bottom1">
										<div class="conbt-top">
											<router-link :to="{ path: 'finddetail', query: {catid:this.zixunbanner.type_id,id:this.zixunbanner.ad_id}}">
											<img v-lazy="this.zixunbanner.ad_code" />
											</router-link>
										</div>
									</div>
									<div class="conbt-bottom">
										<swiper :options="swiperOptionImg1" id="swiper-container2" ref="mySwiperImg1">
											<swiper-slide style="width: 3.46rem;" v-for="(list,index) in this.listData.information_data" :key="index">
												<router-link :to="{ path: 'finddetail', query: {catid:list.catid,id:list.id}}">
													<div class="swiper2">
														<ul class="swiper2-ul">
															<li class="swiper2-li1"><img v-lazy="list.thumb" /></li>
															<li class="swiper2-li2" v-html="list.title"></li>
														</ul>
													</div>
												</router-link>
											</swiper-slide>
										</swiper>
									</div>
								</div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
							</div>
						</scroller>
					</div>
				</swiper-slide>
				<!--产品-->
				<swiper-slide>
					<div  class="max">
						<scroller lock-x scrollbar-y use-pulldown height="100%" @on-pulldown-loading="refresh" :pulldown-config="upobj" ref="scrollerchanpin">
							<div>
								<div class="first" type="zhaochanpin" contype="zhaochanpin">
									<div class="navigation">
										<swiper :options="swiperOptionImg1" id="swiper-container2" ref="mySwiperImg1">
											<swiper-slide style="flex: 1;" v-for="(list,index) in this.listData.category" :key="index">
												<router-link :to="{path:'/products',query:{cat_id:list.catid}}">
													<dl>
														<dt><img v-lazy="list.web_icon"/></dt>
														<dd>{{list.catname}}</dd>
													</dl>
												</router-link>
											</swiper-slide>
										</swiper>
									</div>
									<div class="content1" style="margin-top: 0.14rem;">
										<div class="content-top1">
											<span>推荐产品</span>
										</div>
										<div class="content-bottom">
											<div class="conbt-top">
												<router-link :to="{path:'/pro_details',query:{id:this.zuixinbanner.ad_id}}">
													<img v-lazy="this.zuixinbanner.ad_code" />
												</router-link>
											</div>
										</div>
										<div class="conbt-bottom">
											<div class="swiper1" v-for="(list,index) in this.chanpinData.cp_new" :key="index" :style="index%2!=0?'width:50%;margin-right:0':''">
												<router-link :to="{path:'/pro_details',query:{id:list.id}}">
													<ul class="swiper1-ul1">
														<li class="swiper1-li1"><img v-lazy="list.thumb" /></li>
														<li class="swiper1-li2">{{list.title}}</li>
														<li class="swiper1-li2" style="font-size: 0.16rem;color: #898991;margin-top: 0;">{{list.description}}</li>
														<li class="swiper1-li3" v-text="list.price==0?'面议':'￥'+list.price"></li>
													</ul>
												</router-link>
											</div>
										</div>
										<!--<div class="conbt-footer">
								<span>更多产品</span>
							</div>-->
									</div>

									<div class="content1" style="margin-top: 0.14rem;">
										<div class="content-top1">
											<span>最新产品</span>
										</div>
										<div class="content-bottom">
											<div class="conbt-top">
												<router-link :to="{path:'/pro_details',query:{id:this.zuixinbanner.ad_id}}">
													<img v-lazy="this.zuixinbanner.ad_code" />
												</router-link>
											</div>
										</div>
										<div class="conbt-bottom">
											<div class="swiper1" v-for="(list,index) in this.chanpinData.cp_new" :key="index" :style="index%2!=0?'width:50%;margin-right:0':''">
												<router-link :to="{path:'/pro_details',query:{id:list.id}}">
													<ul class="swiper1-ul1">
														<li class="swiper1-li1"><img v-lazy="list.thumb" /></li>
														<li class="swiper1-li2">{{list.title}}</li>
														<li class="swiper1-li2" style="font-size: 0.16rem;color: #898991;margin-top: 0;">{{list.description}}</li>
														<li class="swiper1-li3" v-text="list.price==0?'面议':'￥'+list.price"></li>
													</ul>
												</router-link>
											</div>
										</div>
										<!--<div class="conbt-footer">
								<span>更多新品</span>
							</div>-->
									</div>
								</div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
							</div>
						</scroller>
					</div>
				</swiper-slide>
				<!--厂家-->
				<swiper-slide style="background: #fff;">
					<div class="first" type="zhaochangjia" contype="zhaochangjia">
						<div class="page-loadmore" style="font-size: 0.2rem;overflow-y:scroll;height: 8.5rem">
							<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" ref="loadmore">
								<div>
									<router-link class="chang" v-for="(list,index) in changjiaData" :key="index" :to="{ path: 'shop', query: {id: list.id}}">

										<div class="chang-left">
											<img v-lazy="list.thumb" />
										</div>
										<div class="chang-center" style="position: relative;">
											<ul>
												<li class="changli1">{{list.title}}</li>

											</ul>
											<ul style="position: absolute;top: 0.85rem;">
												<li class="changli2"><span>{{list.brand_count}}</span>个品牌</li>
												<li class="changli3"><span>{{list.goods_count}}</span>个产品</li>
											</ul>
										</div>
										<div class="chang-right"></div>

									</router-link>
								</div>
							</mt-loadmore>
						</div>
					</div>
				</swiper-slide>
				<!--方案-->
				<swiper-slide>
					<div class="max">
						<scroller lock-x scrollbar-y use-pulldown height="100%" @on-pulldown-loading="refresh" :pulldown-config="upobj" ref="scrollerfangan">
							<div>
								<div class="first" type="fangan" contype="fangan" style="background: #fff;overflow: hidden;">
									<div class="banner">
										<div class="slide">
											<swiper1 :auto="false" :loop="false" height="3.2rem">
												<swiper-item class="black" v-for="(banner,index) in fanganData.ad_data" :key="index">
													<img :src="banner.ad_code" />
												</swiper-item>
											</swiper1>
										</div>
									</div>
									<div class="fenlei">
										<dl v-for="(list,index) in fanganData.solution_parent">
											<router-link :to="{path:'/classify',query:{title:list.catname,catid:list.catid}}">
												<dt><img v-lazy="list.image"/></dt>
												<dd>{{list.catname}}</dd>
											</router-link>
										</dl>
									</div>
								</div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
							</div>
						</scroller>
					</div>
				</swiper-slide>
				<!--专题-->
				<swiper-slide style="background: #fff;">
					<div  class="max">
						<scroller lock-x scrollbar-y use-pulldown height="100%" @on-pulldown-loading="refresh" :pulldown-config="upobj" ref="scrollerzhuanti">
							<div>
								<div class="first" type="zhuanti" contype="zhuanti">
									<div class="banner">
										<div class="slide">
											<swiper1 :auto="false" :loop="false" height="3.2rem">
												<swiper-item class="black" v-for="(banner,index) in zhuantiData.ad_data" :key="index">
													<img :src="banner.ad_code" />
												</swiper-item>
											</swiper1>
										</div>
									</div>
									<swiper :options="swiperOptionTabzt" id="swiper-container21" ref="mySwiperTabzt">
										<swiper-slide :class="index==0 ? 'active-nav1' : ''" v-for="(list, index) in catData" :catid="list.catid"><span>{{list.catname}}</span></swiper-slide>
										<swiper-slide><span>产品专题</span></swiper-slide>
									</swiper>
									<swiper :options="swiperOptionConzt" id="swiper-container3" ref="mySwiperConzt">
										<swiper-slide v-for="(list, index) in catData">
											<div class="first" id="zhuanti">
												<router-link :to="{ path: 'finddetail', query: {catid:data.catid,id:data.id}}" v-for="(data,index) in list.listData">
													<div class="zhuantilist">
														<img v-lazy="data.thumb" />
														<ul>
															<li class="li1">{{data.title}}</li>
															<li class="li2">
																<span class="sp1">{{data.updatetime}}</span>
																<span class="sp2">{{data.read_count}}</span>
															</li>
														</ul>
													</div>
												</router-link>
											</div>
										</swiper-slide>
										<swiper-slide>
											<div class="first">
												<div class="fenlei">
													<dl v-for="(list,index) in chanpinzhuantiData">
														<router-link :to="{path:'/zhuanti',query:{title:list.catname,catid:list.catid}}">
															<dt><img v-lazy="list.image"/></dt>
															<dd>{{list.catname}}</dd>
														</router-link>
													</dl>
												</div>
											</div>
										</swiper-slide>
									</swiper>
								</div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
							</div>
						</scroller>
					</div>
				</swiper-slide>
				<!--选用-->
				<swiper-slide>
					<div  class="max">
						<scroller lock-x scrollbar-y use-pulldown height="100%" @on-pulldown-loading="refresh" :pulldown-config="upobj" ref="scrollerxuanyong">
							<div>
								<div class="first" type="xuanyong" contype="xuanyong" style="position: relative;bottom: 0.88rem;top: 0;">
									<div class="banner">
										<div class="slide">
											<swiper1 :auto="false" :loop="false" height="3.2rem">
												<swiper-item class="black" v-for="(banner,index) in xuanyongData.ad_data" :key="index">
													<img :src="banner.ad_code" />
												</swiper-item>
											</swiper1>
										</div>
									</div>
									<div class="year">
										<ul>
											<li v-for="(list,index) in xuanyongData.cateList">
												<router-link :to="{path:'/xydetail',query:{catid:list.catid,title:list.catname}}" style="color: #3F3F4E;">
													{{list.catname}}
												</router-link>
											</li>
										</ul>
									</div>
									<div class="xylist">
										<router-link :to="{path:'/xydetail',query:{catid:list.catid,title:list.catname}}" v-for="(list,index) in xuanyongData.cateList">
											<div class="xy-bottom">

												<div class="xy-b-l">
													<img v-lazy="list.image" />
												</div>
												<div class="xy-b-r">
													<ul>
														<li class="li1">{{list.catname}}</li>
														<li class="li2">{{list.description}}</li>
													</ul>
												</div>

											</div>
										</router-link>
									</div>
								</div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
							</div>
						</scroller>
					</div>
				</swiper-slide>
				<!--资讯-->
				<swiper-slide>
					<div  class="max">
						<scroller lock-x scrollbar-y use-pulldown height="100%" @on-pulldown-loading="refresh" :pulldown-config="upobj" ref="scrollerzixun">
							<div>
								<div class="first" type="zixun" contype="zixun">
									<div class="banner">
										<div class="slide">
											<swiper1 :auto="false" :loop="false" height="3.2rem">
												<swiper-item class="black" v-for="(banner,index) in zixunData.ad_data" :key="index">
													<img :src="banner.ad_code" />
												</swiper-item>
											</swiper1>
										</div>
										<div class="year">
											<ul>
												<li v-for="(list,index) in zixunData.zixun">
													<router-link :to="{path:'/zxlist',query:{catid:list.catid,title:list.catname}}" style="color: #3F3F4E;">
														{{list.catname}}
													</router-link>
												</li>
											</ul>
										</div>
									</div>
									<div class="zx" v-for="(list,index) in zixunData.list_data">
										<div class="zx-top">
											<ul>
												<li class="li1">{{list.catname}}</li>
												<router-link :to="{path:'/zxlist',query:{catid:list.catid,title:list.catname}}">
													<li class="li2">更多</li>
												</router-link>
											</ul>
										</div>
										<div class="zx-bottom" v-for="(data,index) in list.data">
											<router-link :to="{ path: 'finddetail', query: {catid:data.catid,id:data.id}}">
												<div class="zx-b-l">
													<img v-lazy="data.thumb" />
												</div>
												<div class="zx-b-r">
													<ul>
														<li class="li1">
															<span class="sp1"></span>
															<span class="sp2">{{data.title}}</span>
														</li>
													</ul>
												</div>
											</router-link>
										</div>
										<router-link :to="{path:'/zxlist',query:{catid:list.catid,title:list.catname}}">
											<div class="zx-footer">更多资讯</div>
										</router-link>
									</div>
									<!--<div class="articles">
							<div class="nav1">
								<div class="nav1-top">
									<div class="line"></div>
									<div class="nav1-p1">阅读排行</div>
									<div class="r"></div>
								</div>
							</div>
							<div class="nav-list">
								<ul v-for="(list,index) in listData1">
									<li @click="zixun1(list.catid, list.id)">{{list.title}}</li>
								</ul>
							</div>
						</div>-->
								</div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
								<div style="height: 0.97rem;"></div>
							</div>
						</scroller>
					</div>
				</swiper-slide>
				<!--附近-->
				<swiper-slide>
					<div class="first" type="fujin" contype="fujin">
						<nearby></nearby>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tips" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
		<!--<my-footer></my-footer>-->
	</div>
</template>

<script>
	import { Scroller, Swiper, SwiperItem, Spinner } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl, getToken, adUrl } from '../../assets/js/common.js';
	import nearby from './nearby.vue'
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	import { Loadmore } from 'mint-ui';
	Vue.component(Loadmore.name, Loadmore);
	export default {
		data() {
			return {
				allLoaded: false,
				scrollMode: "auto",
				loading: false,
				popupVisible: false,
				tips: '',
				type: "",
				//推荐
				listData: [],
				bannerData: [],
				tuijianbanner: [],
				zuixinbanner: [],
				zixunbanner: [],
				//产品
				chanpinData: [],
				//厂家
				changjiaData: [],
				//方案
				fanganData: [],
				fanganbannerData: [],
				//专题
				zhuantiData: [],
				chanpinzhuantiData: [],
				listsData: [],
				catData: [],
				//选用
				xuanyongData: [],
				//资讯
				zixunData: [],
				listData1: [],
				//附近
				fujinData: [],
				//最新动态
				tipData: [],
				//轮播图
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					//					autoplay: 2500,
					loop: true,
					spaceBetween: 0,
					autoplayDisableOnInteraction: false,
					observer: true,
					observeParents: true
				},
				//第一个swiper
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 6
				},
				swiperOptionCon: {
					autoHeight: true,
					notNextTick: true,
					onlyExternal: true
				},
				//第二个swiper
				swiperOptionTabzt: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
				},
				swiperOptionConzt: {
					autoHeight: true,
					notNextTick: true,
					onlyExternal: true
				},
				//第三个swiper
				swiperOptionImg: {
					slidesPerView: "auto",
					spaceBetween: 5,
					onlyExternal: true
				},
				swiperOptionImg1: {
					slidesPerView: "auto",
					spaceBetween: 5,
				},
				swiperOptionImg2: {
					paginationClickable: true,
//					slidesPerView: "auto",
					autoplay: 2000,
//					spaceBetween: 5,
					onlyExternal: true,
					direction : 'vertical',
					autoplayDisableOnInteraction : false,
					paginationClickable: true,
					observer:true,
            			observeParents:true,
					loop : true,
				},
				upobj: {
					content: '请下拉刷新数据',
					pullUpHeight: 60,
					height: 40,
					autoRefresh: false,
					downContent: '请下拉刷新数据',
					upContent: '松手即刷新',
					loadingContent: '加载中...',
					clsPrefix: 'xs-plugin-pullup-'
				}
			};
		},
		components: {
			swiper,
			swiperSlide,
			nearby,
			Scroller,
			'swiper1': Swiper,
			SwiperItem,
			Spinner
		},
		computed: {
			//第一个swiper
			swiperTab() {
				return this.$refs.mySwiperTab.swiper
			},
			swiperCon() {
				return this.$refs.mySwiperCon.swiper
			},
			//第二个swiper
			swiperTabzt() {
				return this.$refs.mySwiperTabzt.swiper
			},
			swiperConzt() {
				return this.$refs.mySwiperConzt.swiper
			}
		},
		mounted() {
			this.catid = 52;
			this.page = 1;
			this.type = 'tuijian';
			//第一个swiper
			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
			//第一个swiper
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
			$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
			swiperCon.on('slideChangeEnd', (obj) => {
				window.scrollTo(0, 0)
				this.type = $('#swiper-container2 .active-nav').attr('type')
				this.getData(this.type, this.page);
			});
			//第二个swiper
			var swiperTabzt = this.swiperTabzt;
			var swiperConzt = this.swiperConzt;
			//第二个swiper
			swiperTabzt.on('tap', function(obj) {
				swiperConzt.slideTo(obj.clickedIndex);
			});
			swiperConzt.on('slideChangeStart', function(obj) {
				$('#swiper-container21 .active-nav1').removeClass('active-nav1')
				var activeNav = $('#swiper-container21 .swiper-slide').eq(obj.activeIndex).addClass('active-nav1');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTabzt.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTabzt.width / activeNav.width()) - 1
						swiperTabzt.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTabzt.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperConzt.on('slideChangeEnd', (obj) => {
				window.scrollTo(0, 0)
				//this.listsData.splice(0, this.listsData.length);
				$(".swiper-wrapper,.swiper-slide").css("height", 'auto')
				var self = this;
				this.catid = parseInt($('#swiper-container21 .active-nav1').attr('catid'));
				this.zhuanti(this.catid, this.page);
				return;
			});

			this.getData(this.type, this.page);
			this.$http.get(getOpenUrl() + "ads", {
				params: {
					type: 48
				},
				headers: {
					'Authorization': 'Bearer ' + getToken()
				}
			}).then((res) => {
				if(res.body.code == '0000') {
					this.tipData = res.body.data
				}
			});
		},
		methods: {
			refresh() { // 刷新数据的操作
				this.$nextTick(() => {
					if(this.type == "tuijian") {
						this.tuijian()
					}
					if(this.type == "zhaochanpin") {
						this.chanpin()
					}
					if(this.type == "fangan") {
						this.fangan()
					}
					if(this.type == "zhuanti") {
						this.zhuanti()
					}
					if(this.type == "xuanyong") {
						this.xuanyong()
					}
					if(this.type == "zixun") {
						this.zixun()
					}
				})
			},
			//厂家刷新
			loadTop() { // 刷新数据的操作
				this.page = 1
				this.loading = true
				this.$http.get(getOpenUrl() + 'index_company', {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.changjiaData.splice(0, this.changjiaData.length);
						this.changjiaPage = this.page;
						var data = res.body.company_data;
						$.each(data, (k, v) => {
							this.changjiaData.push(v);
						})
						this.loading = false
						this.$refs.loadmore.onTopLoaded();
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
			loadBottom() {
				this.page += 1;
				this.changjia(this.page)
			},
			getData(type, page) {
				page = 1
				switch(type) {
					case 'zhaochanpin':
						if(this.zcpdata) {
							return;
						}
						this.chanpin(type);
						break;
					case 'zhaochangjia':
						if(this.zcjdata) {
							return;
						}
						this.changjia(page);
						break;
					case 'fangan':
						if(this.fadata) {
							return;
						}
						this.fangan(page);
						break;
					case 'zhuanti':
						if(this.ztdata) {
							return;
						}
						this.zhuanti(this.catid, page);
						break;
					case 'xuanyong':
						if(this.xydata) {
							return;
						}
						this.xuanyong(page, 36);
						break;
					case 'zixun':
						if(this.zxdata) {
							return;
						}
						this.zixun();
						//						this.zixun1();
						break;
					case 'fujin':
						if(this.fjdata) {
							return;
						}
						this.fujin();
						break;
					default:
						if(this.tjdata) {
							return;
						}
						//推荐
						this.tuijian(type);
				}
			},
			tuijian(type) {
				this.tjdata = true
				this.loading = true
				this.$http.get(getOpenUrl() + 'homepage', {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.listData = res.body
						this.bannerData = this.listData.ad_data
						this.zixunbanner = this.listData.ad_information
						this.zuixinbanner = this.listData.ad_new
						this.tuijianbanner = this.listData.ad_tj
						this.loading = false
						this.$refs.scrollertuijian.donePulldown()
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
								this.$refs.scrollertuijian.donePulldown()
							}, 1500)
						}
					})
			},
			chanpin() {
				this.zcpdata = true;
				this.loading = true
				this.$http.get(getOpenUrl() + 'index_product', {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.chanpinData = res.body
						this.zuixinbanner = this.chanpinData.ad_tj
						this.tuijianbanner = this.chanpinData.ad_new
						this.loading = false
						this.$refs.scrollerchanpin.donePulldown()
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
								this.$refs.scrollertuijian.donePulldown()
							}, 1500)
						}
					})

			},
			changjia(page) {
				this.cjdata = true;
				this.loading = true
				this.page = page ? page : 1;
				if(this.changjiaData.length > 0 && this.page <= this.changjiaPage) {
					this.page = this.changjiaPage;
					this.loading = false
					return;
				}
				this.$http.get(getOpenUrl() + 'index_company', {
						params: {
							page: page
						},
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.$refs.loadmore.onBottomLoaded();
						this.changjiaPage = this.page;
						var data = res.body.company_data;
						$.each(data, (k, v) => {
							this.changjiaData.push(v);
						})
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
			fangan() {
				this.fadata = true;
				this.loading = true
				this.$http.get(getOpenUrl() + 'programme_banner ', {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.fanganData = res.body
						this.fanganbannerData = res.body.ad_data
						this.loading = false
						this.$refs.scrollerfangan.donePulldown()
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
								this.$refs.scrollertuijian.donePulldown()
							}, 1500)
						}
					})
			},
			zhuanti(catid, page) {
				this.ztdata = true;
				this.loading = true
				this.$http.get(getOpenUrl() + 'product_special', {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.chanpinzhuantiData = res.body.data
						this.loading = false
						this.$refs.scrollerzhuanti.donePulldown()
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
								this.$refs.scrollertuijian.donePulldown()
							}, 1500)
						}
					})

				this.$http.post(getOpenUrl() + 'index_special', {
						catid: catid,
						int_size: 8,
						page: page
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.listsData = []
						if(res.body.code == 0) {
							var data = res.body.zhuant;
							var catinfo = res.body.cate_info;
							var curlist = res.body.lists_data;

							$.each(data, (k, v) => {
								if(v.catid == catinfo.catid) {
									v.listData = curlist;
								} else {
									v.listData = [];
								}
								if(this.catData[k]) {
									if(v.catid == catinfo.catid && this.catData[k].listData.length == 0) {
										this.catData[k] = v;
									}
								} else {
									this.catData.push(v);
								}
							});
							this.zhuantiData = res.body
							this.itemsAllStart = page;
							this.loading = false
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
								this.$refs.scrollertuijian.donePulldown()
							}, 1500)
						}
					})
			},
			xuanyong(page, xycatid) {
				this.xydata = true;
				this.loading = true
				this.$http.post(getOpenUrl() + 'index/index_guide', {
						keyword: '',
						int_size: 8,
						page: page,
						year: '',
						order: '',
						catid: xycatid
					}, {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.xuanyongData = res.body
						this.loading = false
						this.$refs.scrollerxuanyong.donePulldown()
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
								this.$refs.scrollertuijian.donePulldown()
							}, 1500)
						}
					})
			},
			zixun() {
				this.zxdata = true;
				this.loading = true
				this.$http.get(getOpenUrl() + 'index_information', {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.zixunData = res.body
						this.loading = false
						this.$refs.scrollerzixun.donePulldown()
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
								this.$refs.scrollertuijian.donePulldown()
							}, 1500)
						}
					})
			},
			fujin() {
				this.fjdata = true;
				this.loading = true
				this.$http.get(getOpenUrl() + 'index_information', {
						headers: {
							'Authorization': 'Bearer ' + getToken()
						}
					})
					.then((res) => {
						this.fujinData = res.body
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
			
			adJump(param) {
				var url = adUrl(param);
				this.$router.push(url);
			}
		},
		beforeRouteLeave(to, from, next) {
			if(to.path == '/') {
				next(false);
			} else {
				next();
			}
		},
		
		activated() {
			this.tuijian()
		}
	}
</script>

<style scoped>
	.home {
		background: #f4f4f4;
	}
	.max{height: 9.5rem;}
	.line2{display: none;}
	@media screen and (min-width: 1024px) {
	    .max {
	        height: 10.7rem;
	    }
	    .line2{display: block;}
	}
	@media screen and (min-width: 768px) {
	   	.home>>>.header{position: absolute!important;}
	   	.home>>>.footer{position: absolute!important;}
	   	.line2{display: block;}
	}
	/*轮播图*/
	
	.slide {
		position: relative;
	}
	
	.swiper-container .swiper-slide {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.swiper-container .swiper-slide img {
		display: block;
		width: 100%;
		height: 3.2rem;
	}
	/*.swiper-container .swiper-slide p {
		position: absolute;
		bottom: 0;
		left: 0;
		height: .6rem;
		line-height: .6rem;
		padding: 0 .2rem;
		color: #fff;
		font-size: .2rem;
		width: 100%;
		background: rgba(0, 0, 0, .4);
		text-align: left;
	}*/
	
	.swiper-container-horizontal>.swiper-pagination-bullets {
		right: 0.15rem;
		left: inherit;
	}
	
	.slide .swiper-pagination {
		width: auto;
		font-size: 0;
	}
	
	.home>>>.swiper-pagination-bullet-active {
		opacity: 1;
		background: #fff;
	}
	/*导航*/
	
	.navigation {
		height: 1.36rem;
		background: #fff;
		border-bottom: 1px solid #eee;
		overflow: hidden;
	}
	
	.navigation dl {
		width: 100%;
		float: left;
		margin-top: 0.25rem;
	}
	
	.navigation dl dt {
		height: 0.46rem;
		margin: 0 auto;
		width: auto;
	}
	
	.navigation dl dt img {
		height: 0.46rem!important;
		margin: 0 auto!important;
		width: auto!important;
	}
	
	.navigation dl dd {
		font-size: 0.18rem;
		color: #3F3F4E;
		text-align: center;
		line-height: 0.58rem;
	}
	/*content*/
	
	.content-top {
		height: 0.7rem;
		background: #fff;
		position: relative;
		margin-bottom: 0.14rem;
	}
	
	.content-top span {
		width: 1.4rem;
		display: block;
		color: #fc8209;
		font-size: 0.2rem;
		line-height: 0.4rem;
		border-right: 1px solid #eee;
		margin-left: 0.24rem;
		padding-right: 0.14rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.content-top p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.content-bottom {
		overflow: hidden;
	}
	
	.content-bottom .ul1 {
		float: left;
		width: 50%;
	}
	
	.content-bottom .ul2 {
		float: right;
		width: calc(50% - 0.04rem);
		margin-left: 0.04rem;
	}
	
	.content-bottom .li1 {
		height: 4.52rem;
		width: 100%;
	}
	
	.content-bottom .li1 img {
		height: 4.52rem;
		width: 100%;
	}
	
	.content-bottom .li2 {
		height: 2.24rem;
		width: 100%;
	}
	
	.content-bottom .li2 img {
		height: 2.24rem;
		width: 100%;
	}
	
	.content-bottom .li3 {
		height: 2.24rem;
		width: 100%;
		margin-top: 0.04rem;
	}
	
	.content-bottom .li3 img {
		height: 2.24rem;
		width: 100%;
	}
	/*content1*/
	
	.content-top1 {
		height: 0.85rem;
		background: #fff;
		position: relative;
	}
	
	.content-top1 span {
		display: block;
		color: #3F3F4E;
		font-size: 0.2rem;
		line-height: 0.85rem;
		margin-left: 0.24rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.content-bottom1 {
		overflow: hidden;
	}
	
	.conbt-top {
		height: 3.2rem;
		width: 100%;
	}
	
	.conbt-bottom {
		margin-top: 0.14rem;
		overflow: hidden;
		background: #fff;
	}
	
	.conbt-footer {
		background: #fff;
		color: #e5e5e5;
		height: 0.7rem;
		line-height: 0.7rem;
		font-size: 0.22rem;
		text-align: center;
		border-top: 1px solid #eee;
	}
	
	.swiper {
		width: 1.85rem;
		font-size: 0.2rem;
		float: left;
		padding-bottom: 0.17rem;
	}
	
	.swiper-li1 {
		width: 1.85rem;
		height: 1.85rem;
	}
	
	.swiper-li1 img {
		width: 100%!important;
		height: 1.85rem!important;
	}
	
	.swiper-li2 {
		line-height: 0.28rem;
		color: #3F3F4E;
		margin-top: 0.13rem;
		text-align: left;
		padding-left: 0.2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.swiper-li3 {
		line-height: 0.48rem;
		color: #fc8209;
		text-align: left;
		padding-left: 0.2rem;
	}
	/**/
	
	.swiper1 {
		width: calc(50% - 0.1rem);
		font-size: 0.2rem;
		float: left;
		padding-bottom: 0.17rem;
		margin-right: 0.1rem;
	}
	
	.swiper1-li1 {
		width: 100%;
		height: 3.15rem;
	}
	
	.swiper1-li1 img {
		width: 100%!important;
		height: 100%!important;
	}
	
	.swiper1-li2 {
		line-height: 0.28rem;
		height: 0.28rem;
		color: #3F3F4E;
		margin-top: 0.13rem;
		text-align: left;
		padding-left: 0.2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.swiper1-li3 {
		line-height: 0.48rem;
		color: #fc8209;
		text-align: left;
		padding-left: 0.2rem;
	}
	/**/
	
	.swiper2 {
		width: 3.46rem;
		font-size: 0.2rem;
		float: left;
		padding-bottom: 0.17rem;
	}
	
	.swiper2-li1 {
		width: 3.46rem;
		height: 2rem;
	}
	
	.swiper2-li1 img {
		width: 100%!important;
		height: 2rem!important;
	}
	
	.swiper2-li2 {
		line-height: 0.28rem;
		color: #3F3F4E;
		margin-top: 0.13rem;
		text-align: left;
		padding-left: 0.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}
	/*第一个swiper*/
	
	#swiper-slide {
		width: 2.1rem!important;
	}
	
	#swiper-container2 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
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
		border-bottom: 2px solid #fd9b3a;
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	/*第二个swiper*/
	
	#swiper-container21 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
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
		border-bottom: 2px solid #fd9b3a;
		color: #fd9b3a !important;
		margin-bottom: -1px;
	}
	/*厂家*/
	
	.chang {
		margin: 0 0.24rem;
		margin-top: 0.14rem;
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
		font-size: 0.14rem;
		color: #3f9af6;
		line-height: 0.24rem;
	}
	
	.changli3 {
		font-size: 0.14rem;
		color: #3F3F4E;
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
	/*方案*/
	
	.fenlei {
		margin-top: 0.16rem;
	}
	
	.fenlei dl {
		float: left;
		width: 33.3%;
		margin-top: 0.37rem;
	}
	
	.fenlei dl dt {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto;
	}
	
	.fenlei dl dt img {
		width: 1rem!important;
		height: 1rem!important;
	}
	
	.fenlei dl dd {
		text-align: center;
		font-size: 0.22rem;
		color: #787883;
		line-height: 0.78rem;
		height: 0.78rem;
	}
	/*专题*/
	
	.zhuantilist {
		display: flex;
		margin: 0 0.24rem;
		padding: 0.2rem 0;
		border-bottom: 1px solid #eee;
	}
	
	.zhuantilist ul {
		float: left;
		flex: 1;
		padding-left: 0.26rem;
		position: relative;
	}
	
	.zhuantilist .li1 {
		font-size: 0.26rem;
		color: #3F3F4E;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-word;
	}
	
	.zhuantilist img {
		float: left;
		width: 1.14rem!important;
		height: 1.03rem!important;
	}
	
	.zhuantilist .li2 {
		color: #74747d;
		font-size: 0.2rem;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		width: calc(100% - 0.37rem);
	}
	
	.zhuantilist .li2 .sp1 {
		float: left;
	}
	
	.zhuantilist .li2 .sp2 {
		float: right;
		background: url(../../../static/images/index/pinglun.png) no-repeat right 50%;
		background-size: 0.22rem auto;
		padding-right: 0.37rem;
	}
	/*选用*/
	
	.banner {
		background: #fff;
	}
	
	.year {
		padding: 0 0.2rem;
		overflow: hidden;
		background: #fff;
	}
	
	.year ul li {
		float: left;
		border: 1px solid #d2d2d2;
		padding: 0 0.34rem;
		font-size: 0.16rem;
		line-height: 0.58rem;
		border-radius: 0.05rem;
		margin: 0.24rem 0.12rem;
	}
	
	.xylist {
		background: #fff;
		margin-top: 1px;
	}
	
	.xylist .xy-top {
		font-size: 0.28rem;
		line-height: 0.82rem;
		color: #3F3F4E;
		padding-left: 0.24rem;
	}
	
	.xy-bottom {
		overflow: hidden;
		display: flex;
		padding-top: 0.24rem;
		margin-right: 0.24rem;
	}
	
	.xy-bottom .xy-b-l {
		width: 2.2rem;
		height: 1.8rem;
		float: left;
		position: relative;
		background: #e6ecf2;
	}
	
	.xy-bottom .xy-b-l img {
		width: 1.6rem!important;
		height: auto!important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.xy-bottom .xy-b-r {
		flex: 1;
		overflow: hidden;
		float: left;
		margin-left: 0.27rem;
	}
	
	.xy-bottom .xy-b-r ul li {
		float: left;
		width: 100%;
	}
	
	.xy-bottom .xy-b-r .li1 {
		color: #3F3F4E;
		font-size: 0.24rem;
		line-height: 0.24rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.xy-bottom .xy-b-r .li2 {
		color: #74747d;
		font-size: 0.2rem;
		line-height: 0.3rem;
		margin-top: 0.24rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-word;
	}
	/*.xy-footer {
		background: #fff;
		border-top: 1px solid #d2d2d2;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	
	.xy-footer ul li {
		float: left;
		line-height: 0.87rem;
		width: 50%;
		text-align: center;
		font-size: 0.2rem;
		color: #3F3F4E;
		box-sizing: border-box;
	}*/
	/*资讯*/
	
	.zx {
		margin-bottom: 0.14rem;
	}
	
	.zx-top {
		line-height: 0.7rem;
		background: #fff;
		overflow: hidden;
		padding: 0 0.24rem;
	}
	
	.zx-top .li1 {
		float: left;
		font-size: 0.28rem;
		color: #3F3F4E;
	}
	
	.zx-top .li2 {
		float: right;
		font-size: 0.22rem;
		color: #fc8814;
	}
	
	.zx-b-l {
		width: 100%;
		height: 3rem;
	}
	
	.zx-b-l img {
		width: 100%!important;
		height: 3rem!important;
	}
	
	.zx-bottom {
		background: #fff;
	}
	
	.zx-b-r {
		overflow: hidden;
		padding: 0 0.24rem;
	}
	
	.zx-b-r .li1 {
		display: flex;
		position: relative;
	}
	
	.zx-b-r .li1 span {
		display: block;
		float: left;
	}
	
	.zx-b-r .li1 .sp1 {
		width: 0.1rem;
		height: 0.1rem;
		background: #fc8209;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.zx-b-r .li1 .sp2 {
		height: 0.69rem;
		line-height: 0.69rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-bottom: 1px solid #dfdede;
		font-size: 0.22rem;
		color: #3F3F4E;
		flex: 1;
		margin-left: 0.26rem;
	}
	
	.zx-footer {
		background: #fff;
		color: #fc8209;
		font-size: 0.24rem;
		line-height: 0.7rem;
		text-align: center;
	}
	
	.articles {
		background: #fff;
		padding: 0 0.24rem;
		margin-top: 1px;
	}
	
	.nav1-top {
		position: relative;
	}
	
	.nav1-p1 {
		font-size: 0.2rem;
		line-height: 0.76rem;
		text-align: center;
	}
	
	.line {
		width: calc(100% - 3.7rem);
		height: 2px;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		background: #eee;
	}
	
	.r {
		width: calc(100% - 3.7rem);
		height: 2px;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background: #eee;
	}
	
	.nav-list ul {
		margin-bottom: 0.18rem;
	}
	
	.nav-list ul li {
		width: calc(100% - 0.24rem);
		height: 0.7rem;
		line-height: 0.7rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 0.2rem;
		color: #797979;
		background: url(../../../static/images/personal/personalicon/backright.png) no-repeat 5.57rem 50%;
		background-size: 0.11rem 0.22rem;
		background-color: #f1f1f1;
		padding-left: 0.24rem;
	}
	/*附近*/
	
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
	
	.amap-page-container {
		position: relative;
	}
	
	.el-vue-search-box-container {
		width: 6rem;
	}
	
	.search-box {
		left: 50%;
		transform: translateX(-50%);
	}
	
	.body>>>.amap-copyright {
		display: none!important;
	}
	
	.body>>>.amap-logo {
		display: none!important;
	}
	/*tuijian*/
	
	.box1 {
		height: 100px;
		position: relative;
		width: 1490px;
	}
	
	.box1-item {
		width: 200px;
		height: 100px;
		background-color: #ccc;
		display: inline-block;
		margin-left: 15px;
		float: left;
		text-align: center;
		line-height: 100px;
	}
	
	.box1-item:first-child {
		margin-left: 0;
	}
	
	.home>>>.vux-slider>.vux-indicator>a>.vux-icon-dot.active,
	.vux-slider .vux-indicator-right>a>.vux-icon-dot.active {
		background: #FF852C!important;
	}
	
	.home>>>.swiper-container-autoheight,
	.swiper-container-autoheight {
		position: relative;
		/*bottom: 0.98rem;*/
	}
</style>