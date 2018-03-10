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
      </van-tab>
      <!--遍历分类下所属的商品-->
      <van-tab v-for="cate in category" :title="cate.cname" :key="cate._id">
        <van-row v-for="(g,index) in groups" :key="index">
          <van-col :span="12" v-for="item in g" :key="index" style="border:1px solid lightgray "
          v-if="cate._id==item.link_category._id">
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
        groups(){
          return this.changeArr(this.allGoods,2);
        }
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
      }

    }
</script>

<style scoped>

</style>
