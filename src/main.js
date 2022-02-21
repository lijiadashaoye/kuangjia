import Vue from 'vue'
import App from './uitls/App.vue'
import router from './uitls/router'
import store from './uitls/store'
import fromAxios from './uitls/axios'

import ElementUI from 'element-ui';
import './uitls/formateCss.scss'
Vue.use(ElementUI);

Vue.prototype.$bus = new Vue(); //  this.$bus.$emit("busEmit", "busEmit");
Vue.prototype.$axios = fromAxios.axios;
Vue.prototype.$seStorage = fromAxios.seStorage;
Vue.prototype.$loStorage = fromAxios.loStorage;
Vue.prototype.$mesh = fromAxios.mesh; // 埋点  this.$mesh({ name: "asdfsad" });
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')