let fs = require('fs'),
    storePath = `${__dirname}/src/uitls/store.js`,
    routePath = `${__dirname}/src/uitls/router.js`;
// 自动写入 store.js 文件
let arr = [
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
    views = [],
    imports = '',
    modules = '';
fs.readdir(`${__dirname}/src/views`, async(err, dir) => {
        for (let i = 0; i < dir.length; i++) {
            await new Promise(resolve => {
                fs.readdir(`${__dirname}/src/views/${dir[i]}`, (err, files) => {
                    let fileName = files.find(t => /store/.test(t));
                    views.push({
                        name: dir[i],
                        path: `@/views/${dir[i]}/${fileName}`
                    })
                    resolve()
                })
            })
        }
        for (let i = 0; i < views.length; i++) {
            imports += `import ${views[i].name} from '${views[i].path}';\n`
            modules += `${views[i].name},`
        }
        fs.unlink(storePath, (err) => {
            fs.writeFile(storePath, `${arr[0]}${imports}${arr[1]}${arr[2]}${modules}${arr[3]}`, (err) => {
                console.log('store 写入成功');
            })
        })
    })
    // 自动写入 router.js 文件
fs.readdir(`${__dirname}/src/views`, 'utf8', async(err, dirs) => {
    // 读取每个页面的router.js文件
    await new Promise(async res => {
            let arr = [];
            for (let j = 0; j < dirs.length; j++) {
                await new Promise(resolve => {
                    fs.readdir(`${__dirname}/src/views/${dirs[j]}`, 'utf8', (err, datas) => {
                        for (let i = 0; i < datas.length; i++) {
                            if (/router/ig.test(datas[i])) {
                                arr.push(`require('@/views/${dirs[j]}/${datas[i]}').default`)
                            }

                        }
                        resolve(arr)
                    })
                })
            }
            res(arr)
        })
        .then(re => {
            let arr = [`import Vue from 'vue';import VueRouter from 'vue-router';import Login from '@/components/layout/login';
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
                                mode: 'history',
                                base: process.env.BASE_URL,
                                routes
                             });
                        /* 重写路由push方法，防止点击同一个路由时报错 */const originalPush = VueRouter.prototype.push;\nVueRouter.prototype.push = function push(location, onResolve, onReject) {if (onResolve || onReject) {return originalPush.call(this, location, onResolve, onReject)} else {return originalPush.call(this, location).catch(err => err)}};\nexport default router`
            ]
            fs.unlink(routePath, (err) => {
                let strs = `${arr[0]}${arr[1]}${re}${arr[2]}`
                fs.writeFile('./src/uitls/router.js', strs, (err) => {
                    console.log('router 写入成功')
                })
            })

        })
})