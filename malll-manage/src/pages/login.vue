<template>
    <div>
      <el-form ref="accountForm" :model="loginForm"  :rules="rules" label-position="left" label-width="0px"
               class="demo-ruleForm login-container">
        <h3 class="title">管理员登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password"  auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button size="mini" round @click.native.prevent="handleRegister">注册</el-button>
          <el-button type="primary" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
      <!--添加对话框-->
      <el-dialog title="管理员注册" :visible.sync="registerDialogFormVisible">
        <el-form :model="registerForm" :rules="rules" ref="registerForm">
          <el-form-item label="用户名" label-width="100px" prop="username">
            <el-input v-model="registerForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px" prop="password">
            <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="100px" prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="registerDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="register('registerForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

    export default {
        data () {
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.registerForm.checkPass !== '') {
                this.$refs.registerForm.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
            return {
              loading: false,  //默认不显示加载动效
              loginForm: {
                username: '',
                password: ''
              },
              rules: {
                username: [
                  {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                  { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                  { validator: validatePass2, trigger: 'blur' }
                ]
              },
              registerDialogFormVisible: false,
              registerForm:{
                username: '',
                password: '',
                checkPass: ''
              },
            }
        },
        methods:{
          //登录
          handleLogin(){
            var that=this;
            this.$refs.accountForm.validate(function (valid) {
              if(valid){
                that.loading = true;
                var loginParams = {username: that.loginForm.username, password: that.loginForm.password};

                axios.post('/api/admin/login', qs.stringify(loginParams)).then((result) => {
                  //console.log(result.data)
                  if(result.data.status==1){
                    that.$message({
                      type:'success',
                      message:'登录成功'
                    });
                    that.$router.push('manage');
                  }else{
                    that.loading = false;
                    that.$message({
                      type:'error',
                      message:result.data.msg
                    });
                  }
                });
              }
            });

          },
          //注册
          async handleRegister(){
            this.registerDialogFormVisible=true;
          },
          async register(formName){
            this.$refs[formName].validate((valid)=>{
              if(valid){
                var register={...this.registerForm};
                //console.log(register)
                axios.post('api/admin/register',qs.stringify(register)).then((res)=>{
                  if(res.data.status==1){
                    this.$message.error(res.data.msg)
                    return;
                  }else if(res.data.status==2){
                    this.$message.success(res.data.msg)
                    this.registerDialogFormVisible=false;
                  }
                })
              }
            })
          }
        }
    }
</script>

<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/

  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
