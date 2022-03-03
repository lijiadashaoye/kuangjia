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
                            const routes = [{
                                name: 'login',
                                path: '/',
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
    /*  项目优化  */

const WebpackBar = require('webpackbar');
// 全局变量
// console.log(process.env.NB);
// 环境判断
// if (process.env.NODE_ENV === 'production') {}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '',
    productionSourceMap: false,
    devServer: {
        open: true,
        port: '5432',
        inline: true,
        compress: true,
        proxy: {
            '/client': {
                target: 'http://localhost:8888/',
                changeOrigin: true,
                pathRewrite: {
                    // 忽略特定的 url 字符串
                    '^/client': ''
                }
            },
        }
    },
    configureWebpack: config => {
        config.output = Object.assign(config.output, {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
            crossOriginLoading: "anonymous",
        });
        config.entry.app = './src/uitls/main.js';
        // 使用CDN加载的，需要在 public/index.html文件内写上资源CDN地址
        // config.externals = {
        //     'vue': 'Vue'
        // };
        // 开启分离js
        config.optimization = {
            chunkIds: 'natural',
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all', // 不管异步加载还是同步加载的模块都提取出来，打包到一个文件中。
                maxAsyncRequests: Infinity, // 最大的按需(异步)加载次数，默认为 6。
                maxInitialRequests: Infinity, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件），默认为4。
                maxSize: 200000, // 把提取出来的模块打包生成的文件大小不能超过maxSize值，如果超过了，要对其进行分割并打包生成新的文件
                minChunks: 1,
                cacheGroups: { // 配置提取模块的方案
                    // 其余选项和外面一致，若cacheGroups每项中有，就按配置的，没有就使用外面配置的。
                    vendor: {
                        priority: 2, // 执行优先级，默认为0，数字越大表示优先级越高
                        test: /[\\/]node_modules[\\/]/,
                        reuseExistingChunk: true,
                        name(module) {
                            const packageName = (module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]).replace('@', '')
                            return `nb.${packageName}`;
                        }
                    },
                    default: {
                        minChunks: 2,
                        priority: 1,
                        reuseExistingChunk: true,
                    },
                }
            }
        };
        config.plugins = [...config.plugins,
            new WebpackBar(),
        ];
    },
    chainWebpack: config => {
        //     // 多进程压缩js
        config.plugin('uglifyjs-plugin').use('uglifyjs-webpack-plugin', [{
                uglifyOptions: {
                    cache: true,
                    parallel: true,
                    warnings: false,
                    sourceMap: false,
                    output: {
                        beautify: true, // 最紧凑的输出
                        comments: true, // 删除所有的注释
                    },
                    compress: {
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                        pure_funcs: ['console.log']
                    }
                }
            }])
            .end();
        // 修改title
        config.plugin('html').tap(args => {
            args[0].title = '结合node的框架'
            return args
        });
    },
}