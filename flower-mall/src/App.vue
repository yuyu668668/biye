<template>
  <div id="app">
    <transition name="fade">
      <!-- exclude指定不用缓存的组件 -->
      <keep-alive :include="['home','category','carts','personal']">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!--底部导航菜单-->
    <footer-nav :footerFlag="footerFlag" :activeHome="activeHome" :activeCategory="activeCategory" :activeCarts="activeCarts" :activePersonal="activePersonal"></footer-nav>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import footerNav from '@/components/footer/Footer'

export default {
  name: 'app',
  data(){
    return {

    }
  },
  components:{
    footerNav
  },
  computed:{
    ...mapState([
      'footerFlag',
      'activeHome',
      'activeCategory',
      'activeCarts',
      'activePersonal'
    ])
  },
  methods:{

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 60px;
}
</style>
