export default {
    routes:
        [
            {
                path: "/",
               redirect:"/upload",
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
            }
        ]
}
