<template>
    <div>
      <van-row style="width: 100%;height: 200px;" v-lazy:background-image="'http://p0.so.qhimgs1.com/bdr/_240_/t010272ef96c9b07d5a.jpg'">
        <van-col :offset="2"><img v-if="userForm.avatar" :src="userForm.avatar" style="width:80px;height: 80px;border-radius: 50%;margin-top: 30px;"/></van-col>
        <van-col v-if="!userForm._id" :offset="5" style="margin-top: 60px"><span @click="alertLogin">登录</span>
          /<router-link to="/register">注册</router-link></van-col>
        <van-col v-if="userForm.username" style="margin-top: 60px">欢迎您,{{userForm.username}}</van-col>
      </van-row>

      <van-row class="user-links">
        <van-col span="8">
          <van-icon name="pending-payment" />
          待付款
        </van-col>
        <van-col span="8">
          <van-icon name="pending-orders" />
          待接单
        </van-col>
        <van-col span="8">
          <van-icon name="pending-deliver" />
          待发货
        </van-col>
      </van-row>
      <van-cell-group class="user-group">
        <van-cell icon="records" title="全部订单" is-link @click="toOrder"/>
      </van-cell-group>
      <van-cell-group class="user-group">
        <van-cell icon="location" title="我的地址" is-link @click="toAddress"/>
      </van-cell-group>
      <van-cell-group class="user-group">
        <van-cell icon="stop" title="退出登录" is-link @click="loginOut"/>
      </van-cell-group>

      <!--登录对话框-->
      <van-dialog v-model="show" @confirm="onConfirm"
      title="商城登录" show-cancel-button>
        <van-field
          v-model="username"
          label="用户名"
          placeholder="用户名/手机号"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="密码"
        />
      </van-dialog>

    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import axios from 'axios'
  import { Toast } from 'vant';
    export default {
        name:'personal',
        data() {
            return {
              show:false,
              username:'',
              password:'',
              userForm:{},
            }
        },
        mounted(){
          this.checkLogin();
        },
        activated(){
          this.changeFooterFlag1(true);//显示底部导航
          this.changePersonal1();//使个人样式程actived状态
        },
        deactivated(){
          this.changeFooterFlag1(false);
          this.changePersonal1();
        },
        methods:{
          ...mapActions([
            'changeFooterFlag1',
            'changePersonal1'
          ]),
          alertLogin(){
            this.show=true;
          },

          //登录
          onConfirm(){
            if(this.username==''){
              Toast.fail('用户名不能为空')
            }else if(this.password==''){
              Toast.fail('密码不能为空')
            }else{
              axios.post('/api/user/login',{username:this.username,password:this.password}).then((res)=>{
                if(res.data.status==1){
                  //console.log(res)
                  //this.userForm=res.data.msg;
                  //console.log(this.userForm)
                  Toast.success('登录成功')
                  this.show=false;
                  this.$router.go(0);//刷新页面
                }else{
                  Toast.fail('用户名或密码错误')
                }
              })
            }
          },
          //检查是否已登录
          checkLogin(){
            axios.get('/api/user/checkLogin').then((res)=>{
              if(res.data.status==1){
                this.userForm=res.data.msg;
              }
            })
          },
          //退出登录
          loginOut(){
            axios.post('/api/user/loginOut').then((res)=>{
              if(res.data.status==1){
                Toast.success('退出成功');
                this.$router.go(0);//刷新页面
              }else{
                Toast.fail('当前未登录')
              }
            })
          },
          //跳转到地址页面
          toAddress(){
            if(this.userForm.username){
              this.$router.push('/address')
            }else{
              Toast.fail('还未登录')
            }
          },
          toOrder(){
            if(this.userForm.username){
              this.$router.push('/orderList')
            }else{
              Toast.fail('还未登录')
            }
          }
        }

    }
</script>

<style scoped>
  .user-poster{
    width: 7.5rem;
    height: 4rem;
    display: block;
  }

  .user-group{
    margin-bottom: .3rem;
  }

  .user-links{
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
  }

  .user-links .van-icon {
    display: block;
    font-size: 24px;
  }






</style>
