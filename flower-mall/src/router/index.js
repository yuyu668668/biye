import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/Home'
import carts from '@/pages/carts/Carts'
import category from '@/pages/category/Category'
import personal from '@/pages/personal/Personal'
import goodsDetail from '@/pages/goods/GoodsDetail'
import register from '@/pages/personal/Register'
import address from '@/pages/personal/Address'
import order from '@/pages/personal/Order'
import orderList from '@/pages/personal/orderList'
import payOver from '@/pages/personal/payOver'

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
        },
        {
          path:'/goodsDetail',
          component:goodsDetail
        },
        {
          path:'/register',
          component:register
        },
        {
          path:'/address',
          component:address
        },
        {
          path:'/order',
          component:order
        },
        {
          path:'/orderList',
          component:orderList
        },
        {
          path:'/payOver',
          component:payOver
        },


    ]
})
