// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastClick'
import axios from 'axios'
import store from './store'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import { LoadingPlugin, AlertPlugin } from 'vux'
import VueClipboard from 'vue-clipboard2'
import md5 from 'js-md5'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.prototype.$http = axios
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(VueClipboard)
Vue.use(ElementUI);

Vue.prototype.$md5 = md5;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
