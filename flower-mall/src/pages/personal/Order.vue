<template>
<div>
  <van-row style="margin-top:20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">订单详情</van-col>
  </van-row>

  <van-cell title="收货地址" icon="location" :value="defaultAddress.address" />

  <van-row v-for="item in this.orderList" :key="item._id">
    <van-card
      :title="item.goodsName"
      :num="item.goodsNum"
      :price="item.goodsPrice"
      :thumb="item.goodsImg"
    />
  </van-row>
  <van-submit-bar
    :price="totalPrice"
    button-text="确认订单"
    @submit="onSubmit"
  />

</div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from 'axios'
  import {Toast} from 'vant'
    export default {
        data() {
            return {
              orderList :this.$store.state.carts,
              defaultAddress:{}
            }
        },
        created(){
          this.getDefaultAddress();
        },
        computed:{
          ...mapState([
            'this.$store.state.carts'
          ]),
          totalPrice(){
            if(this.orderList.length>0){
              return this.orderList.reduce((total, item) => total + item.goodsPrice*100*item.goodsNum, 0);
            }
          }
        },
        methods: {
          getDefaultAddress(){
            axios.get('/api/address/getDefaultAddress').then((res)=>{
              if(res.data.status==1){
                //console.log(res.data.msg)
                this.defaultAddress=res.data.msg;
              }
            })
          },
          onSubmit(){
            var params={orderInfo:[...this.orderList]};

            axios.post('/api/order/addOrder',params).then((res)=>{
              if(res.data.status==1){
                Toast.success('创建订单成功')
                this.$router.push('/personal')
              }
            })
          }

        }
    }
</script>

<style scoped>

</style>
