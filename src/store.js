import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Home from '@/views/Home'
import Category from '@/views/Category'

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
                    name: 'home',
                    component: Category,
                    menu: 'main'
                },
                {
                    path: '/:alias/:alias/',
                    name: 'home',
                    component: Category,
                    menu: 'main'
                },
                {
                    path: '/:alias/:alias/:alias/',
                    name: 'home',
                    component: Category,
                    menu: 'main'
                },
            ]
        },
        mainRoutes: [],
        favorites: [],
        items: [],
        subRoutes: [],
        parents:[],
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
            // state.globalObj.router = state.globalObj.router.concat(favorites);
        },
        SET_SubRoute: (state, subRoutes) => {
            state.subRoutes = subRoutes;
            state.parents = state.parents.concat(subRoutes);

        },
        SET_Items: (state, items) => {
            state.items = items;
            // state.globalObj.router = state.globalObj.router.concat(items);

        },
        SET_items_Filters: (state, items) => {
            state.filters = items;
        }
    },

    actions: {
        SET_MainRoute: async (context) => {
            axios.get('http://m.absolut-kiev.com/start.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText);
                    for (let resp in responseText.catalog)  {
                        responseText.catalog[resp].component = Category
                    }
                    context.commit('SET_MainRoute', responseText.catalog);

                })
        },
        SET_Favorites: async (context) => {
            axios.get('http://m.absolut-kiev.com/favorite.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText);
                    for (let resp in responseText.catalog)  {
                        responseText.catalog[resp].component = Category
                    }
                    context.commit('SET_Favorites', responseText.catalog);

                })
        },
        SET_SubRoute: async (context) => {
            axios.get('http://m.absolut-kiev.com/subMenu.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText);
                    for (let resp in responseText.catalog)  {
                        responseText.catalog[resp].component = Category
                    }
                    context.commit('SET_SubRoute', responseText.catalog);

                })
        },
        SET_Items: async (context) => {
            axios.get('http://m.absolut-kiev.com/items.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    // console.log(responseText.slice( 230338, responseText.length))
                    responseText = JSON.parse(responseText);
                    for (let resp in responseText.catalog)  {
                        responseText.catalog[resp].component = Category
                    }
                    context.commit('SET_Items', responseText.catalog);

                })
        },
        SET_items_Filters: (context,st) => {
            context.commit('SET_items_Filters', st);
        },
        SET_COOKIE_CART: (context, st) => {
            console.log(st)
            sessionStorage.setItem('cartItems', JSON.stringify(st));
        }
    }
})
