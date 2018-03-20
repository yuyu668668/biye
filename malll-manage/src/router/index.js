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
import recycleList from '@/pages/recycleList'
import adsList from '@/pages/adsList'
import orderList from '@/pages/orderList'
import systemList from '@/pages/systemList'
import adminList from '@/pages/adminList'
import collectList from '@/pages/collectList'
import cartList from '@/pages/cartList'

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
        },
        {
          path: '/recycleList',
          component: recycleList
        },
        {
          path: '/adsList',
          component: adsList
        },
        {
          path: '/orderList',
          component: orderList
        },
        {
          path: '/systemList',
          component: systemList
        },
        {
          path: '/adminList',
          component: adminList
        },
        {
          path: '/collectList',
          component: collectList
        },
        {
          path: '/cartList',
          component: cartList
        }
      ]
    }
  ]
})
