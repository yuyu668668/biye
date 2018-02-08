<template>
    <div>
      <!--swiper轮播图-->
      <div class="mySwiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="item in indexData">
            <img v-lazy="'/static/images/'+item.adImg" />
          </van-swipe-item>
        </van-swipe>
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
              indexData:[]
            }
        },
       created(){
          this.getData();
        },
        activated(){
          this.changeFooterFlag1(true);//显示底部导航
          this.changeHome1();//使首页样式程actived状态
        },
        deactivated(){
            this.changeFooterFlag1(false);
            this.changeHome1();
        },
        methods:{
          ...mapActions([
            'changeFooterFlag1',
            'changeHome1'
          ]),
          //获取api中的数据
          getData(){
            axios.get('/api/indexData').then((result)=>{
              console.log(result.data.data)
              this.indexData=result.data.data;
            });
          }

        },

    }
</script>

<style scoped>

</style>
