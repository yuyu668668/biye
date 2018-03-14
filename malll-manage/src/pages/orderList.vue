<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path:'/orderList'}">订单列表</el-breadcrumb-item>
  </el-breadcrumb>
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

</style>
