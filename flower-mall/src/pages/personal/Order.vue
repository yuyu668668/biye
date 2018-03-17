<template>
<div>
  <van-row style="margin-top:20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">订单详情</van-col>
  </van-row>

  <van-cell title="收货地址" icon="location" :value="defaultAddress.address" />

  <van-cell-group v-for="item in this.orderList" :key="item._id" class="order-card">
    <van-card
      :title="item.goodsName"
      :num="item.goodsNum"
      :price="item.goodsPrice"
      :thumb="item.goodsImg"
    />
  </van-cell-group>
<!--选择支付方式-->
  <van-cell-group>
    <van-cell title="支付方式" is-link :value="payResult[0]" @click="showType = true"/>
    <!-- 支付方式 -->
    <van-popup v-model="showType" position="bottom"  class="showType">
      <van-nav-bar
        title="支付方式"
        left-text="返回"
        left-arrow
        @click-left="showType = false"
      />
      <van-checkbox-group v-model="payResult" class="checkbox-group">
        <van-checkbox
          v-for="(item, index) in paylist"
          :key="item"
          :name="item"
          class="check-box"
        >
          {{ item }}
        </van-checkbox>
      </van-checkbox-group>
    </van-popup>
  </van-cell-group>

  <van-cell-group>
    <van-cell title="商品金额" :value="'¥ '+(totalPrice/100).toFixed(2)" />
    <van-cell title="总运费" value="¥ 0" />
  </van-cell-group>

  <van-submit-bar
    :price="totalPrice"
    button-text="提交订单"
    @submit="onSubmit"
  />

</div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from 'axios'
  import {Toast} from 'vant'
  import {Dialog} from 'vant'
    export default {
        data() {
            return {
              orderList :this.$store.state.carts,
              defaultAddress:{},
              showType:false,
              paylist: ['支付宝', '微信', '银联支付'],
              payResult: ['支付宝'],
            }
        },
      watch:{
        payResult(e,old){
          //如果存在两个值，就把old的值去掉，保留最新的值
          if(this.payResult.length>1){
            this.payResult.splice(0,1);
          }
          this.showType=false
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

          //获取默认地址
          getDefaultAddress(){
            axios.get('/api/address/getDefaultAddress').then((res)=>{
              if(res.data.status==1){
                //console.log(res.data.msg)
                this.defaultAddress=res.data.msg;
              }
            })
          },
          //提交订单
          onSubmit(){
            var params={orderInfo:[...this.orderList]};
            var that=this;
            Dialog.confirm({
              title: '确认支付',
              message: '是否支付￥'+that.totalPrice/100
            }).then(() => {
              // on confirm
              Toast.loading({
                mask: true,
                message: '支付中...'
              });
              //保存订单信息
              axios.post('/api/order/addOrder',params).then((res)=>{
                if(res.data.status==1){
                  Toast.success('创建订单成功')
                }
              })

              setTimeout(function(){
                that.$router.push('payOver');
              },2000);

            }).catch(() => {
              // on cancel
            });

          }

        }
    }
</script>

<style scoped>
.order-card{
  padding: 10px 0 10px 2%;
  border-bottom: 1px solid #e5e5e5;
}
  .checkbox-group{
    position: relative;
  }
  .check-box{
    position: relative;
    padding: 10px 0 10px 2%;
  }
  .showType{
    height: 60%;
    width: 100%;
  }
</style>
