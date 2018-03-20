<template>
  <el-container>
    <!--左侧导航栏-->
    <el-aside width="15%">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router>
        <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="goodList">商品列表</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
            <el-menu-item index="recycleList">回收站</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-more-outline"></i>
            <span>分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="categoryList">分类列表</el-menu-item>
            <el-menu-item index="addCategory">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="memberList">用户列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>运营管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="cartList">购物车列表</el-menu-item>
            <el-menu-item index="collectList">收藏列表</el-menu-item>

          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-picture-outline"></i>
            <span>广告管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="adsList">广告列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="systemList"><i class="el-icon-setting"></i>系统管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!--头部个人信息-->
      <el-header style="text-align: right;height:20px" >
        <header-top></header-top>
      </el-header>
      <!--右侧主体信息-->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import headerTop from '../components/headerTop'
    export default {
        data() {
            return {}
        },
        components: {
          headerTop
        },
        methods:{
          handleOpen(key, keyPath) {
            //console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            //console.log(key, keyPath);
          },

        }

    }
</script>

<style scoped>

</style>
