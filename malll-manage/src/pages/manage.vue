<template>
  <div class="mymenu">
    <!--头部个人信息-->
    <el-row class="tac">
      <!--左侧菜单-->
      <el-col :span="4">
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
              <el-menu-item index="goodList">回收站</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-goods"></i>
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
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <!--右侧显示区域-->
      <el-col :span="20">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
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

.mymenu{
  margin:0px;
  padding:0px;
}
.tac{
  height: 100%;
}
</style>
