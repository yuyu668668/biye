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
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="收货地址"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      label="是否已付款"
      width="130"
      align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.is_pay==true" style="color: green;">是</span>
        <span v-else style="color: red">否</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否已发货"
      width="130"
      align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.is_send==true" style="color: green">是</span>
        <span v-else style="color: red">否</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否已收货"
      width="130"
      align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.is_receipt==true" style="color: green">是</span>
        <span v-else style="color: red">否</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row)">发货</el-button>
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
              orderList:[]
            }
        },
        created(){
          this.getAllOrder();
        },
        methods: {
          //获取订单列表
          getAllOrder(){
            axios.get('/api/order/getAllOrder').then((res)=>{
              if(res.data.status==1){
                this.orderList=res.data.msg;
                console.log(res.data.msg)
              }
            })
          },
          //点击发货按钮
          handleEdit(index,row){
            //console.log(row)
            axios.post('/api/order/sendOrder',{_id:row._id}).then((res)=>{
                if(res.data.status==1){
                  this.$message.success('发货成功');
                  this.getAllOrder();
                }else{
                  this.$message.error('发货失败');
                }
            })
          }
        }

    }
</script>

<style scoped>

</style>
