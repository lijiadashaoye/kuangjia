import Vue from 'vue'
import App from './uitls/App.vue'
import router from './uitls/router'
import store from './uitls/store'
import fromAxios from './uitls/axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$bus = new Vue(); //  this.$bus.$emit("busEmit", "busEmit");
Vue.prototype.$axios = fromAxios.axios;
Vue.prototype.$sessionSto = fromAxios.seStorage;
Vue.prototype.$localSto = fromAxios.loStorage;

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')