const http = require("http");
const fs = require("fs");
const path = require('path')

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
http.createServer(function(request, res) {
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-methods': 'GET,HEAD,POST',
        'access-control-allow-credentials': true
    });
    let reg = /\.ico/,
        url = request.url.split('/'),
        obj = null, // 返回给浏览器的数据
        data = []; // 接收post数据用
    if (!reg.test(url[1])) {

        switch (url[1]) {
            // 用来上传文件，但目前没用
            case 'upload':
                request.on('data', c => {
                    data.push(c)
                })
                request.on('end', () => {
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
                request.on('data', c => {
                    data.push(c)
                })
                request.on('end', () => {
                    obj = {
                        ...JSON.parse(data.toString()),
                        token: 'token1111',
                        navList: makeNav
                    }
                    res.end(JSON.stringify(obj));
                })
                break;
            case 'dist':
                let filepath = path.join(__dirname, ...url); // 文件件路径+文件名
                let baseName = path.extname(request.url); // 文件名拓展
                // let dirPath = path.join(__dirname, url[1]); // 文件件路径
                fs.access(filepath, (t) => {
                    let readFile = '',
                        header = {},
                        reg1 = /.css$/ig,
                        reg2 = /.js$/ig;

                    if (!t) {
                        // 不是压缩文件
                        readFile = filepath;
                        if (reg1.test(baseName)) {
                            header = {
                                'Content-Type': 'text/css;charset=utf-8',
                            }
                        } else
                        if (reg2.test(baseName)) {
                            header = {
                                'Content-Type': 'application/javascript; charset=utf-8',

                            }
                        } else {
                            header = {
                                'Content-Type': 'text/html;charset=utf-8'
                            }
                        }
                    } else {
                        // 是压缩文件
                        readFile = filepath + '.gz'

                        if (reg1.test(baseName)) {
                            header = {
                                'Content-Type': 'text/css;charset=utf-8',
                                'Content-Encoding': 'gzip, deflate, br'
                            }
                        } else
                        if (reg2.test(baseName)) {
                            header = {
                                'Content-Type': 'application/javascript; charset=utf-8',
                                'Content-Encoding': 'gzip, deflate, br'
                            }
                        } else {
                            header = {
                                'Content-Type': 'text/html;charset=utf-8'
                            }
                        }
                    }
                    readFileFn(readFile, header, res)
                })

                break;
        }
    }
}).listen(7777);


function readFileFn(readFile, header, res) {
    // fs.stat() 返回文件
    fs.stat(readFile, function(err, stats) {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
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