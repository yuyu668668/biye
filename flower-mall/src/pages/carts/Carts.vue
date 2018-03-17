<template>
  <div>
    <!--购物车不为空-->
    <div v-if="cartList!=0">
      <van-checkbox-group v-model="checkedGoods"  class="card-goods">
        <van-checkbox
          v-for="(item, index) in cartList"
          :key="item._id"
          :name="item._id"
          label-disabled
          class="card-item"
        >
          <van-card
            :title="item.goodsName"
            :num="item.goodsNum"
            :price="item.goodsPrice"
            :thumb="item.goodsImg"
          >
            <div slot="footer">
              <van-stepper v-model="item.goodsNum"/>
              <van-button @click="delGoodsById(item._id)" size="mini">删除</van-button>
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
      >
        <div class="checkAll" @click="checkAll"><van-checkbox v-model="allChecked" >全选</van-checkbox></div>
      </van-submit-bar>
    </div>
    <!--购物车为空-->
    <div class="cart-empty" v-else>
      <div class="cart-ico">
        <i class="van-icon van-icon-cart"></i>
      </div>
      <p class="empty-warm">购物车还是空的</p>
      <router-link to="/">
        <van-button size="small">去看看</van-button>
      </router-link>
    </div>
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
              allChecked:false,
            }
        },
      watch:{
        //监听单选框，选择状态
        checkedGoods(e,old){
          //console.log(e)
          if(this.cartList.length == e.length){
            this.allChecked=true
          }
          else{
            this.allChecked=false
          }
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
            return '结算' + (count ? `(${count})` : '');
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

          //点击全选按钮
          checkAll(){
            let arr=[];
            if(this.allChecked){
              this.cartList.forEach(function (item,index) {
                arr.push(item._id)
              })
              this.checkedGoods=arr;
              //console.log(this.checkedGoods)
            }else{
              this.checkedGoods=[];
            }
          },
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

          //提交订单,跳转到结算页面
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
    background-color: #fff;
    position: relative;
  }
  .card-item{
    position: relative;
    padding: 10px 0 10px 2%;
    border-bottom: 1px solid #e5e5e5;
  }

  .card-goods .van-card{
  width: 290px;
}
  .btn-goods{
    margin-bottom: 50px;
  }

  .cart-empty {
    padding: 1.5rem 5%;
    text-align: center;
  }
  .cart-ico .van-icon-cart{
    font-size: 0.5rem;
    color:#999;
  }

  .empty-warm{
    font-size: 0.32rem;
    margin-top: 0.3rem;
    color: #999;
  }
  .checkAll{
    padding-left: 20px;
  }

</style>
