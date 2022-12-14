import Vue from 'vue'
import App from './App.vue'
//import router from './router'
import store from './store'
import axios from 'axios'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'

import 'jquery'

import showdown from 'showdown'
Vue.prototype.converter = new showdown.Converter();


Vue.use(mavonEditor);

Vue.config.productionTip = false

new Vue({
  //router,
  store,
  render: h => h(App)
}).$mount('#app')
