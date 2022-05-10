let fs = require('fs'),
    pagePath = `${__dirname}/src/views`,
    dir = fs.readdirSync(pagePath);
if (dir.length) {
    let storePath = `${__dirname}/src/uitls/store.js`,
        routePath = `${__dirname}/src/uitls/router.js`,
        storeArr = [
            `import Vue from 'vue';\nimport Vuex from 'vuex';\n`,
            `Vue.use(Vuex);let page = sessionStorage.getItem("page"),showNav = sessionStorage.getItem("showNav");`,
            `export default new Vuex.Store({modules: {`,
            `}, state: {page:page?page:null /* 记录被选中的导航 */,showNav:showNav?showNav:true/* 导航模式为menu时，导航宽度展开与折叠 */,
        },mutations: {
                /* 退出系统初始化所有数据 */resetDatas(state) {state.page =null;state.showNav= true;Object.keys(sessionStorage).forEach((str)=>{if(str != "userInfo"){sessionStorage.removeItem(str)}})},
                /* 导航点击切换页面 */chagePage(state, str) {state.page = str},
                /* 导航宽度的展开与折叠 */showNavFn(state) {state.showNav = !state.showNav},
            },actions: {}})`
        ],
        routerArr = [`import Vue from 'vue';import VueRouter from 'vue-router';import Login from '@/uitls/layout/login.vue';
                            /*  在这个里写新增的全局必用组件  */

                        `, `Vue.use(VueRouter);
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
                            component: () =>import('@/uitls/layout/content')/* 主要内容显示组件 */,children: [`,
            `]},{
            path: '*',
            component: () =>import('@/uitls/layout/404') /* 404组件 */
        }];\nconst router = new VueRouter({
                            // mode: 'history',
                            base: process.env.BASE_URL,
                            routes
                         });
                    /* 重写路由push方法，防止点击同一个路由时报错 */const originalPush = VueRouter.prototype.push;\nVueRouter.prototype.push = function push(location, onResolve, onReject) {if (onResolve || onReject) {return originalPush.call(this, location, onResolve, onReject)} else {return originalPush.call(this, location).catch(err => err)}};\nexport default router`
        ],
        urlArr = [
            "import login from './layout/login.js';\n",
            "export default {",
            '...login}'
        ],
        imports = '',
        modules = '',
        routerFile = [],
        urlImport = '',
        urlModule = '',
        componentsImport = "import Vue from 'vue'\n",
        componentsFile = '';
    for (let i = 0; i < dir.length; i++) {
        let content = fs.readdirSync(`${pagePath}/${dir[i]}`),
            dirApp = '',
            dirChildren = '';

        for (let j = 0; j < content.length; j++) {
            let str = content[j],
                store = /store/ig,
                router = /router/ig,
                App = /App/ig,
                url = /url/ig,
                components = /components/ig,
                nowPath = `${pagePath}/${dir[i]}/${str}`;

            if (store.test(str)) {
                let stat = fs.statSync(nowPath);
                if (stat.isFile()) {
                    imports += `import ${dir[i]} from '@/views/${dir[i]}/${str}';\n`
                    modules += `${dir[i]},`
                } else {
                    let arr = fs.readdirSync(`${pagePath}/${dir[i]}/${str}`);
                    for (let k = 0; k < arr.length; k++) {
                        imports += `import ${dir[i]} from '@/views/${dir[i]}/${str}/${arr[k]}';\n`
                        modules += `${dir[i]},`
                    }
                }
            }
            if (router.test(str)) {
                let stat = fs.statSync(nowPath);
                if (stat.isFile()) {
                    dirChildren += `...require('@/views/${dir[i]}/${str}').default,`
                } else {
                    let arr = fs.readdirSync(`${pagePath}/${dir[i]}/${str}`);
                    for (let k = 0; k < arr.length; k++) {
                        dirChildren += `...require('@/views/${dir[i]}/${str}/${arr[k]}').default,`
                    }
                }
            }
            if (App.test(str)) {
                dirApp = `{
                    path: '/content/${dir[i]}', 
                    name: '${dir[i]}',
                    component: () => import('@/views/${dir[i]}/${str}'),
                    children:[`
            }
            if (url.test(str)) {
                urlModule += `...${dir[i]},`
                urlImport += `import ${dir[i]} from '@/views/${dir[i]}/${str}';\n`
            }
            if (components.test(str)) {
                let arr = fs.readdirSync(`${pagePath}/${dir[i]}/${str}`);
                for (let k = 0; k < arr.length; k++) {
                    let name = arr[k].split('.')[0];
                    componentsImport += `import ${name} from '@/views/${dir[i]}/${str}/${arr[k]}';\n`
                    componentsFile += `Vue.component('${name}', ${name})\n`
                }
            }
        }
        routerFile.push(dirApp + dirChildren + ']},')
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
        let strs = `${routerArr[0]+routerArr[1]+ routerFile.join('') +routerArr[2]}`
        fs.writeFile(routePath, strs, () => {
            console.log('router 写入成功')
        })
    })
    // 自动写入 allUrl.js 文件
    let urlPath = `${__dirname}/src/uitls/allUrl.js`
    fs.unlink(urlPath, () => {
        let strs = `${urlArr[0] +urlImport+urlArr[1]+urlModule+urlArr[2]}`
        fs.writeFile(urlPath, strs, () => {
            console.log('allUrl 写入成功')
        })
    })
    // 读取每个views里的components文件夹
    let arr = fs.readdirSync(`${__dirname}/src/components`);
    for (let k = 0; k < arr.length; k++) {
        let name = arr[k].split('.')[0];
        componentsImport += `import ${name} from '@/components/${arr[k]}';\n`
        componentsFile += `Vue.component('${name}', ${name})\n`
    }
    // 自动挂载组件
    fs.unlink(`${__dirname}/src/uitls/component.js`, () => {
        let strs = `${componentsImport+componentsFile}`;
        fs.writeFile(`${__dirname}/src/uitls/component.js`, strs, () => {
            console.log('组件挂载成功');
        })
    })

}