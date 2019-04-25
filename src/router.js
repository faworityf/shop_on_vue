import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from '@/views/Home'
import Category from '@/views/Category'
Vue.use(Router)

let obj = {
    router: [
        {
            path: '/',
            name: 'home',
            component: Category,
            menu: 'main'
        },
        {
            path: '/:alias/',
            name: 'items',
            component: Category,
            menu: 'main'
        },
        {
            path: '/vodka/:alias/',
            name: 'vodka',
            component: Category,
            menu: 'main'
        },
        {
            path: '/:alias/:alias/',
            name: 'subitems',
            component: Category,
            menu: 'main'
        },
        {
            path: '/:alias/:alias/:alias/',
            name: 'item',
            component: Category,
            menu: 'main'
        },
        {
            path: '/:alias/:alias/:alias/:alias/',
            name: 'item1',
            component: Category,
            menu: 'main'
        },
    ]
};


export default new Router({
    props: true,
    mode: 'history',
    routes: obj.router
})
