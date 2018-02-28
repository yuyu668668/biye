<template>
<div>
  <!--面包屑-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/addCategory'}">添加分类</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!--添加商品页面-->
  <div class="add_container">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form ref="categoryForm" :model="categoryForm" :rules="rules" label-width="100px" size="medium">
          <el-form-item label="分类编号" prop="id">
            <el-input v-model="categoryForm.id"></el-input>
          </el-form-item>
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="categoryForm.name"></el-input>
          </el-form-item>
          <el-form-item label="分类描述" prop="desc">
            <el-input v-model="categoryForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('categoryForm')">立即添加</el-button>
            <el-button @click="resetForm('categoryForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
        data() {
            return {
              categoryForm:{
                id:'',
                name:'',
                desc:''
              },
              rules: {
                id: [
                  {required: true, message: '请输入分类编号', trigger: 'blur'},
                ],
                name: [
                  {required: true, message: '请输入分类名称', trigger: 'blur'},
                  {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                ],
                desc:[
                  {required: true, message: '请输入分类描述'}
                ]
              }
            }
        },
        methods :{
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if(valid) {
                var categoryParam={
                  id: this.categoryForm.id,
                  name: this.categoryForm.name,
                  desc: this.categoryForm.desc
                }

                axios.post('/api/category/addCategory',qs.stringify(categoryParam)).then((res)=>{
                  if(res.data.status==1){
                    this.$message.success(res.data.msg)
                    this.$router.push('categoryList')
                  }else{
                    this.$message.error(res.data.msg)
                  }
                })

              }
            })
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
        }
    }
</script>

<style scoped>
  .add_container{
    margin-top: 30px;
  }
</style>
