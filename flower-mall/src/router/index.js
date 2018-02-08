import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/Home'
import carts from '@/pages/carts/Carts'
import category from '@/pages/category/Category'
import personal from '@/pages/personal/Personal'

Vue.use(Router)

export default new Router({
  routes: [
        {
          path:'/',
          component:home
        },
        {
          path:'/category',
          component:category
        },
        {
          path:'/carts',
          component:carts
        },
        {
          path:'/personal',
          component:personal
        }
  ]
})
