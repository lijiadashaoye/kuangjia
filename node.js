const http = require("http");
const fs = require("fs");
const path = require('path')
const fileType = {
    'png': 'image/png',
    "css": 'text/css',
    "js": 'application/javascript',
    "html": 'text/html',
    "ico": 'image/x-icon',
    'jpg': 'image/jpeg',
    "svg": "image/svg+xml",
    'woff': 'application/font-woff',
    'ttf': 'application/x-font-ttf'
}
let makeNav = [{
    id: '1',
    label: 'page1',
    icon: 'el-icon-video-camera-solid',
}, {
    id: '2',
    label: 'page2',
    icon: 'el-icon-location',
    children: [{
            id: '2-1',
            label: 'page2-1'
        },
        {
            id: '2-2',
            label: 'page2-2'
        },
    ]
}, {
    id: '3',
    label: 'page3',
    icon: 'el-icon-video-camera-solid',
    children: [{
        id: '3-1',
        label: 'page3-1',
        children: [{
            id: '3-1-1',
            label: 'page3-1-1',
            children: [{
                    id: '3-1-1-1',
                    label: 'page3-1-1-1'
                },
                {
                    id: '3-1-1-2',
                    label: 'page3-1-1-2'
                },
            ]
        }]
    }]
}]; // 导航数据
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-methods': 'GET,HEAD,POST',
        'access-control-allow-credentials': true
    });
    let url = req.url.split('/'),
        obj = null, // 返回给浏览器的数据
        data = [], // 接收post数据用
        filepath = '', // 文件件路径+文件名
        type = '',
        baseName = path.extname(req.url); // 文件名拓展
    switch (url[1]) {
        case '':
            filepath = path.join(__dirname, 'dist', 'index.html');
            baseName = 'html';
            readFileFn(filepath, baseName, res);
            break;
        case 'assets':
            filepath = path.join(__dirname, 'dist', ...url);
            type = url[url.length - 1].split('.');
            baseName = type[type.length - 1];
            readFileFn(filepath, baseName, res);
            break;
        case 'js':
            filepath = path.join(__dirname, 'dist', ...url);
            baseName = 'js';
            readFileFn(filepath, baseName, res);
            break;
        case 'datas':
            switch (url[2]) {
                // 用来上传文件，但目前没用
                case 'upload':
                    req.on('data', c => {
                        data.push(c)
                    })
                    req.on('end', () => {
                        let arr = JSON.parse(data.toString());
                        res.end(JSON.stringify(arr));
                    });
                    break;
                case 'system':
                    obj = {
                        versionData: "当前版本 Beta 0.6",
                        mainInfoData: [{
                                id: 1,
                                text: "数据库设计工具、代码生成工具、文档生成工具、生成规则模板库",
                            },
                            {
                                id: 2,
                                text: "自定义模板扩展库管理、业务组件模板、项目管理、安全管理等",
                            },
                        ],
                        featureList: ["提高编码质量", "解决重复编码工作", "提升开发效率"],
                        tip: [
                            "tip1 tip1 tip1 tip1 tip1 tip1 tip1 ",
                            "新增某某某，某某某某",
                            "修改某某某某某某某某某某某某，某某某某",
                        ],
                        yinsi: [
                            "隐私政策11111111111111111",
                            "隐私政策2222222222222222222222222",
                        ],
                        xieyi: [
                            '用户服务协议11111111111',
                            '用户服务协议2222222222222222',
                        ]
                    }
                    res.end(JSON.stringify(obj));
                    break;
                case 'login':
                    // 用户登录
                    req.on('data', c => {
                        data.push(c)
                    })
                    req.on('end', () => {
                        obj = {
                            ...JSON.parse(data.toString()),
                            token: 'token1111',
                            navList: makeNav
                        }
                        res.end(JSON.stringify(obj));
                    })
                    break;
            }
            break;
        default:
            filepath = path.join(__dirname, 'dist', url[url.length - 1]);
            baseName = 'ico';
            readFileFn(filepath, baseName, res);
            break;
    }
}).listen(7777);

function readFileFn(readFile, baseName, res) {
    let header = {}
    fs.access(readFile, (t) => {
        if (!t) {
            // 不是压缩文件
            header = {
                'Content-Type': `${fileType[baseName]}`,
            }
            backFile(readFile, header, res)
        } else {
            fs.access(readFile + '.gz', (s) => {
                if (!s) {
                    // 是 gzip 文件
                    readFile += '.gz'
                    header = {
                        'Content-Type': `${fileType[baseName]}`,
                        'Content-Encoding': 'gzip',
                        'Accept-Encoding': 'gzip,br',
                    }
                } else {
                    // 是压缩文件
                    readFile += '.br'
                    header = {
                        'Content-Type': `${fileType[baseName]}`,
                        'Content-Encoding': 'br',
                        'Accept-Encoding': 'gzip,br',
                    }
                }
                backFile(readFile, header, res)
            })
        }
    })
}

function backFile(readFile, header, res) {
    // fs.stat() 返回文件
    fs.stat(readFile, function(err, stats) {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain;charset=utf-8'
            });
            res.end('500 啦');
        } else {
            if (stats.isFile()) {
                var file = fs.createReadStream(readFile);
                res.writeHead(200, header);
                file.pipe(res);
            }
        }
    });
}