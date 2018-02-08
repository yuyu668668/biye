<template>
<div>
  <!--面包屑-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/categoryList'}">分类列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!--表格-->
  <div class="table_contain">
    <el-table
      :data="tableData"
      style="width: 60%">
      <el-table-column
        label="分类编号"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cno }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类名"
        width="180"
        align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>分类名: {{ scope.row.cname }}</p>
            <p>描述: {{ scope.row.cdesc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.cname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
  import axios  from 'axios'
    export default {
      data() {
        return {
          tableData: []
        }
      },
      created(){
        this.getCategory();
      },
      methods:{
          getCategory(){
            axios.get('api/category').then((res)=>{
              if(res.data.status==1){
                //console.log(res.data.result)
                var category=res.data.result;
                this.tableData=[];
                category.forEach((item)=>{
                  const tableData={};
                  tableData._id=item._id;
                  tableData.cno=item.cno;
                  tableData.cname=item.cname;
                  tableData.cdesc=item.cdesc;
                  this.tableData.push(tableData);
                })

              }
            })
          },

        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
       }

    }
</script>

<style scoped>
  .table_container{
    padding:50px;
  }
</style>
