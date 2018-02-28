<template>
    <div>
          <el-dropdown @command="handleCommand">
            <img :src="admin.avatar" class="avatar" @click="changeAvatar">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
              <el-dropdown-item command="signOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      <!--修改个人头像对话框-->
      <el-dialog title="修改个人头像" :visible.sync="dialogFormVisible">
        <el-form :model="admin">
          <el-form-item label="个人头像" label-width="50px">
            <el-upload
              class="avatar-uploader"
              action="/api/admin/uploadAvatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="admin.avatar" :src="admin.avatar" style="width: 50px;height: 50px;">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateAvatar">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改密码对话框-->
      <el-dialog title="修改密码" :visible.sync="changePassDialogFormVisible">
        <el-form :model="admin" :rules="rules" ref="admin">
          <el-form-item label="用户名" label-width="100px">
            <el-input v-model="admin.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="修改密码" label-width="100px" prop="password">
            <el-input type="password" v-model="admin.password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changePassDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatePass('admin')">确 定</el-button>
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
              admin:{
                username: '',
                password: '',
                avatar: ''
              },
              dialogFormVisible: false,
              changePassDialogFormVisible: false,
              rules: {
                password: [
                  { required: true, message: '请输入密码', trigger: 'blur' }
                ]
              }
            }
        },
        created(){
          this.getAdminInfo();
        },
        methods: {
          handleCommand(command){
            if(command == 'changePass'){
              this.changePassDialogFormVisible=true;
            }else if(command == 'signOut'){
              axios.get('/api/admin/signOut').then((res)=>{
                if(res.data.status==1){
                  this.$message.success(res.data.msg)
                  this.$router.push('/');
                }else{
                  this.$message.error(res.data.msg)
                }
              })
            }
          },
          //获取登录信息
          async getAdminInfo(){
            axios.get('/api/admin/getAdminInfo').then((res)=>{
              if(res.data.status==1){
                this.admin.username=res.data.msg.username;
                this.admin.avatar=res.data.msg.avatar;
              }
            })
          },
          //头像修改上传
          handleAvatarSuccess(res, file) {
            if(res.status==1){
              this.admin.avatar=res.result;
            }else{
              this.$message.error('图片修改失败');
            }
          },
          beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
          },
          updateAvatar(){
            var avatar=this.admin.avatar;
            axios.post('/api/admin/updateAvatar',{avatar :avatar}).then((res)=>{
              if(res.data.status==1){
                this.$message.success(res.data.msg)
                this.dialogFormVisible=false;
              }else{
                this.$message.error(res.data.msg)
                this.dialogFormVisible=false;
              }
            })
          },
          //修改密码
          changeAvatar(){
            this.dialogFormVisible=true;
          },
          updatePass(formName){
            this.$refs[formName].validate((valid)=>{
              if(valid){
                var changePass=this.admin.password;
                axios.post('/api/admin/changePass',{password: changePass}).then((res)=>{
                  if(res.data.status==1){
                    this.$message.success(res.data.msg)
                    this.changePassDialogFormVisible=false;
                  }else{
                    this.$message.error(res.data.msg)
                    this.changePassDialogFormVisible=false;
                  }
                })
              }
            })
          }
        }
    }
</script>

<style scoped>

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>
