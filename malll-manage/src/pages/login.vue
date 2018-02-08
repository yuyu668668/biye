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
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

    export default {
        data () {
            return {
              loading: false,  //默认不显示加载动效
              loginForm: {
                username: '',
                password: ''
              },
              rules: {
                username: [
                  {required: true, message: '请输入账号', trigger: 'blur'}
                ],
                password: [
                  {required: true, message: '请输入密码', trigger: 'blur'}
                ]
              },
            }
        },
        methods:{
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
                      tyep:'error',
                      message:result.data.msg
                    });
                  }
                });
              }
            });

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
