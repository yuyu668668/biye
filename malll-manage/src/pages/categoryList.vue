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
  <!--编辑对话框-->
  <el-dialog title="修改分类信息" :visible.sync="dialogFormVisible">
    <el-form :model="selectTable" :rules="rules" ref="selectTable">
      <el-form-item label="分类编号" label-width="100px" prop="cno">
        <el-input v-model="selectTable.cno"></el-input>
      </el-form-item>
      <el-form-item label="分类名称" label-width="100px" prop="cname">
        <el-input v-model="selectTable.cname"></el-input>
      </el-form-item>
      <el-form-item label="分类描述" label-width="100px" prop="cdesc">
        <el-input v-model="selectTable.cdesc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateCategory('selectTable')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import axios  from 'axios'
  import qs from 'qs'
    export default {
      data() {
        return {
          tableData: [],
          selectTable: {},
          dialogFormVisible: false,
          rules: {
            cno: [
              { required: true, message: '请输入分类编号', trigger: 'blur' }
            ],
            cname: [
              { required: true, message: '请输入分类名称', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            cdesc: [
              { required: true, message: '请输入分类描述', trigger: 'blur' }
            ],
          },
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
          //console.log(index, row);
          this.selectTable=row;
          this.dialogFormVisible = true;
        },
        handleDelete(index, row) {
          //console.log(index, row);
          axios.get('api/category/deleteCategory',{params:{ id: row._id}}).then((res)=>{
            if(res.data.status==1){
              this.$message.success(res.data.msg);
              this.getCategory();//重新渲染页面
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },

        //更新分类信息
        updateCategory(formName){
          this.$refs[formName].validate((valid) => {
            if(valid){
              var params={...this.selectTable};
              axios.post('api/category/updateCategory',qs.stringify(params)).then((res)=>{
                if(res.data.status==1){
                  this.$message.success(res.data.msg);
                  this.dialogFormVisible=false;
                  this.getCategory();
                }else{
                  this.$message.error(res.data.msg)
                }
              })
            }
          })
        }

       }

    }
</script>

<style scoped>
  .table_container{
    padding:50px;
  }
</style>
