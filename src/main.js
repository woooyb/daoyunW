// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/icons.css'
import './assets/css/style.css'
import '@/assets/css/icons.css'
import '@/assets/css/style.css'
import '@/assets/css/bootstrap.min.css'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Resource from 'vue-resource'
import md5 from 'js-md5'
import BaiduMap from 'vue-baidu-map'


Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'y2j12NPgbyD06lG538uSGK4GaCH4bZ1v'
})
// axios.defaults.baseURL = 'http://47.94.234.206/'
axios.defaults.baseURL = 'http://139.224.2.119:8080/'       //api

Vue.use(Resource)

//Vue.prototype.HOST = '/api'
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>',
  data () {
    return {
      // ukey: null,
      // ui: ''
    }
  }
})
