// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "font-awesome/css/font-awesome.css"


import JsonViewer from 'vue-json-viewer'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'
// import {library} from '@fortawesome/fontawesome-svg-core'
// import {fas} from '@fortawesome/free-solid-svg-icons'
// import {far} from '@fortawesome/free-regular-svg-icons'
// import {fab} from '@fortawesome/free-brands-svg-icons'
// import {FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText}
//     from '@fortawesome/vue-fontawesome'
//
// library.add(fas, far, fab)
//
// Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.component('font-awesome-layers', FontAwesomeLayers)
// Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.use(VueRouter);

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
