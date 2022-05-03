import Vue from 'vue'
import App from './layout/App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import './formateCss.scss';
// 全部引入
import ElementUI from 'element-ui';
Vue.use(ElementUI);

Vue.prototype.$bus = new Vue(); //  this.$bus.$emit("busEmit", "busEmit");
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
require('./component.js')

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')