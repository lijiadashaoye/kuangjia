import Vue from 'vue';
import Vuex from 'vuex';
import introduce from '@/views/introduce/store/index.js';
import page1 from '@/views/page1/store/index.js';
import page2 from '@/views/page2/store.js';
Vue.use(Vuex);
let page = sessionStorage.getItem("page"),
        showNav = sessionStorage.getItem("showNav");
export default new Vuex.Store({
        modules: {
                introduce,
                page1,
                page2,
        },
        state: {
                page: page ? page : null /* 记录被选中的导航 */ ,
                showNav: showNav ? showNav : true,
                /* 导航模式为menu时，导航宽度展开与折叠 */

        },
        mutations: {
                /* 退出系统初始化所有数据 */
                resetDatas(state) {
                        state.page = null;
                        state.showNav = true;
                        Object.keys(sessionStorage).forEach((str) => {
                                if (str != "userInfo") {
                                        sessionStorage.removeItem(str)
                                }
                        })
                },
                /* 导航点击切换页面 */
                chagePage(state, str) {
                        state.page = str
                },
                /* 导航宽度的展开与折叠 */
                showNavFn(state) {
                        state.showNav = !state.showNav
                },

        },
        actions: {}
})