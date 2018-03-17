<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path:'/orderList'}">订单列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table
    :data="orderList"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="订单号"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
      width="180"
      align="center">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
        data() {
            return {
              orderList:[]
            }
        },
        created(){
          this.getAllOrder();
        },
        methods: {
          getAllOrder(){
            axios.get('/api/order/getAllOrder').then((res)=>{
              if(res.data.status==1){
                this.orderList=res.data.msg;
                //console.log(res.data.msg)
              }
            })
          }
        }

    }
</script>

<style scoped>

</style>
