// 引入自动构建router和store的文件
require('./remake')
    /*  项目优化  */
const WebpackBar = require('webpackbar');
const zopfli = require("@gfx/zopfli");
const BrotliPlugin = require("brotli-webpack-plugin");
const gZipRreg = new RegExp(`\\.(${['js', 'css', 'png', 'jpg', 'svg'].join('|')})$`);

// 全局变量 .env 文件里定义的
// console.log(process.env.NB);
// 环境判断
module.exports = {
    assetsDir: 'assets',
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        open: true,
        port: '5432',
        inline: true,
        compress: true,
        progress: false,
        proxy: {
            // 获取数据的代理，跨域用
            '/datas': {
                target: 'http://localhost:7777/',
                changeOrigin: true,
                pathRewrite: {
                    // 忽略特定的 url 字符串
                    '^/datas': '/datas'
                }
            }
        }
    },
    configureWebpack: config => {
        config.output = Object.assign(config.output, {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
            crossOriginLoading: "anonymous",
        });
        // if (process.env.NODE_ENV === 'production') {
        // 开启分离js
        config.optimization = {
            chunkIds: 'size',
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all', // 不管异步加载还是同步加载的模块都提取出来，打包到一个文件中。
                maxAsyncRequests: Infinity, // 最大的按需(异步)加载次数，默认为 6。
                maxInitialRequests: Infinity, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件），默认为4。
                maxSize: 100000, // 100k 把提取出来的模块打包生成的文件大小不能超过maxSize值，如果超过了，要对其进行分割并打包生成新的文件
                name: () => 'nb',
                cacheGroups: { // 配置提取模块的方案
                    // 其余选项和外面一致，若cacheGroups每项中有，就按配置的，没有就使用外面配置的。
                    vendor: {
                        minChunks: 1,
                        priority: 2, // 执行优先级，默认为0，数字越大表示优先级越高
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: 1,
                        reuseExistingChunk: true,
                    },
                }
            }
        };
        // }

    },
    chainWebpack: config => {
        // 移除prefetch插件，避免加载多余的资源
        config.plugins.delete('prefetch');
        // 修改entry
        config.entry('app')
            .clear()
            .add('./src/uitls/main.js');
        // 修改title
        config.plugin('html')
            .tap(args => {
                args[0].title = '结合node的框架'
                return args
            });
        if (process.env.NODE_ENV === 'production') {
            // 使用进度条显示打包进度
            config.plugin('webpackBar')
                .use(new WebpackBar());
            // 多进程压缩js
            config.plugin('uglifyjs-plugin')
                .use('uglifyjs-webpack-plugin', [{
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
                            collapse_vars: false,
                            // 提取出出现多次但是没有定义成变量去引用的静态值
                            reduce_vars: true,
                            pure_funcs: ['console.log']
                        }
                    }
                }])
                .end();
            // Brotli 是由 Google 开发的无损压缩算法，可以在几乎相同的速度下比 gzip 得到更好的压缩效果，并且它已经被绝大多数现代浏览器所支持：
            config.plugin('brotliPlugin')
                .use(new BrotliPlugin({
                    // 压缩算法函数。
                    algorithm(input, compressionOptions, callback) {
                        return zopfli.gzip(input, compressionOptions, callback);
                    },
                    minRatio: 0.8, // 仅处理压缩比此比率更高的资产
                    test: gZipRreg,
                    deleteOriginalAssets: true // 是否删除原资源
                }));
        }
    }
}