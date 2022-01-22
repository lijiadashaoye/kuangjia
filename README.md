# kuangjia

自己用vue搭建的框架，主要配置在 vue.config.js 文件里

# 项目结构
1：不需要写主要的router和store文件，项目启动时会自动生成<br/>
2：服务器返回导航数据，在 components/nav 文件里生成导航组件<br/>
3：components/login 是登陆页面，也是项目启动后最先展示的页面<br/>
4：每个导航对应一个 views 目录下的一个文件夹，每个导航有自己的 router 和 store，其中，store使用命名空间，空间名就是文件夹的名字<br/>
5：node.js 文件是为了模拟http请求，可以删除<br/>
6：没有安装 UI 插件<br/>
7：this.$bus 调用全局事件传递数据的方法<br/>
8：this.$axios 调用全局http请求的方法<br/>
9：this.$sessionSto 调用全局sessionStorage的方法（this.$sessionSto.get(name)、this.$sessionSto.set(name,data)）,data若是对象数据，会自动JSON化<br/>
10：this.$localSto 调用全局localStorage的方法（this.$localSto.get(name)、this.$localSto.set(name,data)）,data若是对象数据，会自动JSON化<br/>
