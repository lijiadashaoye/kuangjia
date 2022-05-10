import Vue from 'vue';import VueRouter from 'vue-router';import Login from '@/uitls/layout/login.vue';
                            /*  在这个里写新增的全局必用组件  */

                        Vue.use(VueRouter);
                        const routes = [
                            {
                                path: '/',
                                redirect: {name:'login'}
                            },
                            {
                                name: 'login',
                                path: '/login',
                                component: Login /* 登录组件 */
                            },
                         {
                            name: 'passAction',
                            path: '/passAction',
                            component: () =>import('@/uitls/layout/passAction') /* 修改密码组件 */
                         },
                         {
                            name: 'content',
                            path: '/content',
                            component: () =>import('@/uitls/layout/content')/* 主要内容显示组件 */,children: [{
                    path: '/content/introduce', 
                    name: 'introduce',
                    component: () => import('@/views/introduce/App.vue'),
                    children:[...require('@/views/introduce/router/index.js').default,]},{
                    path: '/content/page1', 
                    name: 'page1',
                    component: () => import('@/views/page1/App.vue'),
                    children:[...require('@/views/page1/router/index.js').default,]},{
                    path: '/content/page2', 
                    name: 'page2',
                    component: () => import('@/views/page2/App.vue'),
                    children:[...require('@/views/page2/router.js').default,]},]},{
            path: '*',
            component: () =>import('@/uitls/layout/404') /* 404组件 */
        }];
const router = new VueRouter({
                            // mode: 'history',
                            base: process.env.BASE_URL,
                            routes
                         });
                    /* 重写路由push方法，防止点击同一个路由时报错 */const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {if (onResolve || onReject) {return originalPush.call(this, location, onResolve, onReject)} else {return originalPush.call(this, location).catch(err => err)}};
export default router