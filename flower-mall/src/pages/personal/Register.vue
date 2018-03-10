<template>
<div>
  <van-row style="margin-top:20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">商城注册</van-col>
  </van-row>

  <van-cell-group>
    <van-field
      v-model="registerForm.username"
      label="用户名"
      placeholder="请输入用户名"
      required
    />
    <van-field
      v-model="registerForm.phone"
      type="tel"
      label="手机号"
      placeholder="请输入手机号"
      required
    />
    <van-row>
      <van-col :span="12">
        <van-field
          label="验证码"
          placeholder="验证码"
          required
        />
      </van-col>
      <van-col><van-button type="primary" @click="sendCode" :disabled="disabled">{{btnText}}</van-button></van-col>
    </van-row>
    <van-field
      v-model="registerForm.password"
      type="password"
      label="密码"
      placeholder="请输入密码"
      required
    />
    <van-field
      v-model="registerForm.rePass"
      label="确认密码"
      placeholder="请再次输入密码"
      required
    />
  </van-cell-group>
  <van-button type="primary" @click="register" :disabled="showBtn">注册</van-button>
</div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'vant'
    export default {
        data() {
            return {
              registerForm:{
                username:'',
                password:'',
                rePass:'',
                phone:''
              },
              showBtn:true,
              btnText:'发送验证码',
              disabled:false,
              time:0
            }
        },

        methods: {
          //点击发送验证码按钮
          sendCode(){
            var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if(this.registerForm.phone==''){
              Toast.fail('手机号不能为空')
            }else if(!reg.test(this.registerForm.phone)){
              Toast.fail('手机号格式错误')
            }else{
              this.time=60;
              this.disabled=true;
              this.timer();

              //发送手机号到服务器
              axios.post('/api/user/getPhoneCode',{phone:this.registerForm.phone}).then((res)=>{

              })
            }
          },
          timer(){
            if (this.time > 0) {
              this.time--;
              this.btnText=this.time+"s后重新获取";
              setTimeout(this.timer, 1000);
            } else{
              this.time=0;
              this.btnText="获取验证码";
              this.disabled=false;
            }
          },
          //点击注册按钮
          register(){
            if(this.register.username==''){
              Toast.fail('用户名不能为空')
            }else if(this.registerForm.password==''){
              Toast.fail('密码不能为空')
            }else if(this.registerForm.rePass!==registerForm.password){
              Toast.fail('两次密码输入不一致')
            }
          }
        },
        components: {}
    }
</script>

<style scoped>

</style>
