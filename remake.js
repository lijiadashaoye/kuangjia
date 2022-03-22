let fs = require('fs'),
    storePath = `${__dirname}/src/uitls/store.js`,
    routePath = `${__dirname}/src/uitls/router.js`;

let storeArr = [
        `import Vue from 'vue';\nimport Vuex from 'vuex';\n`,
        `Vue.use(Vuex);let page = localStorage.getItem("page"),showNav = localStorage.getItem("showNav");`,
        `export default new Vuex.Store({modules: {`,
        `}, state: {page:page?page:null /* 记录被选中的导航 */,showNav:showNav?showNav:true/* 导航模式为menu时，导航宽度展开与折叠 */
        },mutations: {
                /* 退出系统初始化所有数据 */resetDatas(state) {state.page =null;state.showNav= true},
                /* 导航点击切换页面 */chagePage(state, str) {state.page = str},
                /* 导航宽度的展开与折叠 */showNavFn(state) {state.showNav = !state.showNav},
            },actions: {}})`
    ],
    routerArr = [`import Vue from 'vue';import VueRouter from 'vue-router';import Login from '@/components/layout/login';
                            /*  在这个里写新增的全局必用组件  */

                        `, `Vue.use(VueRouter);
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
                            component: () =>import('@/components/layout/content')/* 主要内容显示组件 */,children: [`,
        `]}];\nconst router = new VueRouter({
                            // mode: 'history',
                            base: process.env.BASE_URL,
                            routes
                         });
                    /* 重写路由push方法，防止点击同一个路由时报错 */const originalPush = VueRouter.prototype.push;\nVueRouter.prototype.push = function push(location, onResolve, onReject) {if (onResolve || onReject) {return originalPush.call(this, location, onResolve, onReject)} else {return originalPush.call(this, location).catch(err => err)}};\nexport default router`
    ],
    routers = '',
    imports = '',
    modules = '';
let dir = fs.readdirSync(`${__dirname}/src/views`);
for (let i = 0; i < dir.length; i++) {
    let files = fs.readdirSync(`${__dirname}/src/views/${dir[i]}`);
    imports += `import ${dir[i]} from '${`@/views/${dir[i]}/${files.find(t => /store/.test(t))}`}';\n`
    modules += `${dir[i]},`
    routers += `require('@/views/${dir[i]}/${files.find(t => /router/.test(t))}').default`
}
// 自动写入 store.js 文件
fs.unlink(storePath, () => {
    let strs = `${storeArr[0]+imports+storeArr[1]+storeArr[2]+modules+storeArr[3]}`;
    fs.writeFile(storePath, strs, () => {
        console.log('store 写入成功');
    })
})
// 自动写入 router.js 文件
fs.unlink(routePath, () => {
    let strs = `${routerArr[0]+routerArr[1]+routers+routerArr[2]}`
    fs.writeFile(routePath, strs, () => {
        console.log('router 写入成功')
    })
})
