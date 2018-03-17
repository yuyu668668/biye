<template>
  <div class="paySuc">
    <div class="paySuc-top">
      <p>
        <i class="van-icon van-icon-passed"></i>
        <span>支付成功</span>
      </p>

      <div class="msg">
        <h1>送货信息</h1>
        <span>我们将尽快安排发货，请买家保持手机通讯顺畅，以便快递哥哥能第一时间联系到您</span>
      </div>
    </div>
    <div class="btn">
      <router-link to="/">
        <van-button size="normal">返回首页</van-button>
      </router-link>
    </div>

  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
    }
</script>

<style scoped>

  .paySuc{
    height:100%;
  }
  .paySuc-top{
    padding:0.2rem 5%;
    background: #fff;
    color: #333;
  }
  .paySuc .paySuc-top p{
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .van-icon-passed:before{
    color: #00c000;
  }
  .btn{
    text-align: center;
  }
</style>
