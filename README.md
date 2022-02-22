### 框架介绍
自己用vue搭建的框架，主要配置在 vue.config.js 文件里
### 启动方式
npm run withNode ：会启动一个node服务器（使用 node.js 文件），一个完整的本地开发环境 <br/>
npm start：只运行vue，需要在login.vue组件的login方法里修改代码<br/>
npm run build：打包
### 项目结构
1：不需要写主要的router和store文件，项目启动时会自动生成，但需要用在全局的组件，需要在vue.config.js 文件的<br/> /*  在这个里写新增的全局组件  */ 底下写入import文件及在下边写好路由配置<br/>
2：服务器返回导航数据，在 @/components/nav 文件里生成导航组件<br/>
3：@/components/login 是登陆页面，也是项目启动后最先展示的页面<br/>
4：每个导航对应一个 views 目录下的一个文件夹，每个导航有自己的 router 和 store，其中，store使用命名空间，空间名就是文件夹的名字<br/>
5：node.js 文件是为了模拟http请求，可以删除<br/>
6：没有安装 UI 插件<br/>
7：this.$bus 调用全局事件传递数据的方法<br/>
8：this.$axios 调用全局http请求的方法<br/>
9：this.$seStorage 调用全局seStoragerage的方法（this.$seStorage.get(name)、this.$seStorage.set(name,data)）,data若是对象数据，会自动JSON化<br/>
10：this.$loStorage 调用全局loStoragerage的方法（this.$loStorage.get(name)、this.$loStorage.set(name,data)）,data若是对象数据，会自动JSON化<br/>
11：全局的样式写在 @/uitls/formateCss.scss<br/>
12：图标主要用elementUI里的图标，如果无法满足，可以用阿里图库：https://www.iconfont.cn/，然后把图标文件放入 assets/icon 里<br/>
13：全局的图片文件放在 @/assets/img 里<br/>
14：可以在 @/uitls/formateCss.scss 里写全局css样式以及对elementUI样式的更改<br/>
15：在 @/components/layout/content.vue 里通过判断是否有 token 验证是否已登录，若没有自动跳到登录页面<br/>
### 文件目录
project        
--|--public  // index.html和ico文件          
--|--package.json   // 项目包      
--|--vue.config.js  // 项目配置及自动生成store、router文件配置        
--|--src       
------|--assets    // 图片和图标文件         
------|--icon // 如果使用其他图标（如阿里图标库）则放到这里      
------|--img  // 项目中使用的图片       
------|--components  // 布局组件及公共组件保存位置          
-------------|--publicComponents  // 公共组件       
-------------|--layout  // 项目基础布局用到的组件        
-------------|--background.vue  // 绘制登陆页面背景（可以不用）         
-------------|--content.vue  // 登录后显示内容的主体内容，在这个组件内进行路由         
-------------|--login.vue  // 登录组件         
-------------|--nav.menu.vue  // 使用elementUI导航组件做的项目导航      
-------------|--submenu.vue  // 使用elementUI导航组件做的项目导航的下级导航封装，可以无限有子级导航        
-------------|--nav.tree.vue  // 使用elementUI树组件做的项目导航        
-------------|--passAction.vue  // 密码修改页面          
------|--uitls  // 项目公共文件         
-----------|--App.vue         
-----------|--axios.js  // 项目公共文件      
-----------|--formateCss.scss  // 全局css样式以及对elementUI样式的更改          
-----------|--router.js  // 项目主体路由文件，每次项目启动会自动生成，若有其他全局的router配置，需要到vue.config.js写        
-----------|--store.js  // 项目状态管理文件，每次项目启动会自动生成，若有其他全局的store配置，需要到vue.config.js写          
------|--views  // 每一个页面是一个独立的文件夹        
----------|--page1      
--------------|--pages // 当前导航页面中用到的子组件保存位置        
--------------|--index.vue  // 当前导航的主页面      
--------------|--router.js  // 当前导航的独立router配置，以 path: `/content/${navId}`,形式跳转,navId为服务器给的导航id          
--------------|--store.js   // 当前导航的独立store配置，到时候自动以文件夹名字进行命名空间调用，如this.$store.state.page1.page1State      
----------|--main.js         
