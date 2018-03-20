<template>
<div>
  <van-row style="margin-top: 20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">修改个人资料</van-col>
  </van-row>
  <van-cell-group>
    <van-field
      v-model="userData.username"
      label="用户名"
      disabled
    />
    <van-field
      v-model="userData.phone"
      label="电话号码"
      placeholder="请输入电话号码"
      required
    />
    <van-field
      v-model="psd"
      label="密码"
      type="password"
      placeholder="请输入要修改的密码"
      required
    />
    <van-field
      v-model="rePsd"
      label="确认密码"
      type="password"
      placeholder="请输入确认密码"
      required
    />
  </van-cell-group>
  <van-button type="primary" @click="sureUpdate">确认修改</van-button>
</div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'vant'
    export default {
        data() {
            return {
              userData:{},
              psd:'',
              rePsd:''
            }
        },
        created(){
          this.getCurrentUser();
        },
        methods:{
          //获取当前用户的信息
          getCurrentUser(){
            axios.post('/api/user/getCurrentUser').then((res)=>{
              if(res.data.status==1){
                //console.log(res.data.msg)
                this.userData=res.data.msg;
              }
            })
          },
          //确定修改
          sureUpdate(){
            var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if(this.userData.phone==''){
              Toast.fail('手机号不能为空')
            }else if(!reg.test(this.userData.phone)){
              Toast.fail('手机号格式不正确')
            }else if(this.psd==''){
              Toast.fail('密码不能为空')
            }else if(this.rePsd!=this.psd){
              Toast.fail('两次输入的密码不一致')
            }else{
              var params={
                phone: this.userData.phone,
                psd: this.psd
              }
              axios.post('/api/user/updateUser',params).then((res)=>{
                if(res.data.status==1){
                  Toast.success('修改成功');
                  this.$router.push('personal')
                }else{
                  Toast.fail('修改失败')
                }
              })
            }
          }
        }
    }
</script>

<style scoped>

</style>
