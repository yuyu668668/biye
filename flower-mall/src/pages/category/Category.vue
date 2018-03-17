<template>
  <div>
    <!--搜索框-->
    <van-search
      v-model="keywords"
      show-action
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!--分类标签-->
    <van-tabs>
      <!--遍历所有商品-->
      <van-tab :title="'全部'">
        <div class="goods-list-wrapper">
          <ul class="goods-list">
            <li  v-for="(item,index) in allGoods" :key="index">
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
      </van-tab>
      <!--遍历分类下所属的商品-->
      <van-tab v-for="cate in category" :title="cate.cname" :key="cate._id">
        <div class="goods-list-wrapper">
          <ul class="goods-list">
            <li  v-for="(item,index) in allGoods" :key="index" v-if="cate._id==item.link_category._id">
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

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import axios from 'axios'
  import {Toast} from 'vant'
  export default {
        name:'category',
        data() {
            return {
              keywords:'',
              allGoods:[],
              category:[],
            }
        },
    // 被缓存进入才会触发这个钩子
      activated(){
        this.changeFooterFlag1(true);//显示底部导航
        this.changeCategory1();//使分类样式程actived状态
      },
    // 被缓存离开才会触发这个钩子
      deactivated(){
        this.changeFooterFlag1(false);
        this.changeCategory1();
      },
      created(){
        this.getAllGoods();
        this.getCategory();
      },
      computed: {

      },
      methods:{
        ...mapActions([
          'changeFooterFlag1',
          'changeCategory1'
        ]),
        //搜索
        onSearch(){
          axios.post('/api/goods/searchGoods',{keywords:this.keywords}).then((res)=>{
            if(res.data.status==1){
              this.allGoods=res.data.msg;
            }
          })
        },
        //获取所有商品
        async getAllGoods(){
          axios.get('/api/goods').then((res)=>{
            if(res.data.status==1){
              this.allGoods=res.data.result;
              //console.log(this.allGoods)
            }
          })
        },
        //获取所有分类
        async getCategory(){
          axios.get('/api/category').then((res)=>{
            if(res.data.status==1){
              this.category=res.data.result;
            }
          })
        },

      }

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
