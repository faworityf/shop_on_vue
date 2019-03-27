import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Home from '@/views/Home'
import Category from '@/views/Category'

Vue.use(Vuex)
let global_obj = {
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            menu: 'main'
        },
    ],
    items: []
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
                    path: '/:alias',
                    name: 'home',
                    component: Category,
                    menu: 'main'
                },
                {
                    path: '/:alias/:alias',
                    name: 'home',
                    component: Category,
                    menu: 'main'
                },
            ]
        },
        mainRoutes: [],
        favorites: [],
        items: [],
        subRoutes: []
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
    },
    mutations: {
        SET_MainRoute: (state, mainRoutes) => {
            state.mainRoutes = mainRoutes;
            // state.globalObj.router = state.globalObj.router.concat(mainRoutes);
        },
        SET_Favorites: (state, favorites) => {
            state.favorites = favorites;
            // state.globalObj.router = state.globalObj.router.concat(favorites);
        },
        SET_SubRoute: (state, subRoutes) => {
            state.subRoutes = subRoutes;
            // state.globalObj.router = state.globalObj.router.concat(subRoutes);

        },
        SET_Items: (state, items) => {
            state.items = items;
            // state.globalObj.router = state.globalObj.router.concat(items);

        },
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
                    responseText = JSON.parse(responseText);
                    for (let resp in responseText.catalog)  {
                        responseText.catalog[resp].component = Category
                    }
                    context.commit('SET_Items', responseText.catalog);

                })
        },
    }
})
