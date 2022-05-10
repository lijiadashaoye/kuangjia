export default {
  namespaced: true,
  state: {
    page: 'page1'
  },
  getters: {},
  mutations: {
    changePage(state, page) {
      state.page = page
    },
  },
  actions: {}
}