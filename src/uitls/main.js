import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fromAxios from './axios'
import './formateCss.scss';
// 全部引入
import ElementUI from 'element-ui';
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