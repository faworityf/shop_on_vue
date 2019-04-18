import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Home from '@/views/Home'
import Category from '@/views/Category'
import Vuebar from 'vuebar';

Vue.use(Vuebar);
Vue.use(Vuex);
let global_obj = {
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            menu: 'main'
        },
    ],
    items: [],
}
let itemsGot = 0;
// let route = 'http://absolut-kiev.com'
let route = ''
export default new Vuex.Store({
    state: {
        globalObj: {
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
                    name: 'item',
                    component: Category,
                    menu: 'main'
                },
            ]
        },
        mainRoutes: [],
        favorites: [],
        items: [],
        subRoutes: [],
        parents: [],
    },
    getters: {
        Obj: state => {
            return state.globalObj.router
        },
        mainRoutes: state => {
            return state.mainRoutes
        },
        favorites: state => {
            return state.favorites
        },
        items: state => {
            return state.items
        },
        subRoutes: state => {
            return state.subRoutes
        },
        parents: state => {
            return state.parents
        },
    },
    mutations: {
        SET_MainRoute: (state, mainRoutes) => {
            state.mainRoutes = mainRoutes;
            state.parents = state.parents.concat(mainRoutes);
        },
        SET_Favorites: (state, favorites) => {
            state.favorites = favorites;
        },
        SET_SubRoute: (state, subRoutes) => {
            state.subRoutes = subRoutes;
            state.parents = state.parents.concat(subRoutes);

        },
        SET_Items: (state, items) => {
            // console.log(state.items.concat(items))
            state.items = state.items.concat(items);
        },
        SET_items_Filters: (state, items) => {
            state.filters = items;
        }
    },

    actions: {
        SET_MainRoute: async (context) => {
            axios.get(route + '/start.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText);
                    for (let resp in responseText.catalog) {
                        responseText.catalog[resp].component = Category
                    }
                    console.log(1)
                    context.commit('SET_MainRoute', responseText.catalog);

                })
        },
        SET_Favorites: async (context) => {
            axios.get(route + '/favorite.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText);
                    for (let resp in responseText.catalog) {
                        responseText.catalog[resp].component = Category
                    }
                    context.commit('SET_Favorites', responseText.catalog);

                })
        },
        SET_SubRoute: async (context) => {
            axios.get(route + '/subMenu.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText);
                    for (let resp in responseText.catalog) {
                        responseText.catalog[resp].component = Category
                    }
                    context.commit('SET_SubRoute', responseText.catalog);

                })
        },
        SET_Items: async (context) => {

            function getItemsBack() {
                axios.get(route + '/items.html&offset=' + itemsGot)
                    .then(function (response) {
                        if(!response.data.length) {return}
                        let responseText = response.data.replace(/\r|\n/g, '');
                        responseText = responseText.replace(/}, ]/g, '}]');
                        responseText = JSON.parse(responseText);
                        for (let resp in responseText.catalog) {
                            responseText.catalog[resp].component = Category
                        }
                        context.commit('SET_Items', responseText.catalog);
                        if(itemsGot != 1000) {itemsGot += 50; getItemsBack();}
                    })
            }
            getItemsBack()
        },
        SET_items_Filters: (context, st) => {
            context.commit('SET_items_Filters', st);
        },
        SET_COOKIE_CART: (context, st) => {
            sessionStorage.setItem('cartItems', JSON.stringify(st));
        }
    }
})
