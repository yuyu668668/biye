/**
 *Create by Zhang on 2017/12/12
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    footerFlag:false,  //默认底部导航菜单不显示
    activeHome:false,
    activeCategory:false,
    activeCarts:false,
    activePersonal:false,
    carts:'',
  },
  mutations:{
    //控制底部导航菜单是否显示
    changeFooterFlag(state,flag){
      state.footerFlag=flag;
    },
    changeHome(state){
      state.activeHome=true;
      state.activeCategory=false;
      state.activeCarts=false;
      state.activePersonal=false;
    },
    changeCategory(state){
      state.activeHome=false;
      state.activeCategory=true;
      state.activeCarts=false;
      state.activePersonal=false;
    },
    changeCarts(state){
      state.activeHome=false;
      state.activeCategory=false;
      state.activeCarts=true;
      state.activePersonal=false;
    },
    changePersonal(state){
      state.activeHome=false;
      state.activeCategory=false;
      state.activeCarts=false;
      state.activePersonal=true;
    },
    setCart(state,carts){
      state.carts=carts;
    }
  },
  actions:{
    changeFooterFlag1(context,flag){
      context.commit('changeFooterFlag',flag);
    },
    changeHome1( context ) {
      context.commit('changeHome');
    },
    changeCategory1( context ) {
      context.commit('changeCategory');
    },
    changeCarts1( context ) {
      context.commit('changeCarts');
    },
    changePersonal1( context ) {
      context.commit('changePersonal');
    },
    setCart1(context,flag){
      context.commit('setCart',flag);
    }
  }

});

export default store;


