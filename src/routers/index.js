import Vue from 'vue'
import Router from 'vue-router'
import cinemaRouter from './cinema'
import movieRouter from './movie'
import mineRouter from './mine'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        cinemaRouter,
        movieRouter,
        mineRouter,
        {
            path: '/*',
            redirect: '/movie'
        }
    ]
})
