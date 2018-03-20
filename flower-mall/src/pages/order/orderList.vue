<template>
<div>
  <van-row style="margin-top:20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">订单列表</van-col>
  </van-row>

  <van-tabs :active="active">
    <!--全部订单-->
    <van-tab :title="'全部'">
      <van-row v-for="item in orderList" :key="item.id" class="all-order">
        <van-row class="order-item">
          <van-col :offset="1">订单号:{{item.id}}</van-col>
          <van-col :offset="1">{{item.create_time}}</van-col>
          <van-col :offset="5"><van-icon name="delete" @click="deleteOrder(item._id)"/></van-col>
        </van-row>
        <van-cell-group v-for="goods in item.goodsInfo" :key="goods.goods_id">
          <van-card
            :title="goods.goodsName"
            :num="goods.goodsNum"
            :price="goods.goodsPrice"
            :thumb="goods.goodsImg"
          />
        </van-cell-group>
      </van-row>
    </van-tab>
    <!--已付款订单-->
    <van-tab :title="title[0]">
      <van-row v-for="item in orderList" :key="item.id" class="all-order" v-if="item.is_pay==true">
        <van-row class="order-item">
          <van-col :offset="1">订单号:{{item.id}}</van-col>
          <van-col :offset="1">{{item.create_time}}</van-col>
          <van-col :offset="5"><van-icon name="delete" @click="deleteOrder(item._id)"/></van-col>
        </van-row>
        <van-cell-group v-for="goods in item.goodsInfo" :key="goods.goods_id">
          <van-card
            :title="goods.goodsName"
            :num="goods.goodsNum"
            :price="goods.goodsPrice"
            :thumb="goods.goodsImg"
          />
        </van-cell-group>
      </van-row>
    </van-tab>
    <!--待付款订单-->
    <van-tab :title="title[1]">
      <van-row v-for="item in orderList" :key="item.id" class="all-order" v-if="item.is_pay==false">
        <van-row class="order-item">
          <van-col :offset="1">订单号:{{item.id}}</van-col>
          <van-col :offset="1">{{item.create_time}}</van-col>
          <van-col :offset="5"><van-icon name="delete" @click="deleteOrder(item._id)"/></van-col>
        </van-row>
        <van-cell-group v-for="goods in item.goodsInfo" :key="goods.goods_id">
          <van-card
            :title="goods.goodsName"
            :num="goods.goodsNum"
            :price="goods.goodsPrice"
            :thumb="goods.goodsImg"
          />
        </van-cell-group>
      </van-row>
    </van-tab>
    <!--已发货订单-->
    <van-tab :title="title[2]">
      <van-row v-for="item in orderList" :key="item.id" class="all-order" v-if="item.is_send==true">
        <van-row class="order-item">
          <van-col :offset="1">订单号:{{item.id}}</van-col>
          <van-col :offset="1">{{item.create_time}}</van-col>
          <van-col :offset="5"><van-icon name="delete" @click="deleteOrder(item._id)"/></van-col>
        </van-row>
        <van-cell-group v-for="goods in item.goodsInfo" :key="goods.goods_id">
          <van-card
            :title="goods.goodsName"
            :num="goods.goodsNum"
            :price="goods.goodsPrice"
            :thumb="goods.goodsImg"
          />
        </van-cell-group>
      </van-row>
    </van-tab>

  </van-tabs>
</div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'vant'
    export default {
        data() {
            return {
              orderList:[],
              active: 0,
              title:['已付款','待付款','已发货']
            }
        },
        created(){
          this.active=this.$route.query.active;
          this.getOrder();
        },
        methods: {
          getOrder(){
            axios.get('/api/order/getOrder').then((res)=>{
              if(res.data.status==1){
                //console.log(res.data.msg)
                this.orderList=res.data.msg;
              }
            })
          },
          //删除订单
          deleteOrder(id){

            axios.post('/api/order/deleteOrder',{_id:id}).then((res)=>{
              if(res.data.status==1){
                Toast.success('删除订单成功');
                this.getOrder();
              }else{
                Toast.fail('删除订单失败')
              }
            })
          }
        }
    }
</script>

<style scoped>
.all-order{
  margin:20px 5px 10px 5px;
  background-color: ghostwhite;
  border-bottom: 1px solid #e5e5e5;
  padding-top: 10px;
}
  .order-item{
    font-size: 1.2rem;
    color: red;
  }
</style>
