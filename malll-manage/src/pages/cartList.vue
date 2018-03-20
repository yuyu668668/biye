<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/cartList'}">购物车列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="cartList"
      style="width: 100%">
      <el-table-column
        prop="user_id"
        label="用户编号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="加入购物车时间"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        width="180"
        align="center"
        label="商品缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.goodsImg" style="width: 50px;height:50px;">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        data() {
            return {
              cartList:[]
            }
        },
        created(){
          this.getAllCart();
        },
        methods:{
          getAllCart(){
            axios.get('/api/cart/getAllCart').then((res)=>{
              if(res.data.status==1){
                this.cartList=res.data.msg;
                //console.log(this.cartList)
              }
            })
          },
          handleDelete(index,row){
            axios.post('/api/cart/deleteCart',{_id:row._id}).then((res)=>{
              if(res.data.status==1){
                this.$message.success('删除成功');
                this.getAllCart();
              }else{
                this.$message.error('删除失败')
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
