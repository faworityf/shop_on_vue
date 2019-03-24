import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Home from '@/views/Home'
import Category from '@/views/Category'

Vue.use(Vuex)
console.log(Category)
let global_obj = {
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/vodka',
            name: 'Водка',
            component: Category,
            props: {gl: 'sadsa', fd: true},
            children: [
                {
                    path: '/absolut',
                    name: 'absolut',
                    component: Category
                }, {
                    path: '/kozatska-rada',
                    name: 'Козацька Рада',
                    component: Category
                }
            ]
        },
        {
            path: '/vino',
            name: 'Вино ',
            component: Category
        },

    ],
    items: []
}
export default new Vuex.Store({
    state: {
        global_obj : global_obj
    },
    getters: {
      Obj : state=> {
          return state.global_obj

      }
    },
    mutations: {
        SET_OBJ: (state, catalog) => {
            state.global_obj.routes = catalog;
        },
    },

    actions: {
        SET_OBJ: async (context) => {
            axios.get('http://m.absolut-kiev.com/star.html')
                .then(function (response) {
                    console.log(typeof response.data);
                    let responseText = response.data.replace(/\r|\n/g, '');
                    responseText = responseText.replace(/\s/g, '');
                    responseText = responseText.replace(/},]/g, '}]');
                    responseText = JSON.parse(responseText)
                    console.log(responseText.catalog)
                    context.commit('SET_OBJ', responseText.catalog);

                })
        },
    }
})
