import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
	routes: [{
			path: '/',
			component: resolve => require(['@/components/index'], resolve)
		},
		{
			path: '/url',
			component: resolve => require(['@/components/Home/url'], resolve)
		},
		{
			path: '/saoma',
			component: resolve => require(['@/components/Home/saoma'], resolve)
		},
		{
			path: '/fa_message',
			component: resolve => require(['@/components/Home/fa_message'], resolve)
		},
		{
			path: '/fa_more_message',
			component: resolve => require(['@/components/Home/fa_more_message'], resolve)
		},
		{
			path: '/test',
			component: resolve => require(['@/components/test'], resolve)
		},
		{
			path: '/test2',
			component: resolve => require(['@/components/test2'], resolve)
		},
		{
			path: '/nearby',
			component: resolve => require(['@/components/Home/nearby'], resolve)
		},
		{
			path: '/home',
			component: resolve => require(['@/components/Home'], resolve),
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/zhuanti',
			component: resolve => require(['@/components/Home/zhuanti'], resolve)
		},
		{
			path: '/zxlist',
			component: resolve => require(['@/components/Home/zxlist'], resolve),
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/xydetail',
			component: resolve => require(['@/components/Home/xydetail'], resolve)
		},
		{
			path: '/classify',
			component: resolve => require(['@/components/Home/classify'], resolve)
		},
		{
			path: '/classdetail',
			component: resolve => require(['@/components/Home/classdetail'], resolve)
		},
		//店铺
		{
			path: '/shop',
			component: resolve => require(['@/components/Shop'], resolve)
		},
		{
			path: '/shopdetails',
			component: resolve => require(['@/components/Shop/shopdetails'], resolve)
		},
		//分类
		{
			path: '/class',
			component: resolve => require(['@/components/Class'], resolve),
			meta: {
				keepAlive: true
			}
		},
		
		
		{
			path: '/login',
			component: resolve => require(['@/components/Login'], resolve)
		},
		{
			path: '/register',
			component: resolve => require(['@/components/Register'], resolve)
		},
		{
			path: '/tongyi',
			component: resolve => require(['@/components/Register/tongyi'], resolve)
		},
		{
			path: '/forget',
			component: resolve => require(['@/components/Forget'], resolve)
		},
		//个人中心
		{
			path: '/personal',
			component: resolve => require(['@/components/Personal'], resolve),
			meta: {
				keepAlive: true
			}
		},
		//设置
		{
			path: '/setting',
			component: resolve => require(['@/components/Personal/Setting'], resolve)
		},
		{
			path: '/guanyu',
			component: resolve => require(['@/components/Personal/Setting/guanyu'], resolve)
		},
		{
			path: '/xgmm',
			component: resolve => require(['@/components/Personal/Setting/xgmm'], resolve)
		},
		{
			path: '/xgyx',
			component: resolve => require(['@/components/Personal/Setting/xgyx'], resolve)
		},
		{
			path: '/xgphone',
			component: resolve => require(['@/components/Personal/Setting/xgphone'], resolve)
		},
		{
			path: '/myzl',
			component: resolve => require(['@/components/Personal/Setting/myziliao'], resolve)
		},
		{
			path: '/dwxz',
			component: resolve => require(['@/components/Personal/Setting/danweixingzhi'], resolve)
		},
		{
			path: '/grjj',
			component: resolve => require(['@/components/Personal/Setting/gerenjianjie'], resolve)
		},
		{
			path: '/text',
			component: resolve => require(['@/components/Personal/Setting/text'], resolve)
		},
		{
			path: '/dz',
			component: resolve => require(['@/components/Personal/Setting/lianxidizhi'], resolve)
		},
		{
			path: '/sex',
			component: resolve => require(['@/components/Personal/Setting/sex'], resolve)
		},
		//收藏
		{
			path: '/keep',
			component: resolve => require(['@/components/Personal/Keep'], resolve)
		},
		//企业信息
		{
			path: '/apply',
			component: resolve => require(['@/components/Personal/Information/apply'], resolve)
		},
		{
			path: '/information',
			component: resolve => require(['@/components/Personal/Information'], resolve)
		},
		{
			path: '/jiben',
			component: resolve => require(['@/components/Personal/Information/jibenxinxi'], resolve),
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/qymc',
			component: resolve => require(['@/components/Personal/Information/qiyemingcheng'], resolve)
		},
		{
			path: '/zyhy',
			component: resolve => require(['@/components/Personal/Information/zhuyinghangye'], resolve)
		},
		{
			path: '/show',
			component: resolve => require(['@/components/Personal/Information/show'], resolve)
		},
		{
			path: '/showvideo',
			component: resolve => require(['@/components/Personal/Information/showvideo'], resolve)
		},
		{
			path: '/qyxw',
			component: resolve => require(['@/components/Personal/Information/qiyexinwen'], resolve)
		},
		{
			path: '/qyzl',
			component: resolve => require(['@/components/Personal/Information/qiyeziliao'], resolve)
		},
		{
			path: '/ppnews',
			component: resolve => require(['@/components/Personal/Information/pinpainews'], resolve)
		},
		{
			path: '/info',
			component: resolve => require(['@/components/Personal/Information/info'], resolve)
		},
		{
			path: '/bjinfo',
			component: resolve => require(['@/components/Personal/Information/bjinfo'], resolve)
		},
		{
			path: '/bjdz',
			component: resolve => require(['@/components/Personal/Information/bjdz'], resolve)
		},
		//个人中心模板
		{
			path: '/upload',
			component: resolve => require(['@/components/Personal/Comment/upload'], resolve)
		},
		{
			path: '/zlupload',
			component: resolve => require(['@/components/Personal/Comment/zlupload'], resolve)
		},
		{
			path: '/newsupload',
			component: resolve => require(['@/components/Personal/Comment/newsupload'], resolve)
		},
		{
			path: '/newslist',
			component: resolve => require(['@/components/Personal/Comment/newslist'], resolve)
		},
		{
			path: '/editor',
			component: resolve => require(['@/components/Personal/Comment/editor'], resolve)
		},
		//帮助
		
		{
			path: '/help',
			component: resolve => require(['@/components/Personal/Help'], resolve)
		},
		{
			path: '/helpdetail',
			component: resolve => require(['@/components/Personal/Help/helpdetail'], resolve)
		},
		//图集
		{
			path: '/photo',
			component: resolve => require(['@/components/Photo'], resolve),
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/photodetail',
			component: resolve => require(['@/components/Photo/photodetail'], resolve)
		},
		//发现
		{
			path: '/find',
			component: resolve => require(['@/components/Find'], resolve),
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/finddetail',
			component: resolve => require(['@/components/Find/finddetail'], resolve)
		},
		{
			path: '/find_message',
			component: resolve => require(['@/components/Find/find_message'], resolve)
		},
		{
			path: '/find_more_message',
			component: resolve => require(['@/components/Find/find_more_message'], resolve)
		},
		//产品开始
		{
			path: '/products',
			component: resolve => require(['@/components/Products'], resolve)
		},
		{
			path: '/zhuantipro',
			component: resolve => require(['@/components/Products/zhuantipro'], resolve)
		},
		{
			path: '/map',
			component: resolve => require(['@/components/Products/map'], resolve)
		},
		{
			path: '/pro_details',
			component: resolve => require(['@/components/Products/pro_details'], resolve)
		},
		{
			path: '/pro_message',
			component: resolve => require(['@/components/Products/pro_message'], resolve)
		},
		{
			path: '/more_message',
			component: resolve => require(['@/components/Products/more_message'], resolve)
		},
		{
			path: '/more_baodao',
			component: resolve => require(['@/components/Products/more_baodao'], resolve)
		},
		//搜索
		{
			path: '/search',
			component: resolve => require(['@/components/Search'], resolve)
		},
		{
			path: '/qiyesearch',
			component: resolve => require(['@/components/Search/qiyesearch'], resolve)
		}
	]
})