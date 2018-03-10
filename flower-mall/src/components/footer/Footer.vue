<template>
  <div class="nav" v-show="footerFlag">
    <ul>
      <li>
        <router-link to="/" class="nav-home" :class="{'nav-home-active' : activeHome }">首页</router-link>
      </li>
      <li>
        <router-link to="/category" class="nav-category" :class="{'nav-category-active' : activeCategory }">分类</router-link>
      </li>
      <li>
        <router-link to="/carts" class="nav-carts" :class="{'nav-carts-active' : activeCarts }">购物车</router-link>
      </li>
      <li>
        <router-link to="/personal" class="nav-personal" :class="{'nav-personal-active' : activePersonal }">我的</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name:'footer',
        props:{
          //控制底部导航菜单是否显示
          footerFlag:{
            type:Boolean,
            default:false
          },
          activeHome : {
              type : Boolean,
              default : false
           },
          activeCategory : {
            type : Boolean,
            default : false
          },
          activeCarts : {
            type : Boolean,
            default : false
          },
          activePersonal : {
            type : Boolean,
            default : false
          },
        },
        data() {
            return {

            }
        },
        methods:{

        },
    }
</script>

<style scoped>
  .nav{
    position: fixed;
    z-index: 100;
    left: 0;
    width:100%;
    bottom:0;
    background-color: #fff;
  }
  .nav ul {
    display: -webkit-flex;
    -webkit-justify-content: space-around;
    -webkit-align-items:center;
    height: 50px;
  }
  .nav ul li {
    width: 25%;
    padding-top: 2px;
  }
  .nav a {
    display: block;
    width: 100%;
    padding-top: 25px;
    font-size: 12px;
    text-align: center;
    color: #4c4c4c;
  }
  .nav .nav-home{
    background: url("../../assets/footer/home.png") no-repeat center top / 22px 22px;
  }
  .nav .nav-home-active{
    color:#9f2e33;
    background: url("../../assets/footer/home-active.png") no-repeat center top / 22px 22px;
  }
  .nav .nav-category{
    background: url("../../assets/footer/category.png") no-repeat center top / 22px 22px;
  }
  .nav .nav-category-active{
    color:#9f2e33;
    background: url("../../assets/footer/category-active.png") no-repeat center top / 22px 22px;
  }
  .nav .nav-carts{
    background: url("../../assets/footer/carts.png") no-repeat center top / 22px 22px;
  }
  .nav .nav-carts-active{
    color:#9f2e33;
    background: url("../../assets/footer/carts.png") no-repeat center top / 22px 22px;
  }
  .nav .nav-personal{
    background: url("../../assets/footer/personal.png") no-repeat center top / 22px 22px;
  }
  .nav .nav-personal-active{
    color:#9f2e33;
    background: url("../../assets/footer/personal-active.png") no-repeat center top / 22px 22px;
  }

</style>
