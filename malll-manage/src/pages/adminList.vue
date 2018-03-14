<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path:'/adminList'}">用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-table
    :data="adminData"
    style="width: 100%">
    <el-table-column
      prop="username"
      label="管理员账号"
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
              adminData:[]
            }
        },
        created(){
          this.getAllAdmin();
        },
        methods:{
          //获取所有管理员
          getAllAdmin(){
            axios.get('/api/admin/getAllAdmin').then((res)=>{
              if(res.data.status==1){
                this.adminData=res.data.msg;
                //console.log(this.adminData)
              }
            })
          },
          //删除
          handleDelete(index,row){
            //判断是否是超级管理员
            axios.get('/api/admin/isSuperAdmin').then((res)=>{
              if(res.data.status==1){
                //是超级管理员，操作删除
                axios.post('/api/admin/deleteAdmin',{_id:row._id}).then((response)=>{
                  if(response.data.status==1){
                    this.$message.success('删除管理员成功');
                    this.getAllAdmin();
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
