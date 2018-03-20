<template>
<div>
  <van-row style="margin-top: 20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">我的收藏</van-col>
  </van-row>

  <van-cell-group v-if="collectList.length>0" v-for="(item,index) in collectList" :key="item._id">
    <router-link :to="'/goodsDetail?goodsId='+item.goods_id._id">
      <van-card
        :title="item.goods_id.name"
        :desc="item.goods_id.gdesc"
        :price="item.goods_id.price"
        :thumb="item.goods_id.images"
      >
        <div slot="footer">
          <van-icon name="delete" @click="deleteCollect(item._id)"/>
        </div>
      </van-card>
    </router-link>
  </van-cell-group>

</div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'vant'
    export default {
        data() {
            return {
              collectList:[]
            }
        },
        created(){
          this.getCollect();
        },
        methods:{
          //获取收藏列表
          getCollect(){
            axios.get('/api/collect/getCollect').then((res)=>{
              if(res.data.status==1){
                this.collectList=res.data.msg;
                //console.log(this.collectList)
              }
            })
          },
          //删除收藏
          deleteCollect(id){
            axios.post('/api/collect/deleteCollect',{_id:id}).then((res)=>{
              if(res.data.status==1){
                Toast.success('删除成功');
                this.getCollect();
              }else{
                Toast.fail('删除失败')
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
