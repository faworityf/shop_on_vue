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
        globalObj : {}
    },
    getters: {
      Obj : state=> {
          return state.globalObj
      }
    },
    mutations: {
        SET_MainRoute: (state, mainRoutes) => {
            state.global_obj.mainRoutes = mainRoutes;
        },
        SET_Favorites: (state, favorites) => {
            state.global_obj.favorites = favorites;
        },
        SET_SubRoute: (state, subRoutes) => {
            state.global_obj.subRoutes = subRoutes;
        },
        SET_Items: (state, items) => {
            state.global_obj.items = items;
        },
    },

    actions: {
        SET_MainRoute: async (context) => {
            axios.get('http://m.absolut-kiev.com/start.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText)
                    console.log(123)
                    context.commit('SET_MainRoute', responseText.catalog);

                })
        },
        SET_Favorites: async (context) => {
            axios.get('http://m.absolut-kiev.com/favorite.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText)
                    context.commit('SET_Favorites', responseText.catalog);

                })
        },
        SET_SubRoute: async (context) => {
            axios.get('http://m.absolut-kiev.com/subMenu.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText)
                    context.commit('SET_SubRoute', responseText.catalog);

                })
        },
        SET_Items: async (context) => {
            axios.get('http://m.absolut-kiev.com/items.html')
                .then(function (response) {
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/}, ]/g, '}]');
                    responseText = JSON.parse(responseText)
                    context.commit('SET_Items', responseText.catalog);

                })
        },
    }
})
