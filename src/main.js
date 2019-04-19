// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import el from 'element-ui'
import ts from 'tesla-ui'
import 'tesla-ui/dist/index.css'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/sass/sass-index.scss'
import '@/assets/common/style/style.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from '@/vuex/store'
Vue.use(mavonEditor) 
Vue.config.productionTip = false
Vue.use(el)
Vue.use(ts)
Vue.use(BootstrapVue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
