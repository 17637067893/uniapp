import Vue from 'vue'
import App from './App'

import store from './store/index.js';

Vue.prototype.$store = store;

import request from 'common/request.js'
import until from 'common/until.js'

Vue.prototype.$request = request
Vue.prototype.$until = until

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
