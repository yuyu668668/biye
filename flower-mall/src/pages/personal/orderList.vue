<template>
<div>
  <van-row style="margin-top:20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">全部订单</van-col>
  </van-row>

  <van-row v-for="item in orderList" :key="item.id" style="margin-top: 10px;border-bottom: 1px solid grey">
    <van-row>
      <van-col :offset="1">订单号:{{item.id}}</van-col>
      <van-col :offset="1">创建时间:{{item.create_time}}</van-col>
    </van-row>
    <van-row v-for="goods in item.goodsInfo" :key="goods.goods_id">
      <van-card
        :title="goods.goodsName"
        :num="goods.goodsNum"
        :price="goods.goodsPrice"
        :thumb="goods.goodsImg"
      />
    </van-row>
  </van-row>

</div>
</template>

<script>
  import axios from 'axios'
    export default {
        data() {
            return {
              orderList:[]
            }
        },
        created(){
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

</style>
