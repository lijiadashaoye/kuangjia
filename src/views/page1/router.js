export default {
    name: 'page1_router',
    path: '/content/1',
    component: () =>
        import ('@/views/page1/index.vue'),
    children: [{
            name: '1-1',
            path: '/content/1/1-1',
            component: () =>
                import ('@/views/page1/pages/page1.vue'),

        },
        {
            name: '1-2',
            path: '/content/1/1-2',
            component: () =>
                import ('@/views/page1/pages/page2.vue'),
        },

    ]

}