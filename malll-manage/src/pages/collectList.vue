<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path:'/collectList'}">收藏列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table
    :data="collectList"
    style="width: 100%">
    <el-table-column
      prop="user_id"
      label="用户编号"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goods_id.gno"
      label="商品编号"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goods_id.name"
      label="商品名称"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      width="180"
      align="center"
      label="商品缩略图">
      <template slot-scope="scope">
        <img :src="scope.row.goods_id.images" style="width: 50px;height:50px;">
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
              collectList:[]
            }
        },
        created(){
          this.getAllCollect();
        },
        methods: {
          getAllCollect(){
            axios.get('/api/collect/getAllCollect').then((res)=>{
              if(res.data.status==1){
                console.log(res.data.msg)
                this.collectList=res.data.msg;
              }
            })
          },
          handleDelete(index,row){
           axios.post('/api/collect/deleteCollect',{_id:row._id}).then((res)=>{
             if(res.data.status==1){
               this.$message.success('删除用户收藏成功')
               this.getAllCollect();
             }else{
               this.$message.error('删除用户收藏失败')
             }
           })
          }
        }
    }
</script>

<style scoped>

</style>
