<template>
<div>
  <!--顶部一行-->
  <van-row style="margin-top: 15px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">商品详情</van-col>
    <van-col><router-link to="/"><van-icon name="wap-home"/></router-link></van-col>
    <van-col :offset="1"><router-link to="/carts"><van-icon name="cart"/></router-link></van-col>
  </van-row>
  <!--商品图片-->
  <van-row style="margin-top: 20px;">
    <img :src="goodsDetail.images"/>
  </van-row>
  <van-row style="margin-top: 30px;">
    <van-col :offset="1">{{goodsDetail.name}}--{{goodsDetail.gdesc}}</van-col>
  </van-row>
  <van-row style="margin-top: 15px;">
    <van-col :offset="1" style="color: red;">￥<span v-html="parseFloat(goodsDetail.price).toFixed(2)"></span></van-col>
  </van-row>
  <van-row style="margin-top: 30px;">
    <van-col :offset="1">
      花语: {{goodsDetail.detail}}
    </van-col>
  </van-row>
  <van-row style="margin-top: 30px;">
    <van-col :offset="1">
      评价：
    </van-col>
  </van-row>
  <van-goods-action>
    <van-goods-action-mini-btn icon="home" text="首页" @click="gotoHome" />
    <van-goods-action-mini-btn icon="cart" text="购物车" @click="gotoCar" />
    <van-goods-action-big-btn text="加入购物车" @click="addToCar" />
    <van-goods-action-big-btn text="立即购买" @click="toBuy" primary />
  </van-goods-action>

  <!--弹出层-->
  <van-popup v-model="showBase" position="bottom">
    <van-row>
      <van-col><img :src="goodsDetail.images" style="width:80px;height:80px;border-radius: 50%"/></van-col>
      <van-col offset="2" style="margin-top: 50px;">{{goodsDetail.name}}</van-col>
      <van-col offset="1" style="margin-top: 50px;color: red">￥{{goodsDetail.price*value}}</van-col>
    </van-row>
    <van-row>
      <van-col offset="2">数量</van-col>
      <van-stepper
        v-model="value"
        :min="1"
        :max="40"
        :step="1"
        :default-value="1"
      />
    </van-row>
    <van-row style="margin-top: 5px;" v-show="!isBuy">
      <van-goods-action-big-btn text="加入购物车" @click="addCar" />
    </van-row>
    <van-row style="margin-top: 5px;" v-show="isBuy">
      <van-goods-action-big-btn text="立即购买" @click="goBuy" primary/>
    </van-row>
  </van-popup>

</div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'vant'
  import {GoodsAction,
          GoodsActionBigBtn,
           GoodsActionMiniBtn} from 'vant'
  import { mapState, mapActions } from 'vuex';
    export default {
        data() {
            return {
              goodsId: this.$route.query.goodsId,  //点击页面传过来的商品id
              goodsDetail:{},
              showBase: false,
              value:1,
              isBuy:false,
            }
        },
        mounted(){  //在整个实例中只执行一次
          this.getDetail();
        },
        components:{
          [GoodsAction.name]: GoodsAction,
          [GoodsActionBigBtn.name]: GoodsActionBigBtn,
          [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
        },
        methods: {
          ...mapActions([
            'setCart1'
          ]),
          //根据商品id获取商品数据
          async getDetail(){
            axios.get('api/goods/getDetail',{params:{_id:this.goodsId}}).then((res)=>{
                if(res.data.status==1){
                  this.goodsDetail=res.data.msg;
                  //console.log(this.goodsDetail)

                }else{

                }
            })
          },
          //跳转到首页
          async gotoHome(){
            this.$router.push('/');
          },
          //跳转到购物车页面
          gotoCar(){
            this.$router.push('/carts')
          },
          //点击加入购物车
          addToCar(){
            //console.log('加入购物车')
            this.showBase=true;
            this.isBuy=false;
          },
          //点击购买
          toBuy(){
            //console.log('购买')
            this.showBase=true;
            this.isBuy=true;
          },
          //确定加入购物车
          addCar(){
            //console.log(this.goodsDetail)
            var cartParams={
              goods_id: this.goodsDetail._id,
              goodsName: this.goodsDetail.name,
              goodsImg: this.goodsDetail.images,
              price : this.goodsDetail.price,
              goodsNum: this.value
            };
            axios.post('/api/cart/addToCart',cartParams).then((res)=>{
              if(res.data.status==1){
                this.$router.go(-1);
                Toast.success('加入购物车成功')
              }
            })
          },
          //确定购买
          goBuy(){
            //this.setCart1()
            //console.log(this.goodsDetail)
            var orderArr=[];
            var params={
                goodsImg:this.goodsDetail.images,
                goodsName:this.goodsDetail.name,
                goods_id: this.goodsDetail._id,
                goodsNum: this.value,
                goodsPrice: this.goodsDetail.price
            }
            orderArr.push(params)
            //console.log(orderArr)
            this.setCart1(orderArr)
            this.$router.push('order')
          }
        }
    }
</script>

<style scoped>

</style>
