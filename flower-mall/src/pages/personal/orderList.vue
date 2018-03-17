<template>
<div>
  <van-row style="margin-top:20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">全部订单</van-col>
  </van-row>

  <van-tabs :active="active">
    <van-tab :title="'全部'">
      <van-row v-for="item in orderList" :key="item.id" class="all-order">
        <van-row class="order-item">
          <van-col :offset="1">订单号:{{item.id}}</van-col>
          <van-col :offset="1">{{item.create_time}}</van-col>
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
    <van-tab v-for="index in 3" :title="title[index-1]" :key="index">

    </van-tab>
  </van-tabs>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
        data() {
            return {
              orderList:[],
              active: 0,
              title:['待支付','待接单','待发货']
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
