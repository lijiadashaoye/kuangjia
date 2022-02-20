var http = require("http");
let makeNav = [{
    id: '1',
    label: 'page1',
    icon: 'el-icon-location',
    children: [{
            id: '1-1',
            label: 'page1-1'
        },
        {
            id: '1-2',
            label: 'page1-2'
        },
    ]
}, {
    id: '2',
    label: 'page2',
    icon: 'el-icon-video-camera-solid',
    children: [{
        id: '2-1',
        label: 'page2-1',
        children: [{
            id: '2-1-1',
            label: 'page2-1-1',
            children: [{
                    id: '2-1-1-1',
                    label: 'page2-1-1-1'
                },
                {
                    id: '2-1-1-2',
                    label: 'page2-1-1-2'
                },
            ]
        }]
    }]
}, {
    id: '3',
    label: 'page3',
    icon: 'el-icon-video-camera-solid',
}]; // 实时生成导航数据

http.createServer(function(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-methods': 'GET,HEAD,POST',
        'access-control-allow-credentials': true
    });
    let reg = /\.ico/,
        url = request.url.slice(1),
        obj = null, // 返回给浏览器的数据
        data = []; // 接收post数据用

    if (!reg.test(url)) {
        switch (url) {
            case 'upload':
                makeNav = [];
                request.on('data', c => {
                    data.push(c)
                })
                request.on('end', () => {
                    let arr = JSON.parse(data.toString());
                    arr.forEach((str, ind) => {
                        makeNav.push({
                            id: `${ind + 1}`,
                            label: str,
                            icon: 'el-icon-location',
                        }, {
                            id: '2',
                            label: 'page2',
                            icon: 'el-icon-video-camera-solid',
                            children: [{
                                id: '2-1',
                                label: 'page2-1',
                                children: [{
                                    id: '2-1-1',
                                    label: 'page2-1-1',
                                    children: [{
                                            id: '2-1-1-1',
                                            label: 'page2-1-1-1'
                                        },
                                        {
                                            id: '2-1-1-2',
                                            label: 'page2-1-1-2'
                                        },
                                    ]
                                }]
                            }]
                        })
                    });
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
                response.end(JSON.stringify(obj));
                break;
            case 'new':
                response.end(JSON.stringify([
                    "tip1 tip1 tip1 tip1 tip1 tip1 tip1 ",
                    "新增某某某，某某某某",
                    "修改某某某某某某某某某某某某，某某某某",
                ]));
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
                    response.end(JSON.stringify(obj));
                })
                break;
        }
    }
}).listen(8888);