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
http.createServer(function (req, res) {
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
                case 'login':
                    // 用户登录
                    req.on('data', c => {
                        data.push(c)
                    })
                    req.on('end', () => {
                        obj = {
                            ...JSON.parse(data.toString()),
                            token: 'token1111',
                        }
                        res.end(JSON.stringify(obj));
                    })
                    break;
                case 'navList':
                    let navList = [{
                        id: 'page1',
                        label: 'page1',
                        icon: 'el-icon-video-camera-solid',
                    }, {
                        id: 'page2',
                        label: 'page2',
                        icon: 'el-icon-location',
                        children: [{
                            id: 'page2_1',
                            label: 'page2-1'
                        }]
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
                    }, {
                        id: 'introduce',
                        label: '框架介绍',
                        icon: 'el-icon-message-solid',
                    }]; // 导航数据
                    res.end(JSON.stringify(navList));
                    break;
                case 'system':
                    res.end('纯净的前端框架');
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
    fs.stat(readFile, function (err, stats) {
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