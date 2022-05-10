<template>
  <div class="app">
    <ul>
      <li v-for="(t, i) of list" :key="i">{{ `${i + 1}：` }}{{ t }}</li>
    </ul>
    <div class="duibi">
      <div>
        <p>router.js文件迁移说明</p>
        <div class="kk">
          <div>
            <p>原来的样子</p>
            <pre>
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router

            </pre>
          </div>
          <div>
            <p>迁移后的样子</p>
            <pre>
const routes = [{
    path: '/content/page1/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/content/page1/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
 ]
export default routes
            </pre>
          </div>
        </div>
      </div>
      <div>
        <p>store.js文件迁移说明</p>
        <div class="kk">
          <div>
            <p>原来的样子</p>
            <pre>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
</pre
            >
          </div>
          <div>
            <p>迁移后的样子</p>
            <pre>
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {}
 }</pre
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        "不需要手动编写全局的router.js、store.js文件",
        "被封装的组件，可以写到 @/components 里，也可以只保存在每个 @/views 下文件夹自己的 components 文件夹里",
        "@/views 文件夹里的每一个文件夹是一个独立的路由模块，与导航进行对应，点击导航执行的是 this.$router.push({name: routerName}); routerName就是每个文件夹名字",
        "@/views 文件夹里的每一个文件夹，可以有两种文件组织方式：",
        " 第一种：把其他项目的文件直接复制过来，并将相应的 ./store/index.js 文件和 ./router/index.js 文件稍加改变，其他文件夹无需变动，同时 ./components/* 里的组件会自动被挂载到全局，文件名就是引用组件的标签名，参考 @/views/page1",
        " 第二种：把其他项目的文件内容根据作用命名后复制过来，既：状态管理文件命名为 store.js 直接放到文件夹里，路由文件命名为 router.js 直接放到文件夹里，参考 @/views/page2",
        "迁移时，不需要main.js 文件，url.js 保存接口数据",
        "每个文件夹使用命名空间执行状态管理，文件夹名字就是空间的名字，例如：this.$store.state.page1.page；this.$store.commit('page1/changePage', 'changePage');",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
li {
  font-size: 14px;
  padding: 3px;
}
.duibi {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 50% 50%;
  border: 1px solid rgb(242, 242, 242);
}
.kk {
  display: grid;
  grid-template-columns: 50% 50%;
  pre {
    padding: 3px;
    width: calc(100% - 6px);
    overflow-x: auto;
    border: 1px solid rgb(252, 218, 218);
  }
}
</style>
