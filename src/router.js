import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from '@/components/login';

Vue.use(VueRouter);
const routes = [{
    name: 'login',
    path: '/',
    component: Login
}, {
    name: 'content',
    path: '/content',
    component: () =>
        import ('@/components/content'),
    children: [require('@/views/page1/router.js').default, require('@/views/page2/router.js').default]
}]
const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes,
    })
    // 防止路由跳转时 path 没变会报错
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(() => {})
}
export default router