export default {

    name: 'page2',
    path: '/content/page2',
    component: () =>
        import ('@/views/page2/index.vue'),
    children: [{
            name: 'page2-page1',
            path: '/content/page2/page1',
            component: () =>
                import ('@/views/page2/pages/page1.vue')
        },
        {
            name: 'page2-page2',
            path: '/content/page2/page2',
            component: () =>
                import ('@/views/page2/pages/page2.vue')
        },

    ]

}