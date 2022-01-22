var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        'Access-Control-Allow-Origin': '*'
    });
    let reg = /\.ico/,
        url = request.url.slice(1),
        obj = null;
    if (!reg.test(url)) {
        switch (url) {
            case 'nav':
                obj = {
                    show: false,
                    list: [
                        'page1', 'page2'
                    ]
                }
                break;
            case url:
                obj = {
                    name: url
                }
                break;
        }
    }
    response.end(JSON.stringify(obj));
}).listen(8888);