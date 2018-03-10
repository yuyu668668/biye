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
      <van-row style="margin-top: 5px;color: #7e8c8d">
        <van-col :span="24">--热销商品--</van-col>
      </van-row>
      <!--遍历所有商品-->
      <van-row>
        <van-row v-for="(g,index) in groups" :key="index" style="margin-top: 5px;">
          <van-col :span="12" v-for="item in g" :key="index" style="border:1px solid lightgray ">
            <router-link :to="'/goodsDetail?goodsId='+item._id">
              <van-row>
                <van-col :span="24"><img v-lazy="item.images" style="width: 200px;height:200px;"/></van-col>
              </van-row>
              <van-row><van-col :span="24">{{item.name}}</van-col></van-row>
              <van-row>
                <van-col :span="12"><span style="color: red">￥{{item.price}}</span></van-col>
                <van-col :span="12"><span style="color: grey">销量: {{item.sell}}</span></van-col>
              </van-row>
            </router-link>
          </van-col>
        </van-row>
      </van-row>
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
          groups(){
            return this.changeArr(this.hotGoods,2);
          }
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
          },
          //将一维数组变成二维数组
          changeArr(items,count){
            var len=items.length;
            var arr=[];
            var child=[];
            for(var  i=0;i<len;i++){
              child.push(items[i]);

              if(child.length===count){
                arr.push(child);
                child=[];
              }
            }
            if(child.length>0){
              arr.push(child);
            }
            return arr;
          }

        },

    }
</script>

<style scoped>

</style>
