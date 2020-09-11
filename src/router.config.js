export default {
  routes:
    [
      {
        path: "/",
        redirect: "/loginPage",
      },
      {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ './components/home.vue'),
        meta: { title: '自述文件' },
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
          }, {
            path: "/taskhistory",
            name: "taskhistory",
            component: () => import(/* webpackChunkName: "index" */ './components/TaskHistory.vue'),
          },
        ]
      },




      {
        path: "/loginPage",
        name: "loginPage",
        component: () => import(/* webpackChunkName: "index" */ './components/login.vue'),
      }
    ]
}
