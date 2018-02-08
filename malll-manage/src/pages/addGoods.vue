<template>
<div>
  <!--面包屑-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/addGoods'}">添加商品</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!--添加商品页面-->
  <div class="add_container">
    <el-row>
        <el-col :span="14" :offset="4">
          <el-form :model="foodForm" :rules="rules" ref="foodForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品编号" prop="id">
              <el-input v-model="foodForm.id"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="foodForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model.number="foodForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="category">
              <el-select v-model="categoryForm.categorySelect" placeholder="请选择商品分类" style="width:100%">
                <el-option
                  v-for="item in categoryForm.categoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品描述" prop="desc">
              <el-input type="textarea" v-model="foodForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                action="/api/goods/addimg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="foodForm.imageUrl" :src="foodForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('foodForm')">立即添加</el-button>
              <el-button @click="resetForm('foodForm')">重置</el-button>
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
        foodForm: {
          id: '',
          name: '',
          price: '',
          category: '',
          desc: '',
          imageUrl: ''
        },
        categoryForm:{
          categorySelect: '',
          categoryList:[]
        },
        rules: {
          id: [
            { required: true, message: '请输入商品编号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品价格' },
            { type: 'number', message: '价格必须为数字值'}
          ],
          desc: [
            { required: true, message: '请输入商品描述', trigger: 'blur' }
          ],
        },
      }
    },
    created(){
      this.getCategory();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            var addParams = {
              id: this.foodForm.id,
              name: this.foodForm.name,
              price: this.foodForm.price,
              desc: this.foodForm.desc,
              category: this.categoryForm.categorySelect,
              imageUrl: this.foodForm.imageUrl
            };
            axios.post('/api/goods/add',qs.stringify(addParams)).then((res)=>{
                if (res.data.status==1){
                  this.$message.success(res.data.msg);
                  this.$router.push('goodList');
                }else{
                  this.$message.error(res.data.msg);
                }
            })
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //获取分类列表
      async getCategory(){
        axios.get('api/category').then((res)=>{
          //console.log(res.data);
          if(res.data.status==1){
            res.data.result.map((item,index)=>{
              item.value=item._id;
              item.label=item.cname;
            })
            this.categoryForm.categoryList=res.data.result;
          }
        })
      },

      //图片上传
      handleAvatarSuccess(res, file) {
        if(res.status==1) {
          this.foodForm.imageUrl = res.result;
        }else{
          this.$message.error('上传图片失败');
        }
        //console.log(this.foodForm.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
  }
</script>

<style scoped>
.add_container{
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
