<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path:'/memberList'}">用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-table
    :data="userList"
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话号码"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      :formatter="dateFormat"
      prop="create_time"
      label="创建时间"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      align="center"
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
export default {
    data() {
        return {
          userList:[]
        }
    },
    created(){
      this.getUser();
    },
    methods: {
      //获取用户列表
      getUser(){
        axios.get('/api/user/getUser').then((res)=>{
          if(res.data.status==1){
            //console.log(res.data.msg)
            this.userList=res.data.msg;
          }
        })
      },
      //删除
      handleDelete(index,row){
        //判断是否是超级管理员
        axios.get('/api/admin/isSuperAdmin').then((res)=>{
          if(res.data.status==1){
            //是超级管理员，操作删除
            axios.post('/api/user/deleteUser',{_id:row._id}).then((response)=>{
              if(response.data.status==1){
                this.$message.success('删除用户成功');
                this.getUser();
              }
            })
          }else{
            this.$message.error('不是超级管理员，没有操作权限')
          }
        })
      },
      //格式化时间
      dateFormat: function (row,column) {
        let date = row[column.property];
        return moment(date).format("YYYY-MM-DD")
      },
    }

}
</script>

<style scoped>

</style>
