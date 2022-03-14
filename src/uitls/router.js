import Vue from 'vue';import VueRouter from 'vue-router';import Login from '@/components/layout/login';
                            /*  在这个里写新增的全局必用组件  */
                        
                            Vue.use(VueRouter);
                            const routes = [
                                {
                                    path: '*',
                                    redirect: {name:'login'}
                                },
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
                                component: () =>import('@/components/layout/passAction') /* 修改密码组件 */
                             },
                             {
                                name: 'content',
                                path: '/content',
                                component: () =>import('@/components/layout/content')/* 主要内容显示组件 */,children: [require('@/views/page1/router.js').default]}];
const router = new VueRouter({
                                // mode: 'history',
                                base: process.env.BASE_URL,
                                routes
                             });
                        /* 重写路由push方法，防止点击同一个路由时报错 */const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {if (onResolve || onReject) {return originalPush.call(this, location, onResolve, onReject)} else {return originalPush.call(this, location).catch(err => err)}};
export default router