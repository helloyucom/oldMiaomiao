import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'

Vue.use(router)

// 添加过滤图片地址的过滤器(全局过滤器)
Vue.filter('setWH', (url,arg) => {
    return url.replace(/w\.h/, arg)
})

Vue.prototype.axios = axios

// 做一个全局的组件注册
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
