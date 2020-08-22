// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import JsonViewer from 'vue-json-viewer'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'

Vue.use(VueRouter);
Vue.prototype.$ajax = axios;
Vue.use(ElementUI, { locale })
Vue.use(JsonViewer)

Vue.config.productionTip = false


var router = new VueRouter(routerConfig);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router: router,
})
