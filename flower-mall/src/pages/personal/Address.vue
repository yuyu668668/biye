<template>
<div>
  <van-row style="margin-top: 20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">我的地址</van-col>
  </van-row>
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    @add="onAdd"
    @edit="onEdit"
  />
</div>
</template>

<script>
  import axios from 'axios'
    export default {
      data() {
        return {
          chosenAddressId: '1',
          list: []
        }
      },
      created(){
        this.getAddress();
      },
      methods: {
        onAdd() {
          console.log('新增')
        },
        onEdit(item, index) {
          console.log('编辑')
        },
        getAddress(){
          axios.get('/api/address/getAddress').then((res)=>{
            if(res.data.status==1){
              //console.log(res.data.msg)
              this.list=res.data.msg;
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
