import Vue from 'vue'
import App from './App.vue'
 
Vue.config.productionTip = false

Vue.prototype.serverUrl="https://garbage.azuresky.top/wx/"
Vue.prototype.imageUrl="http://azuresky.top:9010/images/static/"
Vue.prototype.historyUrl="http://azuresky.top:9010/"

App.mpType = 'app'

const app = new Vue({
	// el: '#app',
	// render: h => h(App)
    ...App
})
app.$mount()

