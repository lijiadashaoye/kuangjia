# 框架介绍
自己用vue搭建的框架，主要配置在 vue.config.js 文件里
# 启动方式
npm run withNode ：会启动一个node服务器（使用 node.js 文件），一个完整的本地开发环境 <br/>
npm start：只运行vue，需要在login.vue组件的login方法里修改代码<br/>
npm run build：打包

# 项目结构
1：不需要写主要的router和store文件，项目启动时会自动生成，但需要用在全局的组件，需要在vue.config.js 文件的<br/> /*  在这个里写新增的全局组件  */ 底下写入import文件及在下边写好路由配置<br/>
2：服务器返回导航数据，在 @/components/nav 文件里生成导航组件<br/>
3：@/components/login 是登陆页面，也是项目启动后最先展示的页面<br/>
4：每个导航对应一个 views 目录下的一个文件夹，每个导航有自己的 router 和 store，其中，store使用命名空间，空间名就是文件夹的名字<br/>
5：node.js 文件是为了模拟http请求，可以删除<br/>
6：没有安装 UI 插件<br/>
7：this.$bus 调用全局事件传递数据的方法<br/>
8：this.$axios 调用全局http请求的方法<br/>
9：this.$sessionSto 调用全局sessionStorage的方法（this.$sessionSto.get(name)、this.$sessionSto.set(name,data)）,data若是对象数据，会自动JSON化<br/>
10：this.$localSto 调用全局localStorage的方法（this.$localSto.get(name)、this.$localSto.set(name,data)）,data若是对象数据，会自动JSON化<br/>
11：全局的样式写在 @/uitls/formateCss.scss<br/>
12：图标主要用elementUI里的图标，如果无法满足，可以用阿里图库：https://www.iconfont.cn/，然后把图标文件放入 assets/icon 里<br/>
13：全局的图片文件放在 @/assets/img 里<br/>
