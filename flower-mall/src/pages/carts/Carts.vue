<template>
    <div>
      这是购物车页面

    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
    export default {
        name:'carts',
        data() {
            return {}
        },
        activated(){
          this.changeFooterFlag1(true);//显示底部导航
          this.changeCarts1();//使分类样式程actived状态
        },
        deactivated(){
          this.changeFooterFlag1(false);
          this.changeCarts1();
        },
        methods:{
          ...mapActions([
            'changeFooterFlag1',
            'changeCarts1'
          ]),
        }

    }
</script>

<style scoped>

</style>
