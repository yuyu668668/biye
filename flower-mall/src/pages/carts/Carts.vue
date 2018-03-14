<template>
    <div>
      <van-checkbox-group v-model="checkedGoods"  class="card-goods">
        <van-checkbox
          v-for="(item, index) in cartList"
          :key="item._id"
          :name="item._id"
          label-disabled
        >
          <van-card
            :title="item.goodsName"
            :num="item.goodsNum"
            :price="item.goodsPrice"
            :thumb="item.goodsImg"
          >
            <div slot="footer">
              <van-stepper v-model="item.goodsNum" />
              <van-button @click="delGoodsById(item._id)">删除</van-button>
            </div>
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
      <van-submit-bar
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        class="btn-goods"
        @submit="onSubmit"
      />
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import axios from 'axios'

    export default {
        name:'carts',
        data() {
            return {
              checkedGoods: [],
              cartList:[],
            }
        },
        mounted(){
          this.getCarts();
        },
        activated(){
          this.changeFooterFlag1(true);//显示底部导航
          this.changeCarts1();//使分类样式程actived状态
        },
        deactivated(){
          this.changeFooterFlag1(false);
          this.changeCarts1();
        },
        computed  :{
          submitBarText() {
            const count = this.checkedGoods.length;
            return '提交订单' + (count ? `(${count})` : '');
          },
          totalPrice() {
            return this.cartList.reduce((total, item) => total + (this.checkedGoods.indexOf(item._id) !== -1 ? item.goodsPrice*100*item.goodsNum : 0), 0);
          }
        },
        methods:{
          ...mapActions([
            'changeFooterFlag1',
            'changeCarts1',
            'setCart1'
          ]),

          //获取购物车数据
          getCarts(){
            axios.get('/api/cart/getCart').then((res)=>{
              if(res.data.status==1){
                //console.log(res.data.msg)
                this.cartList=res.data.msg;
              }
            })
          },

          //根据id删除购物车商品
          delGoodsById(id){
            axios.get('/api/cart/delGoodsById',{params:{id:id}}).then((res)=>{
              if(res.data.status==1){
                //删除成功,重新渲染
                this.getCarts();
              }
            })
          },

          //提交订单
          onSubmit(){
            var that=this;
            var orderArr=[];
            this.cartList.forEach(function (item) {
              if(that.checkedGoods.length>0){
                that.checkedGoods.forEach(function (key) {
                  if(item._id==key){
                    orderArr.push(item)
                  }
                })
              }

            })
            //console.log(orderArr)
            this.setCart1(orderArr);
            //console.log(this.checkedGoods)
            this.$router.push('/order');
          }
        }

    }
</script>

<style scoped>
  .card-goods{
    padding: 10px 0;
    background-color: #fafafa;
  }

  .card-goods .van-card{
  width: 290px;
}
  .btn-goods{
    margin-bottom: 50px;
  }
</style>
