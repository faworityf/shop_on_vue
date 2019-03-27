import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

let obj = store.getters.Obj;


export default new Router({
    props: true,
    mode: 'history',
    routes: obj
})
