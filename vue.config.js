let fs = require('fs');
fs.readFile(`${__dirname}/store.js`, 'utf8', (err, datas) => {
    let arr = [];
    if (datas) {
        let reg1 = /(?=(\/\/\s+)?)Vue.use/ig,
            reg2 = /(?<=modules:\s+?{)(\s+)?/ig,
            reg3 = /(?<=(\/\/\s+)?)state/ig,
            reg4 = /(?=(\/\/\s+)?)export/ig,
            str = datas.toString();
        arr = [
            str.slice(0, str.search(reg1)).replace(/\n/ig, ''),
            str.slice(str.search(reg1), str.search(reg4)).replace(/\n/ig, ''),
            str.slice(str.search(reg4), str.search(reg2)),
            '},// 设置全局store\n',
            str.slice(str.search(reg3)).replace(/\n/ig, ''),
        ];
    } else {
        arr = [
            `import Vue from 'vue';\nimport Vuex from 'vuex';\n`,
            `Vue.use(Vuex);\n`,
            `export default new Vuex.Store({modules: {`,
            `},// 设置全局store\n`,
            `state: {page: 'login'},mutations: {chagePage(state, str) {state.page = str}},actions: {}})`
        ]
    }
    fs.unlink(`${__dirname}/src/store.js`, (err) => {
        makeStore(arr)
    })
})
fs.readdir(`${__dirname}/src/views`, 'utf8', async(err, dirs) => {
    new Promise(async res => {
            let arr = []
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
            makeRouter(re)
        })
})

// 自动写入 store 文件
function makeStore(arr) {
    new Promise(res => {
            let arr = [];
            fs.readdir(`${__dirname}/src/views`, async(err, dir) => {
                for (let i = 0; i < dir.length; i++) {
                    await new Promise(resolve => {
                        fs.readdir(`${__dirname}/src/views/${dir[i]}`, (err, files) => {
                            let fileName = files.find(t => /store/.test(t));
                            arr.push({
                                name: dir[i],
                                path: `./views/${dir[i]}/${fileName}`
                            })
                            resolve()
                        })
                    })
                }
                res(arr)
            })
        })
        .then(res => {
            let imports = '',
                module = '';
            for (let i = 0; i < res.length; i++) {
                imports += `import ${res[i].name} from '${res[i].path}';\n`
                module += `${res[i].name},`
            }
            fs.writeFile('./src/store.js', `${arr[0]}${imports}${arr[1]}${arr[2]}${module}${arr[3]}${arr[4]}`, (err) => {
                console.log('写入成功');
            })
        })
}
// 自动写入 router 文件
function makeRouter(re) {
    fs.readFile(`${__dirname}/src/router.js`, 'utf8', (err, datas) => {
        let arr = [];
        if (datas) {
            let str = datas.toString(),
                reg1 = /(?=(\/\/\s+)?)Vue.use/ig,
                reg2 = /(?=(\/\/\s+)?)const routes(\s+)?=/ig,
                reg3 = /(?=children:(\s+)?\[)/ig,
                reg4 = /(?=(\/\/\s+)?)const router(\s+)?=/ig,
                reg5 = /(?=(\/\/\s+)?)export/ig;
            arr = [
                str.slice(0, str.search(reg1)).replace(/\n/ig, '').split('import').map(s => s ? ((s + '\n')) : '').join('import '),
                str.slice(str.search(reg1), str.search(reg2)).replace(/\n/ig, ''),
                str.slice(str.search(reg2), str.search(reg3)).replace(/\n/ig, ''),
                `children:[`,
                ']}]\n' + str.slice(str.search(reg4), str.search(reg5)).replace(/\n/ig, ''),
                str.slice(str.search(reg5)).replace(/\n/ig, ''),
            ]
        } else {
            arr = [
                `import Vue from 'vue'\nimport VueRouter from 'vue-router';\nimport Login from '@/components/login';\n`,
                `Vue.use(VueRouter);\n`,
                `const routes = [{
        name: 'login',
        path: '/',
        component: Login
    }, {
        name: 'content',
        path: '/content',
        component: () =>
            import('@/components/content'),`,
                `children: [`,
                `]}]\nconst router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })`,
                `export default router`
            ]
        }
        fs.unlink(`${__dirname}/src/router.js`, (err) => {
            let strs = `${arr[0]}\n${arr[1]}\n${arr[2]}\n${arr[3]}${re}\n${arr[4]}\n${arr[5]}`
            fs.writeFile('./src/router.js', strs, (err) => {
                console.log('写入成功')
            })
        })
    })
}