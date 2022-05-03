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