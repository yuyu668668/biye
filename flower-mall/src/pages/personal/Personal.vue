<template>
    <div>
      这是个人主页

    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
    export default {
        name:'personal',
        data() {
            return {}
        },
      activated(){
        this.changeFooterFlag1(true);//显示底部导航
        this.changePersonal1();//使分类样式程actived状态
      },
      deactivated(){
        this.changeFooterFlag1(false);
        this.changePersonal1();
      },
      methods:{
        ...mapActions([
          'changeFooterFlag1',
          'changePersonal1'
        ]),
      }

    }
</script>

<style scoped>

</style>
