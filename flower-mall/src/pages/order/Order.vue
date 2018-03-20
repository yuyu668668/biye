<template>
<div>
  <van-row style="margin-top:20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">订单详情</van-col>
  </van-row>

  <!--选择收货地址-->
  <van-cell-group>
    <van-cell title="收获地址" is-link :value="addressResult[0]" @click="showAddress = true"/>
    <!-- 收货地址列表 -->
    <van-popup v-model="showAddress" position="bottom"  class="showType">
      <van-nav-bar
        title="收货地址"
        left-text="返回"
        left-arrow
        @click-left="showAddress = false"
      />
      <van-checkbox-group v-model="addressResult" class="checkbox-group">
        <van-checkbox
          v-for="(item, index) in allAddress"
          :key="index"
          :name="item"
          class="check-box"
        >
          {{ item }}
        </van-checkbox>
      </van-checkbox-group>
    </van-popup>
  </van-cell-group>

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
        title="收获地址"
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
              addressList:{},
              showType:false,
              showAddress:false,
              paylist: ['支付宝', '微信', '银联支付'],
              payResult: ['支付宝'],
              addressResult:[],
              allAddress:[],
            }
        },
      watch:{
        payResult(e,old){
          //如果存在两个值，就把old的值去掉，保留最新的值
          if(this.payResult.length>1){
            this.payResult.splice(0,1);
          }
          this.showType=false
        },
        addressResult(e,old){
          //如果存在两个值，就把old的值去掉，保留最新的值
          if(this.addressResult.length>1){
            this.addressResult.splice(0,1);
          }
          this.showAddress=false
        }
      },
        created(){
          this.getDefaultAddress();
          this.getAddress();
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
                this.addressResult.push(this.defaultAddress.address);
                //console.log(this.addressResult)
              }else{
                this.addressResult.push('');
              }
            })
          },
          //获取所有地址
          getAddress(){
            axios.get('/api/address/getAddress').then((res)=>{
              if(res.data.status==1){
                this.addressList=res.data.msg;
                var that=this;
                this.addressList.forEach(function (item,index) {
                  that.allAddress.push(item.address)
                })
              }
            })
          },
          //提交订单
          onSubmit(){
            var params={orderInfo:[...this.orderList],address:this.addressResult};
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
                  Toast.success('支付成功')
                }
              })

              setTimeout(function(){
                that.$router.push('payOver');
              },2000);

            }).catch(() => {
              // on cancel
              axios.post('/api/order/addNoPayOrder',params).then((res)=>{
                if(res.data.status==1){
                  Toast.fail('待支付');
                  this.$router.push('personal')
                }
              })
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
