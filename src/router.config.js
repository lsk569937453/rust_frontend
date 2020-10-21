import Router from 'vue-router'


const routerConfig = new Router({
    routes:
        [
            {
                path: "/",
                redirect: "/loginPage",
            },
            {
                path: '/refresh',
                component: () => import(/* webpackChunkName: "home" */ './components/refresh.vue'),
            },
            {
                path: '/',
                component: () => import(/* webpackChunkName: "home" */ './components/home.vue'),
                meta: {
                    title: '自述文件', requireAuth: true
                },
                children: [
                    {
                        path: "/realPage",
                        component: () => import(/* webpackChunkName: "index" */ './components/TemplatePage.vue'),

                    },
                    {
                        path: "/taskPage",
                        name: "taskPage",
                        component: () => import(/* webpackChunkName: "index" */ './components/taskPage.vue'),
                    }, {
                        path: "/addHttpTask",
                        component: () => import(/* webpackChunkName: "index" */ './components/addHttpTask.vue'),
                    },
                    {
                        path: "/addGrpcTask",
                        component: () => import(/* webpackChunkName: "index" */ './components/addGrpcTask.vue'),
                    },
                    {
                        path: "/mainPage",
                        component: () => import(/* webpackChunkName: "index" */ './components/navMenu.vue'),
                    },
                    {
                        path: "/taskhistory",
                        name: "taskhistory",
                        component: () => import(/* webpackChunkName: "index" */ './components/TaskHistory.vue'),
                    },
                    {
                        path: "/shareFile",
                        name: "shareFile",
                        component: () => import(/* webpackChunkName: "index" */ './components/fileShare/fileShare.vue'),
                    }, {
                        path: "/downloadShare",
                        name: "downloadShare",
                        component: () => import(/* webpackChunkName: "index" */ './components/fileShare/downloadShare.vue'),
                    }

                ]
            },


            {
                path: "/loginPage",
                name: "loginPage",
                component: () => import(/* webpackChunkName: "index" */ './components/login.vue'),
            }
        ]

})

// 判断是否需要登录权限 以及是否登录
routerConfig.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if (localStorage.getItem('username')) {// 判断是否登录
            next()
        } else {// 没登录则跳转到登录界面
            next({
                path: '/loginPage',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next()
    }
})

export default routerConfig
