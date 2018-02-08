<template>
  <div>这是分类页
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
        name:'category',
        data() {
            return {}
        },
      activated(){
        this.changeFooterFlag1(true);//显示底部导航
        this.changeCategory1();//使分类样式程actived状态
      },
      deactivated(){
        this.changeFooterFlag1(false);
        this.changeCategory1();
      },
      methods:{
        ...mapActions([
          'changeFooterFlag1',
          'changeCategory1'
        ]),
      }

    }
</script>

<style scoped>

</style>
