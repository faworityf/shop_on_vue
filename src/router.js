import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Category from './views/Category.vue'

Vue.use(Router)

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
          component: Category
      },
      {
          path: '/vino',
          name: 'Вино ',
          component: Category
      },

  ],
    items: [

    ]
}



export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
