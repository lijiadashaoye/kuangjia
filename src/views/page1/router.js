export default {
    name: 'page1',
    path: '/content/page1',
    component: () =>
        import ('@/views/page1/index.vue'),
    children: [{
            name: 'page1-page1',
            path: '/content/page1/page1',
            component: () =>
                import ('@/views/page1/pages/page1.vue')
        },
        {
            name: 'page1-page2',
            path: '/content/page1/page2',
            component: () =>
                import ('@/views/page1/pages/page2.vue')
        },

    ]

}