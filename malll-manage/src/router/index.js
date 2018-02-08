import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import manage from '@/pages/manage'
import home from '@/pages/home'
import goodList from '@/pages/goodList'
import addGoods from '@/pages/addGoods'
import memberList from '@/pages/memberList'
import categoryList from '@/pages/categoryList'
import addCategory from '@/pages/addCategory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/manage',
      component: manage,
      children:[
        {
          path: '',
          component: home
        },
        {
          path: '/goodList',
          component: goodList
        },
        {
          path: '/addGoods',
          component: addGoods
        },
        {
          path: '/memberList',
          component: memberList
        },
        {
          path: '/categoryList',
          component: categoryList
        },
        {
          path: '/addCategory',
          component: addCategory
        }
      ]
    }
  ]
})
