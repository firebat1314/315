import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import VueResource from "vue-resource"
Vue.use(VueResource)
//组件
import Footer from './components/public/Footer.vue'
Vue.component(Footer.name, Footer)
import Header from './components/public/Header.vue'
Vue.component(Header.name, Header)
import Header1 from './components/public/Header1.vue'
Vue.component(Header1.name, Header1)
import Header2 from './components/public/Header2.vue'
Vue.component(Header2.name, Header2)
import Loading from './components/public/Loading.vue'
Vue.component(Loading.name, Loading)
import Nomore from './components/public/Nomore.vue'
Vue.component(Nomore.name, Nomore)
import Iheader from './components/public/Iheader.vue'
Vue.component(Iheader.name, Iheader)
import 'vue-awesome-swiper/dist/vue-awesome-swiper.min.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
//懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: './static/images/lazy-wrong.png',
	loading: './static/images/lazy-load.gif',
	attempt: 1
});
import 'mint-ui/lib/style.css'

import store from './vuex/store'
new Vue({
  el: '#app',
  store,//使用store
  router,
  template: '<App/>',
  components: { App }
})
