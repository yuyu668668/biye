<template>
    <div>
      <!--swiper轮播图-->
      <div class="mySwiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item,index) in swipeData" :key="index">
            <a :href="item.link"><img v-lazy="item.pic" style="height: 200px;width: 100%"/></a>
          </van-swipe-item>
        </van-swipe>
      </div>

      <van-notice-bar
        text="欢迎来到鲜花订购网，服务热线:668668,每一款鲜花都能让您感受到爱的幸福!"
      />

      <van-row style="margin-top: 5px;color: #7e8c8d">
        <van-col :span="24">--热销商品--</van-col>
      </van-row>
      <!--遍历热销商品-->
      <div class="goods-list-wrapper">
        <ul class="goods-list">
          <li  v-for="(item,index) in hotGoods" :key="index">
            <router-link :to="'/goodsDetail?goodsId='+item._id">
              <div class="photo">
                <img v-lazy="item.images">
              </div>
              <div class="info">
                <h3 class="title">
                  {{item.name}}
                </h3>
                <div class="bot">
                  <span class="price">￥{{item.price}}</span>
                  <div class="sell">销量:{{item.sell}}</div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import axios from 'axios'
    export default {
        name:'home',
        data() {
            return {
              swipeData:[],
              hotGoods:[]
            }
        },
       created(){
          this.getSwipeData();
          this.getHotGoods();
        },
        activated(){
          this.changeFooterFlag1(true);//显示底部导航
          this.changeHome1();//使首页样式程actived状态
        },
        deactivated(){
            this.changeFooterFlag1(false);
            this.changeHome1();
        },
        computed: {

        },
        methods:{
          ...mapActions([
            'changeFooterFlag1',
            'changeHome1'
          ]),
          //获取广告列表的数据
          getSwipeData(){
            axios.get('/api/ads').then((res)=>{
              if(res.data.status==1) {
                this.swipeData = res.data.msg;
              }
            });
          },
          //获取热销商品
          getHotGoods(){
            axios.get('/api/goods/hotGoods').then((res)=>{
              if(res.data.status==1){
                this.hotGoods=res.data.msg;
                //console.log(this.hotGoods)
              }
            })
          }

        },

    }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 2%;
  }

  ul li{
    width: 49%;
    background: #fff;
    margin: 0.1rem 0;
  }

  .photo img{
    width: 100%;
    height: 100%;
  }

  .info {
    padding: 0.08rem 0.15rem 0.15rem 0.15rem;
  }
  .info .title{
    font-size: 0.28rem;
    color: #333;
    line-height: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
 .info .bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.1rem 0 0.2rem 0;
  }
  .price{
    font-size: 0.32rem;
    color: #f44;
  }


  .sell{
    width: 3rem;
    height: 0.48rem;
    color: #f44;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    font-size: 0.24rem;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
  }


</style>
