<template>
	<div class="pro-details">
		<div class="headers">
			<a href="javascript:history.back(-1);" class="back"></a>
			<!--<a class="info"></a>-->
		</div>

		<div class="pro-main" style="width: 100%;height:calc(100% - 0.87rem);overflow: auto;">
			<div class="banner">
				<swiper :options="swiperOptionTab" id="swiper-container2" ref="mySwiperTab">
					<swiper-slide class="body_bottom" :class="index==0 ? 'body_bottom active-nav' : 'body_bottom'" v-for="(img,index) in data.exhibit" :key="index"></swiper-slide>
					<swiper-slide class="video_body_bottom"></swiper-slide>
				</swiper>
				<swiper :options="swiperOptionCon" id="swiper-container3" ref="mySwiperCon">
					<swiper-slide class="swiper-slide">
						<img v-lazy="data.thumb" :alt="data.title">
					</swiper-slide>
					<swiper-slide class="swiper-slide" v-for="(img,index) in data.exhibit" :key="index">
						<img v-lazy="img.url" :alt="img.alt">
					</swiper-slide>
				</swiper>
			</div>

			<div class="pro_introduce">
				<h1>{{data.title}}</h1>
				<h2>{{data.eng_title}}</h2>
				<ul>
					<li>产品分类：{{data.catname}}</li>
					<li>生产厂家：{{data.company}}</li>
					<li>产品品牌：{{data.brand}}</li>
					<li>产品型号：{{data.standard}}</li>
					<li>产品档次：{{data.dangc}}</li>
					<li>产品评分：{{data.pingf}}</li>
					<li v-if="data.price > 0">
						<i style="font-style:normal;font-size:0.24rem;font-weight:600;color:#ff651d;vertical-align:bottom;" v-text="data.price==0?'面议':'￥'+data.price"></i>
						<span style="margin-right:0.05rem;color:#787883;font-size:0.15rem;font-weight:600;margin-left:0.05rem;vertical-align: bottom;">参考价</span>
						<div style="clear:both"></div>
					</li>
				</ul>
				<!--<div class="sanwei">三维展示</div>-->
			</div>
			<div style="height:0.15rem;background:#eee;"></div>
			<div class="pingjia-header">
				<div class="pingjia-header-left">
					用户评价（{{commentData.ccount}}）
				</div>
				<div class="pingjia-header-right">
					<em style="color:#ff651d;font-style: normal;">{{commentData.support}}%</em>支持
				</div>
				<div style="clear:both"></div>
			</div>
			<div class="pingjia">
				<div class="pingjia-box" v-for="(pjImg,index) in commentData.data" :key="index">
					<div class="pingjia-item">
						<div class="logoItem">
							<img class="item-logo" v-lazy="pjImg.avatar">
							<span>{{pjImg.name}}</span>
							<div style="clear:both"></div>
						</div>
						<div class="pingjia-content" v-html="pjImg.content"></div>
					</div>
				</div>
			</div>

			<div class="pingjia-button">
				<router-link :to="{path:'/more_message',query:{id:data.id}}" style="color: #000;">
					<div class="pingjia-button-left">查看全部评价</div>
				</router-link>
				<router-link :to="{path:'/more_baodao',query:{id:data.id}}" style="color: #000;">
					<div class="pingjia-button-left">查看相关报道</div>
				</router-link>
				<div style="clear:both"></div>
			</div>
			<div style="height:0.15rem;background:#eee;"></div>

			<div class="shop-box">
				<div class="company-info">
					<img v-lazy="companyData.qyewm">
					<p>{{companyData.title}}</p>
					<div style="clear: both;"></div>
					<!--<span>Door door control technology (China) Co. Ltd.</span>-->
				</div>
				<div class="shop-fenlei">
					<ul>
						<li>{{companyData.brand_count}}</li>
						<li>拥有品牌</li>
					</ul>
					<ul>
						<li>{{companyData.goods_count}}</li>
						<li>全部产品</li>
					</ul>
					<!--<ul>-->
					<!--<li>4</li>-->
					<!--<li>店铺动态</li>-->
					<!--</ul>-->
					<div style="clear:both"></div>
				</div>
				<div class="pingjia-button" style="padding-left:0;margin-top: 0.2rem">
					<router-link :to="{path:'/shop',query:{id:data.uid}}" style="color: #000;">
						<div class="pingjia-button-left" style="margin-right: 0.1rem">查看联系方式</div>
					</router-link>

					<div class="pingjia-button-left" style="margin-right: 0.1rem">
						<router-link style="color:#000;" :to="{path:'/shop',query:{id:data.uid}}">进入店铺 </router-link>
					</div>

				</div>
			</div>
			<div style="height:0.15rem;background:#eee;"></div>

			<div class="pro-detail-information">
				<swiper :options="swiperOptionTab1" id="swiper-container21" ref="mySwiperTab1">
					<swiper-slide class="active-nav1 body_bottom" type="1"><span>产品简介</span></swiper-slide>
					<swiper-slide class="body_bottom" type="2"><span>生产销售</span></swiper-slide>
					<swiper-slide class="body_bottom" type="3"><span>相关标准</span></swiper-slide>
					<swiper-slide class="body_bottom" type="4"><span>资源下载</span></swiper-slide>
					<swiper-slide class="body_bottom" type="5"><span style="border: 0;">评论及报道</span></swiper-slide>
				</swiper>
				<div style="width: 100%;">
					<swiper :options="swiperOptionCon1" id="swiper-container31" ref="mySwiperCon1">
						<swiper-slide>
							<div class="first" type="1" contype="1">
								<div class="first-logo">
									<div class="logo-tit">
										基本参数
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-info">
									<div class="first-info-tr">
										<div class="first-info-tr-left">产品系列</div>
										<div class="first-info-tr-right">{{data.series}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr">
										<div class="first-info-tr-left">产品型号</div>
										<div class="first-info-tr-right">{{data.standard}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr">
										<div class="first-info-tr-left">规格尺寸</div>
										<div class="first-info-tr-right">{{data.chic}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr">
										<div class="first-info-tr-left">产品颜色</div>
										<div class="first-info-tr-right">{{data.color}}</div>
										<div style="clear:both"></div>
									</div>
								</div>

								<div class="first-logo">
									<div class="logo-tit">
										产品属性
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										主分类指标
									</div>
								</div>
								<div class="first-info">
									<div class="first-info-tr" v-for="(attr,index) in attrArr" :key="index">
										<div class="first-info-tr-left">{{attr.attr_name}}</div>
										<div class="first-info-tr-right" v-if="attr.attr_type == 1">
											<a :href="attr.attr_value" target="_blank" style="background:#ff651d;color:#fff;padding: 0.1rem 0.05rem">点击查看{{attr.attr_name}}</a>
										</div>
										<div class="first-info-tr-right" v-else>{{attr.attr_value}}{{attr.attr_unit}}</div>
										<div style="clear:both"></div>
									</div>
								</div>
								<div v-if="attrCAttr" v-for="(cat,index) in attrCAttr">
									<div class="first-logo">
										<div class="logo-tit">
											{{cat.catname}}指标
										</div>
									</div>
									<div class="first-info">
										<div class="first-info-tr" v-for="(attr,index) in cat.attrs" :key="index">
											<div class="first-info-tr-left">{{attr.attr_name}}</div>
											<div class="first-info-tr-right" v-if="attr.attr_type == 1">
												<a :href="attr.attr_value" target="_blank" style="background:#ff651d;color:#fff;padding: 0.1rem 0.05rem">点击查看{{attr.attr_name}}</a>
											</div>
											<div class="first-info-tr-right" v-else>{{attr.attr_value}}{{attr.attr_unit}}</div>
											<div style="clear:both"></div>
										</div>
									</div>
								</div>

								<div class="first-logo">
									<div class="logo-tit">
										产品简介
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-info-img">
									<p v-html="data.content" style="width: 100%;"></p>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										产品特点
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-info-img" v-html="data.cptd"></div>
								<div class="first-logo">
									<div class="logo-tit">
										适用范围
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-info-img" v-html="data.syfw"></div>
								<div style="height: 0.4rem;background:#fff;"></div>
								<!--<div class="more-first-info">查看全部图文详情</div>-->
							</div>
						</swiper-slide>
						<swiper-slide>
							<div class="first" type="2" contype="2">
								<div class="first-logo">
									<div class="logo-tit">
										基本信息
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-info">
									<div class="first-info-thead">企业名称</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">中文名称</div>
										<div class="first-info-tr-right" v-html="allCompanyData.title"></div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">英文名称</div>
										<div class="first-info-tr-right" v-html="allCompanyData.ytitle"></div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-thead">企业二维码</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left" style="height: 1.5rem;line-height: 1.5rem;">企业二维码</div>
										<div class="first-info-tr-right" style="padding-top:0.2rem;height:1.3rem;line-height:1.3rem;">
											<img v-lazy="this.openUrl+'qrcode?url='+allCompanyData.qyewm">
										</div>
										<div style="clear:both"></div>
									</div>
								</div>
								<div class="info-img-tit">企业简介</div>
								<div class="first-info-img">
									<p style="text-align: center;" v-html="allCompanyData.qiyjj"></p>
									<!--<img>-->
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										展示信息
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="info-img-tit">图片展示</div>
								<div class="first-info-img" v-html="allCompanyImg.content"></div>
								<div class="info-img-tit">视频展示</div>
								<div class="first-info-video" v-for="(video,index) in allCompanyVideo">
									<!--<video-player class="video-player-box" ref="videoPlayer" style="width:100%;height:3.7rem;" :options="playerOptions" :playsinline="true" customEventName="customstatechangedeventname" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @statechanged="playerStateChanged($event)" @ready="playerReadied">
									</video-player>-->
									<video preload="none" controls="controls" style="width: 100%;height: 3.34rem;" :src="video.fileurl" type="video/mp4">
									</video>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										新闻报道
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="pinpai-box">
									<div class="pinpai-item" v-for="(cnews,index) in allCompanyNews" :key="index">
										<a :href="cnews.url">
											<dl>
												<dt>
													<img v-lazy="cnews.thumb">
													<p style="font-size: 0.24rem;color:#000;">{{cnews.title}}</p>
													<p style="font-size: 0.2rem;color:#8c8c95;">{{cnews.ytitle}}</p>
													<p>查看详情</p>
												</dt>
												<dd></dd>
											</dl>
										</a>
									</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										企业产品
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="pinpai-box">
									
									<div class="pinpai-item" v-for="(cproduct,index) in allCompanyProduct" :key="index">
										<a :href="cproduct.url">
										<dl>
											<dt>
												<img v-lazy="cproduct.thumb">
												<p style="font-size: 0.24rem;color:#000;">{{cproduct.title}}</p>
												<p style="font-size: 0.2rem;color:#8c8c95;">{{cproduct.ytitle}}</p>
												<p>查看详情</p>
											</dt>
											<dd></dd>
										</dl>
										</a>
									</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										品牌信息
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="pinpai-box">
									<div class="pinpai-item" v-for="(cBrand,index) in allCompanyBrand" :key="index">
										<dl>
											<dt>
						                        <img v-lazy="cBrand.thumb">
						                        <p style="font-size: 0.24rem;">{{cBrand.title}}</p>
						                        <p style="font-size: 0.2rem;color:#8c8c95;">{{cBrand.ytitle}}</p>
						                        <!--<p>查看详情</p>-->
						                    </dt>
											<dd></dd>
										</dl>
										<div class="goPinpai">进入品牌官网</div>
									</div>
									<div style="clear:both"></div>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										联系方式
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-info" v-for="(cAddress,index) in allCompanyAddress" :key="index">
									<div class="first-info-thead" style="text-align: center;">联系方式{{cAddress.hzsz}}</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">部门名称</div>
										<div class="first-info-tr-right">{{cAddress.name}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">负责人</div>
										<div class="first-info-tr-right">{{cAddress.link_name}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">电话</div>
										<div class="first-info-tr-right">{{cAddress.link_phone}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">所在地</div>
										<div class="first-info-tr-right">{{cAddress.province}}{{cAddress.city}}{{cAddress.district}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">详细地址</div>
										<div class="first-info-tr-right">{{cAddress.address}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">邮编</div>
										<div class="first-info-tr-right">{{cAddress.zipcode}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr" style="color:#787883">
										<div class="first-info-tr-left">邮箱</div>
										<div class="first-info-tr-right">{{cAddress.link_email}}</div>
										<div style="clear:both"></div>
									</div>
									<div class="first-info-tr" style="color:#787883" v-if="cAddress.web_url">
										<div class="first-info-tr-left">网址链接</div>
										<div class="first-info-tr-right">{{cAddress.web_url}}</div>
										<div style="clear:both"></div>
									</div>
									<router-link :to="{path:'/map',query:{lng:cAddress.lng, lat:cAddress.lat}}" style="color: #000;">
										<div class="first-info-footer" style="text-align: center;">查看地图信息</div>
									</router-link>
								</div>
								<router-link :to="{path:'/shop',query:{id:data.id}}" style="color: #000;">
									<div class="more-first-info" style="border-top:none;">查看全部联系方式</div>
								</router-link>
							</div>
						</swiper-slide>
						<swiper-slide>
							<div class="first" type="3" contype="3">
								<div class="first-logo">
									<div class="logo-tit">
										执行标准
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="zxbz-box">
									<a :href="bj.url" v-for="(bj,index) in otherBj" :key="index" style="color: #787883;">
									<div class="zxbz-item">
										
										<img v-lazy="bj.bthumb">
										<p>{{bj.bname}}</p>
										<span>{{bj.ctime}}</span>
										
									</div>
									</a>
									<div style="clear:both"></div>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										产品、企业认证
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-info-img" v-for="(renz,index) in otherRz" :key="index">
									<p style="text-align:center;">{{renz.title}}<p>
									<div v-html="renz.content"></div>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										产品检测
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
									<div class="logo-line"></div>
								</div>
								<div class="first-info-img" v-for="(renz,index) in otherRzjc" :key="index">
									<p style="text-align:center;">{{renz.title}}<p>
									<div v-html="renz.content" style="font-size:0.2rem;"></div>
								</div>
								<div style="background: #fff;height: 0.2rem;"></div>
							</div>
						</swiper-slide>
						<swiper-slide>
							<div type="4" contype="4">
								<div class="first-logo">
									<div class="logo-tit">
										专项图集
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
								</div>
								<div style="padding-bottom: 0.24rem;margin: 0 0.24rem;border-bottom: 1px solid #f4f4f4;">
									<div>
										<router-link class="fanganlist" v-for="(zxtj, index) in zhuanX" :to="{path:'/photodetail',query:{catid:zxtj.fileurl.catid, id:zxtj.fileurl.id}}" style="color: #000;">
										<div class="falist-l">
										
											<img v-lazy="zxtj.thumb" />
										
										</div>
										<div class="falist-r">
											<ul>
												<li class="li1">{{zxtj.title}}</li>
											</ul>
										</div>
										</router-link>
									</div>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										电子样本
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
								</div>
								<div style="padding-bottom: 0.24rem;margin: 0 0.24rem;border-bottom: 1px solid #f4f4f4;">
									<div>
										<a :href="dz.fileurl" download class="fanganlist" v-for="(dz, index) in dianZ">
										<div class="falist-l">
											<a :href="dz.fileurl ? dz.fileurl : 'javascript:;'" style="color: #000;">
												<img v-lazy="dz.thumb" />
											</a>
										</div>
										<div class="falist-r">
											<ul>
												<li class="li1">{{dz.title}}</li>
												<!--<li class="li2">{{dz.ctime}}</li>-->
											</ul>
										</div>
										</a>
									</div>
								</div>
								<div class="first-logo">
									<div class="logo-tit">
										视频资料
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
								</div>
								<swiper :options="swiperOptionConvideo" id="swiper-container3" ref="mySwiperConvideo">
									<swiper-slide class="swiper-slide" v-for="(video,index) in shiP">
										<video preload="none" controls="controls" style="width: 100%;height: 3.34rem;" :src="video.fileurl" type="video/mp4">
										</video>
									</swiper-slide>
								</swiper>
								<swiper :options="swiperOptionTabvideo" id="swiper-container23" ref="mySwiperTabvideo">
									
									<swiper-slide :class="index==0?'active-nav3':''" class="body_bottom" style="width: 2.3rem;" v-for="(video,index) in shiP">

										<div class="report-item">
											<img :src="video.thumb" style="width: 2.3rem;height: 1.3rem;" />
										</div>
									</swiper-slide>
								</swiper>
								<div class="first-logo">
									<div class="logo-tit">
										相关下载
										<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
									</div>
								</div>
								<div class="fanganlist" v-for="(dz, index) in xianG" style="padding: 0;">
									<div class="falist-r">
										<ul style="text-align: center;">
											<li class="li1" style="line-height: 0.4rem;">{{dz.title}}</li>
											<li class="li2">{{dz.introduce}}</li>
											<li class="download">
												<a :href="dz.thumb">立即下载</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</swiper-slide>
						<swiper-slide>
							<div type="5" contype="5">
								<div class="new-report" style="margin:0 0.24rem;">
									<div class="first-logo">
										<div class="logo-tit">
											新闻报道
											<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
										</div>
										<div class="logo-line"></div>
									</div>
									<div class="zxbz-box">
										<div class="zxbz-item" v-for="(rp,index) in otherReport" :key="index">
											<img v-lazy="rp.thumb">
											<p>{{rp.title}}</p>
											<span>{{rp.add_time}}</span>
										</div>
										<div style="clear:both"></div>
									</div>
									<router-link :to="{path:'/more_baodao',query:{id:data.id}}" style="color: #000;">
										<div class="more-first-info" style="border-top:none;" v-if="otherReport.length>0">查看全部报道</div>
									</router-link>
								</div>
								<div style="height:0.15rem;background:#eee;"></div>
								<div class="user-pinglun" style="margin:0 0.24rem;">
									<div class="first-logo">
										<div class="logo-tit">
											用户评论
											<div style="width:35%;margin-left:30%;height: 2px;background:#ff651d;"></div>
										</div>
										<div class="logo-line"></div>
									</div>
									<div class="bili-box">
										<div class="all-zhichi" style="top:0.12rem;">
											<div class="zhichi-bili" style="height:100%;background:#ffc002;" ref="zhichi"></div>
										</div>
										<div style="font-size:0.2rem;position: absolute;top:0.12rem;left:2.2rem;">{{commentData.support}}%支持</div>
										<div class="all-zhichi" style="top:0.6rem;">
											<div class="zhichi-bili" style="height:100%;background:#06a3f6;" ref="buhaoshuo"></div>
										</div>
										<div style="font-size:0.2rem;position: absolute;top:0.6rem;left:2.2rem;">{{commentData.neutral}}%不好说</div>
										<div class="all-zhichi" style="top:1.05rem;">
											<div class="zhichi-bili" style="height:100%;background:#abed0a;" ref="fandui"></div>
										</div>
										<div style="font-size:0.2rem;position: absolute;top:1.05rem;left:2.2rem;">{{commentData.opposition}}%反对</div>
									</div>
									<div style="height:0.3rem;background:#fff;"></div>
									<div class="pinglun-button" @click="goPinglun" style="color:#000;">
										我也评论
									</div>
								</div>
								<div class="pingjia">
									<div class="pingjia-box" v-for="(pl,index) in commentData.data" :key="index">
										<div class="pingjia-item">
											<div class="logoItem">
												<img class="item-logo" v-lazy="pl.avatar">
												<span>{{pl.name}}</span>
												<div class="pingjia-icon" v-if="pl.direction==3">
													<img class="pj-icon" src="../../../static/images/chanpin/gantan.png">
													<i>不好说</i>
												</div>
												<div class="pingjia-icon" v-if="pl.direction==1">
													<img class="pj-icon" src="../../../static/images/chanpin/zan.png">
													<i>支持</i>
												</div>
												<div class="pingjia-icon" v-if="pl.direction==2">
													<img class="pj-icon" src="../../../static/images/chanpin/noZan.png">
													<i>不支持</i>
												</div>
												<div style="clear:both"></div>
											</div>
											<div class="pingjia-content" v-html="pl.content"></div>
											<div class="pingjia-time">{{pl.dateline}}</div>
										</div>
									</div>
								</div>
								<router-link :to="{path:'/more_message',query:{id:data.id}}">
									<div class="more-first-info jiazai" v-if="pingData.length>0">加载更多评论</div>
								</router-link>
							</div>
						</swiper-slide>
					</swiper>
				</div>
				<div style="height:0.15rem;background:#eee;"></div>

				<div class="table-pro">
					<div class="table-pro-bar">
						<div class="pro-bar-xg active" @click="proBarTable(1)">
							<span style="border-right: 1px solid #eee;width: 100%;display: block;">相关产品</span>
						</div>
						<div class="pro-bar-xg" @click="proBarTable(2)">
							<span>最新产品</span>
						</div>
						<div style="clear:both"></div>
					</div>
					<transition name="fade">
						<div class="table-pro-list" v-if="proBar">
							<ul v-for="(xg,index) in xgGoodsList" :key="index">
								<li @click="changeDetails(xg.id)">
									<a>
										<img v-lazy="xg.thumb">
									</a>
								</li>
								<li class="pro-list-tit">{{xg.title}}</li>
								<li class="pro-list-money" v-text="xg.price==0?'面议':'￥'+xg.price"></li>
							</ul>
							<div style="clear:both"></div>
						</div>
					</transition>
					<transition name="fade">
						<div class="table-pro-list" v-if="!proBar">
							<ul v-for="(newg,index) in newGoodsList" :key="index">
								<li @click="changeDetails(newg.id)">
									<a>
										<img v-lazy="newg.thumb">
									</a>
								</li>
								<li class="pro-list-tit">{{newg.title}}</li>
								<li class="pro-list-money" v-text="newg.price==0?'面议':'￥'+newg.price"></li>
							</ul>
							<div style="clear:both"></div>
						</div>
					</transition>
				</div>
			</div>
		</div>

		<div class="footer">
			<div class="footer-left">
				<div class="footer-left-collect">
					<!--<img src="../../../static/images/chanpin/heart.png">-->
					<div class="sp2">
						<li class="li4">
							<label>
			                    <input type="checkbox" ref="check" @click="collect()"><b></b>
			                </label>
						</li>
					</div>
					<p>收藏</p>
				</div>
				<router-link :to="{path:'/shop',query:{id:data.uid}}" style="color: #000;">
					<div class="footer-left-collect">
						<img src="../../../static/images/chanpin/tel.png">
						<p>联系</p>
					</div>
				</router-link>
			</div>
			<router-link :to="{path:'/shop',query:{id:data.uid}}">
				<div class="footer-right">进入店铺</div>
			</router-link>
		</div>
		<load v-show="loading"></load>
		<mt-popup v-model="popupVisible" position="top" :modal=false v-text="tip" style="padding-top: 0.4rem;width: 100%;background:rgba(0,0,0,0.7);font-size: 0.26rem;text-align: center;height: 1rem;color: #fff;line-height: 1rem;"></mt-popup>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js';
	import { getOpenUrl, getToken } from '../../assets/js/common.js'
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import Vue from 'vue'
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	export default {
		data() {
			return {
				openUrl: '',
				tip: '',
				userName: '',
				proBar: true,
				popupVisible: false,
				loading: false,
				attrArr: [],
				attrCAttr: [],
				data: '',
				xgGoodsList: [],
				newGoodsList: [],
				allCompanyData: '',
				allCompanyImg: [],
				allCompanyVideo: [],
				allCompanyBrand: [],
				allCompanyNews: [],
				allCompanyProduct: [],
				allCompanyAddress: [],
				otherBj: [],
				otherRz: [],
				otherRzjc: [],
				otherReport: [],
				companyData: '',
				commentData: [],
				pingData:[],
				//资源下载
				zhuanX: [],
				dianZ: [],
				xianG: [],
				shiP: [],
				swiperOptionTab: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 'auto'
				},
				swiperOptionCon: {
					notNextTick: true,
					autoHeight: true
				},
				swiperOptionTab1: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: 4
				},
				swiperOptionCon1: {
					notNextTick: true,
					autoHeight: true
				},
				//video
				swiperOptionTabvideo: {
					watchSlidesProgress: true,
					watchSlidesVisibility: true,
					notNextTick: true,
					slidesPerView: "auto",
					spaceBetween: 4
				},
				swiperOptionConvideo: {
					notNextTick: true,
					autoHeight: true
				}
			}
		},
		mounted() {
			var $self = this;
			this.openUrl = getOpenUrl();

			//轮播图
			var swiperTab = this.swiperTab;
			var swiperCon = this.swiperCon;
			swiperTab.on('tap', function(obj) {
				swiperCon.slideTo(obj.clickedIndex);
			});
			//$('#swiper-container31 .swiper-wrapper').css('height','auto');
			
			swiperCon.on('slideChangeStart', function(obj) {
				$('#swiper-container2 .active-nav').removeClass('active-nav')
				var activeNav = $('#swiper-container2 .swiper-slide').eq(obj.activeIndex).addClass('active-nav');
				if(activeNav.index() > swiperTab.activeIndex) {
					var thumbsPerNav = Math.floor(swiperTab.width / activeNav.width()) - 1
					swiperTab.slideTo(activeNav.index() - thumbsPerNav)
				} else {
					swiperTab.slideTo(activeNav.index())
				}
			});
			//轮播1
			var swiperTab1 = this.swiperTab1;
			var swiperCon1 = this.swiperCon1;
			swiperTab1.on('tap', function(obj) {
				swiperCon1.slideTo(obj.clickedIndex);
			});
			swiperCon1.on('slideChangeStart', function(obj) {
				$('#swiper-container21 .active-nav1').removeClass('active-nav1')
				var activeNav = $('#swiper-container21 .swiper-slide').eq(obj.activeIndex).addClass('active-nav1');
				if(activeNav.index() > swiperTab1.activeIndex) {
					var thumbsPerNav = Math.floor(swiperTab1.width / activeNav.width()) - 1
					swiperTab1.slideTo(activeNav.index() - thumbsPerNav)
				} else {
					swiperTab1.slideTo(activeNav.index())
				}
			});

			$('.table-pro-bar .pro-bar-xg').on('touchend', function() {
				$('.table-pro-bar .pro-bar-xg').removeClass('active');
				$(this).addClass('active');
			});
			//video
			var swiperTabvideo = this.swiperTabvideo;
			var swiperConvideo = this.swiperConvideo;
			//video
			swiperTabvideo.on('tap', function(obj) {
				swiperConvideo.slideTo(obj.clickedIndex);
			});
			swiperConvideo.on('slideChangeStart', function(obj) {
				$('#swiper-container23 .active-nav3').removeClass('active-nav3')
				var activeNav = $('#swiper-container23 .swiper-slide').eq(obj.activeIndex).addClass('active-nav3');
				if(!activeNav.hasClass('swiper-slide-visible')) {
					if(activeNav.index() > swiperTabvideo.activeIndex) {
						var thumbsPerNav = Math.floor(swiperTabvideo.width / activeNav.width()) - 1
						swiperTabvideo.slideTo(activeNav.index() - thumbsPerNav)
					} else {
						swiperTabvideo.slideTo(activeNav.index())
					}
				}
				return;
			});
			swiperConvideo.on('slideChangeEnd', (obj) => {
				return;
			});
			this.changeDetails(this.$route.query.id);
		},
		methods: {
			goPinglun() {
				this.$router.push({
					path: '/pro_message',
					query: {
						id: this.data.id,
						uid: this.data.uid,
						catid: this.data.catid
					}
				});
			},
			changeDetails(id) {
				this.$route.query.id = id;
				this.getData();
				this.getcomment();
				this.getcompany();
				this.getAttr();
				this.getBj();
				this.mobile();
				$('.pro-main').animate({
					scrollTop: 0
				}, 'fast');
			},
			proBarTable(num) {
				if(num == 1) {
					this.proBar = true;
				} else {
					this.proBar = false;
				}
			},
			getBj() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/goods_other", {
					id: this.$route.query.id,
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.otherBj = res.body.standard_data;
						this.otherRz = res.body.testing_data;
						this.otherRzjc = res.body.testingjc_data;
						this.otherReport = res.body.report_data;
						//专项图集
						this.zhuanX = res.body.zhuanX;
						//电子样本
						this.dianZ = res.body.dianZ;
						//下载
						this.xianG = res.body.xianG;
						//视频
						this.shiP = res.body.shiP;
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},
			getAttr() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/product_attr", {
					id: this.$route.query.id,
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.attrArr = res.body.arr_attrs;
						this.attrCAttr = res.body.arr_attrs_only;
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},
			getcompany() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/product_company", {
					id: this.$route.query.id,
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.allCompanyData    = res.body.conpany_info;
						this.allCompanyImg     = res.body.arr_exhibition_img;
						this.allCompanyVideo     = res.body.arr_exhibition_video;
						this.allCompanyBrand   = res.body.company_brand;
						this.allCompanyNews    = res.body.company_news;
						this.allCompanyProduct = res.body.company_product;
						this.allCompanyAddress = res.body.company_caddress;
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},
			getcomment() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/product_comment", {
					id: this.$route.query.id,
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.commentData = res.body;
						this.pingData=res.body.data;
						this.$mount(this.$refs);
						this.$refs.zhichi.style.width = this.commentData.support + '%';
						this.$refs.buhaoshuo.style.width = this.commentData.neutral + '%';
						this.$refs.fandui.style.width = this.commentData.opposition + '%';
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},
			getData() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/product_info", {
					id: this.$route.query.id,
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.data = res.body.data;
						this.userName = res.body.data.username;
						this.getNewBase();
						this.companyData = res.body.conpany_info;
						if(res.body.is_collect != 0) {
							this.$refs.check.checked = true
						}
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},
			getNewBase() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/goods_newbase", {
					id: this.$route.query.id,
					username: this.userName
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.xgGoodsList = res.body.xg_product;
						this.newGoodsList = res.body.new_product;
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},
			collect() {
				if(this.$refs.check.checked) {
					this.shoucang()
				} else {
					this.delshoucang()
				}
			},
			shoucang() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/product_collect", {
					id: this.$route.query.id
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.tip = "收藏成功"
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
					} else {
						this.tip = res.body.error_description
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},
			delshoucang() {
				this.loading = true
				this.$http.post(getOpenUrl() + "/product_delCollect", {
					id: this.$route.query.id
				}, {
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {
						this.tip = "取消收藏成功"
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
					} else {
						this.tip = res.body.error_description
						this.popupVisible = true
						setTimeout(() => {
							this.popupVisible = false
						}, 1500)
					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
						}, 1500)
					}
				})
			},
			mobile() {
				this.loading = true
				this.$http.get(getOpenUrl() + "/company_lxfs", {
					params: {
						did: this.$route.query.id
					},
					headers: {
						"Authorization": "Bearer " + getToken()
					},
				}).then((res) => {
					if(res.body.code == '0000') {

					}
					this.loading = false
				}, (error) => {
					if(error.status == 401) {
						this.tip = "用户失效，请登录"
						this.popupVisible = true
						setTimeout(() => {
							this.loading = false
							this.popupVisible = false
							this.$router.push({
								path: '/login'
							});
						}, 1500)
					} else {
						this.tip = "网络不稳定，页面丢失"
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
			swiper,
			swiperSlide
		},
		computed: {
			//轮播
			swiperTab() {
				return this.$refs.mySwiperTab.swiper
			},
			swiperCon() {
				return this.$refs.mySwiperCon.swiper
			},
			//轮播1
			swiperTab1() {
				return this.$refs.mySwiperTab1.swiper
			},
			swiperCon1() {
				return this.$refs.mySwiperCon1.swiper
			},
			//video
			swiperTabvideo() {
				return this.$refs.mySwiperTabvideo.swiper
			},
			swiperConvideo() {
				return this.$refs.mySwiperConvideo.swiper
			}
		},
		beforeRouteLeave(to, from, next) {
			if(to.path == '/') {
				next(false);
				this.$router.push('/home')
			} else {
				next();
			}
		},
	}
</script>

<style scoped>
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .2s;
	}
	
	.pro-details .first-info-img>>>img {
		width: 100%;
	}
	
	.pingjia-time {
		height: 0.6rem;
		line-height: 0.6rem;
		color: #9f9fa6;
		font-size: 0.2rem;
		text-align: left;
	}
	
	.pingjia-icon {
		float: right;
	}
	
	.pingjia-icon i {
		font-size: 0.16rem;
		color: #ff651d;
		float: left;
		font-style: normal;
	}
	
	.pingjia-icon .pj-icon {
		width: 0.26rem;
		height: 0.24rem;
		display: block;
		float: left;
		margin-top: 0.17rem;
		margin-right: 0.1rem;
		object-fit: cover;
	}
	
	.pinglun-button {
		width: 2.1rem;
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
		border-radius: 0.15rem;
		border: 1px solid #ccc;
		margin: 0 auto;
		font-size: 0.2rem;
		margin-bottom: 0.1rem;
	}
	
	.all-zhichi {
		width: 2.2rem;
		height: 0.25rem;
		position: absolute;
	}
	
	.bili-box {
		position: relative;
		height: 1.4rem;
		border-left: 1px solid #ccc;
	}
	
	.zxbz-item {
		width: 100%;
		font-size: 0.2rem;
		margin-bottom: 0.25rem;
	}
	
	.zxbz-item img {
		width: 1.4rem;
		height: 1.4rem;
		background: #75cffe;
		float: left;
		margin-right: 0.2rem;
	}
	
	.zxbz-item p {
		margin-bottom: 0.9rem;
	}
	
	.zxbz-item span {
		color: #787883;
	}
	
	.pinpai-box .pinpai-item:nth-of-type(odd) {
		margin-right: 0.2rem;
	}
	
	.pinpai-box .pinpai-item:nth-of-type(even) {
		margin-left: 0.2rem;
	}
	
	.pinpai-box .pinpai-item {
		width: 2.5rem;
		float: left;
	}
	
	.pinpai-box .goPinpai {
		width: 2.5rem;
		text-align: center;
		height: 0.8rem;
		line-height: 0.8rem;
		color: #8c8c95;
		font-size: 0.2rem;
	}
	
	.pinpai-box dl dt p {
		width: 100%;
		text-align: center;
		font-size: 0.2rem;
		height: 0.34rem;
	}
	
	.pinpai-box dl dt p:last-child {
		color: #ff651d;
		margin: 0.2rem auto;
	}
	
	.pinpai-box dl dt img {
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 50%;
		background: #40484d;
		margin: 0.2rem auto;
	}
	
	.pinpai-box dl dt {
		width: 2.5rem;
		border: 1px solid #ccc;
	}
	
	.pinpai-box {
		width: calc(100% - 0.24rem);
		padding-left: 0.24rem;
		display: block;
	}
	.info-img-tit {
		width: 100%;
		line-height: 0.7rem;
		font-size: 0.2rem;
		text-align: center;
		height: 0.7rem;
		background: #fff;
	}
	
	.first-info-tr-right img {
		width: 1.2rem;
		height: 1.2rem;
		background: #bfbfbf;
	}
	
	.first-info-thead {
		width: calc(100% - 0.2rem);
		height: .6rem;
		line-height: .6rem;
		padding-left: 0.2rem;
		border-bottom: 1px solid #eee;
		font-size: 0.2rem;
	}
	
	.first-info-footer {
		border-bottom: 1px solid #eee;
		font-size: 0.2rem;
		height: 0.45rem;
		padding-top: 0.9rem;
		background: url(../../../static/images/chanpin/map.png) no-repeat center 20%;
		background-size: 1rem;
	}
	
	.footer {
		width: 100%;
		border-top: 1px solid #eee;
		height: 0.87rem;
		position: fixed;
		bottom: 0;
		background: #fff;
		z-index: 999;
	}
	
	.footer-right {
		width: calc(100% - 2.8rem);
		border-top: 1px solid #ff651d;
		height: 100%;
		background: #ff651d;
		color: #fff;
		line-height: 0.87rem;
		font-size: 0.2rem;
		text-align: center;
		float: left;
	}
	
	.footer-left-collect:last-of-type {
		width: 1.4rem;
		box-sizing: border-box;
		border-left: 1px solid #eee;
	}
	
	.footer-left-collect {
		position: relative;
		width: 1.4rem;
		height: 100%;
		text-align: center;
		float: left;
	}
	
	.footer-left-collect p {
		font-size: 0.2rem;
		width: 100%;
		height: 0.3rem;
		line-height: 0.3rem;
		display: block;
		text-align: center;
		position: absolute;
		bottom: 0;
	}
	
	.footer-left-collect label {
		width: 0.42rem;
		height: 0.4rem;
		display: block;
		z-index: 1;
	}
	
	.footer-left-collect input[type="checkbox"] {
		display: none;
		position: absolute;
	}
	
	.footer-left-collect input[type="checkbox"]+b {
		position: absolute;
		left: 0;
		bottom: -1px;
		display: inline-block;
		width: 0.42rem;
		height: 0.4rem;
		vertical-align: middle;
	}
	
	.footer-left-collect input[type="checkbox"]:checked+b {
		background: url(../../../static/images/chanpin/heartred.png) no-repeat;
		background-size: 0.42rem 0.4rem;
		border: none;
	}
	
	.footer-left-collect .sp2 {
		margin-top: 0.1rem;
		width: 0.42rem;
		height: 0.4rem;
		display: block;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		background: url(../../../static/images/chanpin/heart.png) no-repeat;
		background-size: 0.42rem 0.4rem;
	}
	
	.footer-left-collect img {
		padding-top: 0.1rem;
		width: 0.42rem;
		height: 0.4rem;
		display: block;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.footer .footer-left {
		width: 2.8rem;
		height: 100%;
		float: left;
	}
	
	.headers {
		width: calc(100% - 0.48rem);
		height: 0.58rem;
		padding: 0.7rem 0.24rem 0 0.24rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	
	.table-pro-list ul {
		width: calc(50% - 1px);
		height: 4.25rem;
		float: left;
	}
	
	.table-pro-list ul {
		padding-right: 1px;
	}
	
	.table-pro-list ul:nth-child(2n) {
		padding-right: 0;
		padding-left: 1px;
	}
	
	.table-pro-list ul .pro-list-money {
		font-size: 0.2rem;
		padding-left: 0.2rem;
		color: #ff651d;
	}
	
	.table-pro-list ul .pro-list-tit {
		font-size: 0.2rem;
		padding-left: 0.2rem;
		padding-top: 0.2rem;
	}
	
	.table-pro-list ul li img {
		width: 100%;
		height: 3.2rem;
		background: #f0e1dc;
	}
	
	.pro-bar-xg.active span {
		color: #ff651d;
	}
	
	.pro-bar-xg {
		width: 50%;
		font-size: 0.2rem;
		text-align: center;
		float: left;
	}
	
	.table-pro-bar {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		background: #fff;
	}
	
	.more-first-info {
		height: 0.75rem;
		line-height: 0.75rem;
		color: #ff651d;
		text-align: center;
		border-top: 1px solid #eee;
		font-size: 0.2rem;
		background: url(../../../static/images/chanpin/yellowRight.png) no-repeat 68% 45%;
		background-size: 0.2rem;
	}
	
	.more-first-info .jiazai {
		background: url(../../../static/images/chanpin/yellowRight.png) no-repeat 62% 45%;
		background-size: 0.2rem;
	}
	
	.first-info-img {font-size: 0.2rem;}
	
	.first-info-img p {
		font-size: 0.2rem;
		line-height: 0.35rem;
		text-indent: 0.4rem;
	}
	
	.first-info-img img {
		width: 100%;
		height: 3.7rem;
		background: #000;
	}
	
	.first-info-tr {
		width: 100%;
		height: 100%;
	}
	
	.first-info-tr-right {
		width: calc(70% - 1px - 0.2rem);
		height: .6rem;
		line-height: .6rem;
		float: left;
		border-left: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding-left: 0.2rem;
		font-size: 0.2rem;
		color: #000;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.first-info-tr-left {
		width: 30%;
		height: .6rem;
		line-height: .6rem;
		font-size: 0.2rem;
		text-align: center;
		float: left;
		border-bottom: 1px solid #eee;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.first-info {
		width: 100%;
		border: 1px solid #eee;
		border-bottom: none;
		margin-bottom: 0.1rem;
	}
	
	.logo-tit {
		width: auto;
		padding: 0 0.2rem;
		font-size: 0.2rem;
		height: 0.35rem;
		position: absolute;
		left: 50%;
		color: #74747d;
		transform: translateX(-50%);
		line-height: 0.35rem;
		background: #fff;
		top: 20%;
		z-index: 10;
	}
	
	.logo-line {
		width: 100%;
		height: 1.5px;
		background: #d9d9dc;
		position: absolute;
		top: 50%;
		z-index: 9;
	}
	
	.first {
		margin-left: 0.24rem;
		margin-right: 0.24rem;
	}
	
	.first-logo {
		width: 100%;
		height: 0.7rem;
		position: relative;
	}
	
	.shop-fenlei {
		margin-top: 0.24rem;
	}
	
	.shop-fenlei ul {
		height: 0.56rem;
		font-size: 0.2rem;
		border-right: 1px solid #eee;
		float: left;
	}
	
	.shop-fenlei ul:last-of-type {
		border-right: none;
	}
	
	.shop-fenlei li {
		text-align: center;
		width: 1.8rem;
		color: #656571;
	}
	
	.company-info img {
		width: 0.55rem;
		height: 0.55rem;
		display: block;
		float: left;
		background: #40484d;
		margin-right: 0.1rem;
	}
	
	.company-info span {
		color: #656571;
	}
	
	.company-info {
		font-size: 0.2rem;
	}
	
	.shop-box {
		height: 2.8rem;
		margin: 0.3rem 0.24rem 0 0.24rem;
	}
	
	.back {
		width: 0.42rem;
		height: 0.42rem;
		display: block;
		background: url(../../../static/images/backgray.png) no-repeat;
		background-size: 0.42rem 0.42rem;
		float: left;
	}
	
	.info {
		width: 0.42rem;
		height: 0.42rem;
		display: block;
		background: url(../../../static/images/backdian.png) no-repeat;
		background-size: 0.42rem 0.42rem;
		float: right;
	}
	
	.pingjia-button {
		height: 0.9rem;
		padding-left: 0.2rem;
	}
	
	.pingjia-button-left {
		width: 2.8rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border: 1px solid #ccc;
		text-align: center;
		font-size: 0.22rem;
		border-radius: 0.05rem;
		float: left;
		margin-right: 0.15rem;
	}
	
	.pingjia .pingjia-box {
		border-bottom: 1px solid #eee;
	}
	
	.pingjia .pingjia-box:last-child {
		border-bottom: none;
	}
	
	.pingjia-content {
		color: #656571;
		font-size: 0.2rem;
		line-height: 0.32rem;
	}
	
	.pingjia-item {
		margin: 0.26rem 0.3rem 0.3rem;
	}
	
	.logoItem span {
		font-size: 0.24rem;
		display: block;
		float: left;
		margin-left: 0.2rem;
	}
	
	.logoItem .item-logo {
		width: 0.57rem;
		height: 0.57rem;
		border-radius: 50%;
		background: #ee8a46;
		float: left;
	}
	
	.logoItem {
		height: 0.6rem;
		line-height: 0.6rem;
	}
	
	.pingjia-header-right {
		float: right;
	}
	
	.pingjia-header-left {
		float: left;
	}
	
	.pingjia-header {
		height: 0.7rem;
		line-height: 0.7rem;
		border-bottom: 1px solid #eee;
		padding-left: 0.3rem;
		padding-right: 0.6rem;
		font-size: 0.2rem;
	}
	
	.sanwei {
		height: 0.7rem;
		line-height: 0.7rem;
		font-size: 0.2rem;
		color: #656571;
	}
	
	.pro_introduce {
		padding-top: 0.26rem;
		padding-left: 0.22rem;
		padding-right: 0.22rem;
	}
	
	.pro_introduce ul {
		margin-top: 0.25rem;
		padding-bottom: 0.26rem;
		/*border-bottom: 1px solid #eee;*/
	}
	
	.pro_introduce li {
		color: #656571;
		height: 0.36rem;
		line-height: 0.36rem;
		font-size: 0.2rem;
	}
	
	.pro_introduce h1 {
		font-size: 0.3rem;
	}
	
	.pro_introduce h2 {
		font-size: 0.22rem;
	}
	
	.banner {
		height: 7.04rem;
		position: relative;
	}
	
	#swiper-container3 .swiper-slide img {
		width: 100%;
		height: 7.04rem;
		background: #d3ddef;
	}
	
	#swiper-container2 .body_bottom.active-nav {
		background: #fff !important;
	}
	
	#swiper-container2 .video_body_bottom.active-nav {
		background: url(../../../static/images/chanpin/videoPagination_.png) no-repeat;
		background-size: 0.3rem auto;
	}
	
	#swiper-container2 .body_bottom {
		width: 0.18rem;
		height: 0.18rem;
		border-radius: 50%;
		background: #e9eef7;
		margin-right: 0.15rem;
		margin-top: 0.03rem;
	}
	
	#swiper-container2 .video_body_bottom {
		width: 0.3rem;
		height: auto;
		background: url(../../../static/images/chanpin/videoPagination.png) no-repeat;
		background-size: 0.3rem auto;
	}
	
	#swiper-container2 {
		overflow: visible;
		position: absolute;
		height: 0.3rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		bottom: 0.2rem;
		width: auto;
	}
	
	.pro-detail-information {
		position: relative;
		width: 100%;
	}
	
	#swiper-container21 {
		padding-left: 0.2rem;
		/*border-bottom: 1px solid #ccc;*/
		overflow: hidden;
		background: #Fff;
		z-index: 6;
		width: calc(100% - 0.2rem);
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
	
	#swiper-container21 .body_bottom span {
		border-right: 1px solid #eee;
		padding-right: 0.3rem;
	}
	
	#swiper-container21 .active-nav1 span {
		color: #ee8a46 !important;
		margin-bottom: -1px;
	}
	
	#swiper-container21 .swiper-slide {
		color: #000;
	}
	
	#swiper-container21 .swiper-slide.shux:after {
		content: "";
		position: absolute;
		top: 25%;
		right: 0;
		height: 50%;
		width: 1px;
		background: #ccc;
	}
	/*下载*/
	
	.fanganlist {
		overflow: hidden;
		display: flex;
		padding-top: 0.24rem;
	}
	
	.falist-l {
		float: left;
		width: 1.4rem;
		height: 1.4rem;
	}
	
	.falist-l img {
		width: 1.4rem;
		/*height: 1.4rem;*/
	}
	
	.falist-r {
		flex: 1;
		position: relative;
		margin-left: 0.2rem;
	}
	
	.falist-r .li1 {
		font-size: 0.22rem;
		color: #3F3F4E;
	}
	
	.falist-r .li2 {
		font-size: 0.18rem;
		color: #898991;
	}
	
	.download a {
		color: #fff;
		background: #ff651d;
		width: 2.18rem;
		height: 0.7rem;
		border-radius: 0.05rem;
		margin: 0.3rem auto;
		font-size: 0.22rem;
		line-height: 0.7rem;
		display: block;
	}
	/*video*/
	
	#swiper-container23 {
		z-index: 5;
		overflow: hidden;
		background: #fff;
	}
	
	#swiper-container23 .swiper-slide {
		line-height: 0.7rem !important;
		color: #666 !important;
		font-size: 0.22rem !important;
		background: #fff !important;
		text-align: center;
	}
	
	.sanjiao {
		width: 0;
		height: 0;
		border-left: 0.06rem solid transparent;
		border-right: 0.06rem solid transparent;
		border-bottom: 0.12rem solid #fd9b3a;
	}
	
	#swiper-container23 .active-nav3 {
		border: 2px solid #fd9b3a;
	}
</style>