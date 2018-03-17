<template>
<div>
  <section class="data_section">
    <header class="section_title">数据统计</header>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="4" :offset="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
      <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
      <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
      <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4" :offset="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
      <el-col :span="4"><div class="data_list"><span class="data_num">{{countAllUser}}</span> 注册用户</div></el-col>
      <el-col :span="4"><div class="data_list"><span class="data_num">{{countOrder}}</span> 订单</div></el-col>
      <el-col :span="4"><div class="data_list"><span class="data_num">{{countAdmin}}</span> 管理员</div></el-col>
    </el-row>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import dtime from 'time-formater'
    export default {
        data() {
            return {
              adminCount:null, //当天管理员注册数
              countAdmin:null,//管理员总数
              userCount:null,//当天用户注册数
              countAllUser:null,//用户总数
              orderCount:null,//当天订单数
              countOrder:null,//订单总数
            }
        },
        mounted(){
          this.adminDayCount();
          this.adminAllCount();
          this.userDayCount();
          this.countUser();
          this.getDayOrder();
          this.getOrderCount();
        },
        computed:{

        },
        created(){

        },
        methods:{
          //获取当天注册的管理员数量
          adminDayCount(){
            const today = dtime().format('YYYY-MM-DD');
            axios.post('/api/admin/adminDayCount',{today:today}).then((res)=>{
              if(res.data.status==1){
                this.adminCount=res.data.msg;
                //console.log(this.adminCount)
              }
            })
          },
          //获取管理员总数量
          adminAllCount(){
            axios.get('/api/admin/adminAllCount').then((res)=>{
              if(res.data.status==1){
                this.countAdmin=res.data.msg;
                //console.log(res.data.msg)
              }
            })
          },
          //获取当天用户注册数量
          userDayCount(){
            const today = dtime().format('YYYY-MM-DD');
            axios.post('/api/user/userDayCount',{today:today}).then((res)=>{
              if(res.data.status==1){
                this.userCount=res.data.msg;
                //console.log(this.userCount)
              }
            })
          },
          //获取用户总数
          countUser(){
            axios.get('/api/user/userCount').then((res)=>{
              if(res.data.status==1){
                this.countAllUser=res.data.msg;
              }
            })
          },
          //获取当天订单总数
          getDayOrder(){
            const today = dtime().format('YYYY-MM-DD');
            axios.post('/api/order/orderDayCount',{today:today}).then((res)=>{
              if(res.data.status==1){
                this.orderCount=res.data.msg;
                //console.log(this.orderCount)
              }
            })
          },
          //获取订单总数
          getOrderCount(){
            axios.get('/api/order/orderCount').then((res)=>{
              if(res.data.status==1){
                this.countOrder=res.data.msg;
                //console.log(res.data.msg)
              }
            })
          }
        }
    }
</script>

<style scoped>
.data_section{
  padding: 20px;
  margin-bottom: 40px;
}
.section_title{
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
}
.data_list{
  text-align: center;
  font-size: 14px;
  color: #666;
  border-radius: 6px;
  background: #E5E9F2;

}
.data_num{
  color: #333;
  font-size: 26px;

}

.head{
  border-radius: 6px;
  font-size: 22px;
  padding: 4px 0;
  color: #fff;
  display: inline-block;
}
.today_head{
  background: #FF9800;
}
.all_head{
  background: #20A0FF;
}
</style>
