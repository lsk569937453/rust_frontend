export default {
    routes:
        [
            {
                path: "/",
                redirect: "/timePage",
            },
            {
                path: "/upload",
                component: () => import(/* webpackChunkName: "index" */ './components/UploadPage.vue'),
            },
            {
                path: "/template",
                component: () => import(/* webpackChunkName: "index" */ './components/MainNewPage.vue'),
            },
            {
                path: "/realPage",
                component: () => import(/* webpackChunkName: "index" */ './components/TemplatePage.vue'),
            },
            {
                path: "/timePage",
                component: () => import(/* webpackChunkName: "index" */ './components/TimePage.vue'),
            }, {
                path: "/addTask",
                component: () => import(/* webpackChunkName: "index" */ './components/addTask.vue'),
            },
            {
                path: "/mainPage",
                component: () => import(/* webpackChunkName: "index" */ './components/main.vue'),
            }, {
                path: "/taskhistory",
                component: () => import(/* webpackChunkName: "index" */ './components/TaskHistory.vue'),
            }
        ]
}
