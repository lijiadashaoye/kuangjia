import Vue from 'vue';
import Vuex from 'vuex';
import page1 from './views/page1/store.js';
import page2 from './views/page2/store.js';
Vue.use(Vuex);
export default new Vuex.Store({modules: {page1,page2,},// 设置全局store
state: {page: 'login'},mutations: {chagePage(state, str) {state.page = str}},actions: {}})