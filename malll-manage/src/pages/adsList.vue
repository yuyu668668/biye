<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>运营管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path:'/adsList'}">广告列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-button type="primary" plain size="mini" @click="handleAdd">添加</el-button>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="编号"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="link"
      label="链接地址"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="pic"
      label="图片"
      align="center">
      <template slot-scope="scope">
        <img :src="scope.row.pic" style="width: 60px;height: 60px;">
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--添加对话框-->
  <el-dialog title="添加广告信息" :visible.sync="adsDialogFormVisible">
    <el-form :model="adsForm" :rules="rules" ref="adsForm">
      <el-form-item label="编号" label-width="100px" prop="id">
        <el-input v-model="adsForm.id"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" label-width="100px" prop="link">
        <el-input v-model="adsForm.link"></el-input>
      </el-form-item>
      <el-form-item label="广告图片">
        <el-upload
          class="avatar-uploader"
          action="/api/ads/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="adsForm.pic" :src="adsForm.pic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="adsDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addAds('adsForm')">确 定</el-button>
    </div>
  </el-dialog>
  <!--修改对话框-->
  <el-dialog title="修改广告信息" :visible.sync="updateDialogFormVisible">
    <el-form :model="selectTable" :rules="rules" ref="selectTable">
      <el-form-item label="编号" label-width="100px" prop="id">
        <el-input v-model="selectTable.id"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" label-width="100px" prop="link">
        <el-input v-model="selectTable.link"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" label-width="100px">
        <el-upload
          class="avatar-uploader"
          action="/api/ads/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="selectTable.pic" :src="selectTable.pic" style="width: 100px;height: 100px;">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="updateDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateAds('selectTable')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
        data() {
            return {
              tableData: [],
              selectTable:{},
              adsForm: {
                id: '',
                link: '',
                pic: ''
              },
              adsDialogFormVisible: false,
              updateDialogFormVisible: false,
              rules: {
                id: [
                  { required: true, message: '请输入编号', trigger: 'blur' }
                ],
                link: [
                  { required: true, message: '请输入链接地址', trigger: 'blur' },
                ]
              },
            }
        },
        created(){
          this.getAds();
        },
        methods: {
          //点击弹出添加对话框
          async handleAdd(){
            this.adsDialogFormVisible=true;
          },

          handleAvatarSuccess(res, file) {
            if(res.status==1) {
              this.adsForm.pic = res.result;
            }else{
              this.$message.error('上传图片失败');
            }
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          //添加广告
          async addAds(formName){
            this.$refs[formName].validate((valid) => {
              if(valid){
                var params={...this.adsForm};
                axios.post('api/ads/addAds',qs.stringify(params)).then((res)=>{
                  if(res.data.status==1){
                    this.$message.success(res.data.msg);
                    this.adsDialogFormVisible=false;
                    this.getAds();
                  } else {
                    this.$message.error(res.data.mag);
                  }
                })
              }
            })
          },
          //获取广告列表
          async getAds(){
            axios.get('api/ads').then((res)=>{
              if(res.data.status==1){
                var ads=res.data.msg;
                this.tableData=[];
                ads.forEach((item,index)=>{
                  const tableData={};
                  tableData._id=item._id;
                  tableData.id=item.id;
                  tableData.link=item.link;
                  tableData.pic=item.pic;
                  this.tableData.push(tableData);
                })

              }else{
                this.$message.error(res.data.msg)
              }
            })
          },
          //删除广告
          async handleDelete(index,row){
            axios.get('api/ads/deleteAds',{params:{ id: row._id}}).then((res)=>{
              if(res.data.status==1){
                this.$message({
                  type: 'success',
                  message: '删除成功'
                });
                this.getAds();//重新渲染页面
              }else{
                this.$message({
                  type: 'error',
                  message: '删除失败'
                })
              }
            })
          },
          //点击编辑按钮
          async handleEdit(index,row) {
            this.selectTable=row;
            this.updateDialogFormVisible = true;
          },
          //修改
          updateAds(formName){
            this.$refs[formName].validate((valid) => {
              if(valid){
                var adsParams={...this.selectTable};
                axios.post('api/ads/updateAds',qs.stringify(adsParams)).then((res)=>{
                  if(res.data.status==1){
                    this.$message.success(res.data.msg);
                    this.updateDialogFormVisible=false;
                    this.getAds();
                  } else {
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
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
