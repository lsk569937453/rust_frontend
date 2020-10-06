// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "font-awesome/css/font-awesome.css"

import VueClipboard from 'vue-clipboard2'

import JsonViewer from 'vue-json-viewer'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'

// import VueWasm from 'vue-wasm';
// import defaultWasm from './assets/share_assembly_bg.wasm';
//
// VueWasm(Vue, {modules: {defaultModule: defaultWasm}});

Vue.use(VueRouter);
Vue.use(VueClipboard)

//add the code ,the menu could be  clicked
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

Vue.prototype.$ajax = axios;
Vue.use(ElementUI, {locale})
Vue.use(JsonViewer)

Vue.config.productionTip = false


var router = new VueRouter(routerConfig);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
    router: router,
})
