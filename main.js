import Vue from 'vue'
import App from './App.vue'
 
Vue.config.productionTip = false

Vue.prototype.serverUrl="http://azuresky.top:8899/wx/"
Vue.prototype.imageUrl="http://azuresky.top:9010/images/static/"
App.mpType = 'app'

const app = new Vue({
	// el: '#app',
	// render: h => h(App)
    ...App
})
app.$mount()
