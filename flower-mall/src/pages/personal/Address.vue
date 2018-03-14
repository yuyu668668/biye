<template>
<div>
  <van-row style="margin-top: 20px;margin-bottom: 20px;">
    <van-col :offset="1"><a href="javascript:history.back()"><van-icon name="arrow-left" /></a></van-col>
    <van-col :span="16">我的地址</van-col>
  </van-row>

  <van-radio-group v-model="default_address" @change="setDefaultAddress">
    <van-cell-group v-for="item in list" :key="item.id">
      <van-cell
        isLink
        :title="item.name"
        :value="item.tel"
        :label="item.address"
      />
      <van-cell>
        <van-radio :name="item._id" @change="setDefaultAddress(item._id)">设为默认地址</van-radio>
      </van-cell>
      <van-button size="small" @click="onEdit(item)">编辑</van-button>
      <van-button size="small" @click="onDelete(item._id)">删除</van-button>
    </van-cell-group>
  </van-radio-group>

  <van-button class="bottom_btn" type="primary" bottomAction @click="onAdd">
    添加地址
  </van-button>



  <!--地址添加对话框-->
  <van-dialog v-model="showAdd" @confirm="onConfirm"
              title="添加地址信息" show-cancel-button>
    <van-field
      v-model="addForm.id"
      label="编号"
      placeholder="编号"
    />
    <van-field
      v-model="addForm.name"
      label="收货人"
      placeholder="收货人"
    />
    <van-field
      v-model="addForm.tel"
      label="联系电话"
      placeholder="联系电话"
    />
    <van-field
      v-model="addForm.address"
      label="收货地址"
      placeholder="收货地址"
    />
  </van-dialog>

  <!--地址编辑对话框-->
  <van-dialog v-model="showEdit" @confirm="onUpdate"
              title="编辑地址信息" show-cancel-button>
    <van-field
      v-model="editForm.id"
      label="编号"
      placeholder="编号"
    />
    <van-field
      v-model="editForm.name"
      label="收货人"
      placeholder="收货人"
    />
    <van-field
      v-model="editForm.tel"
      label="联系电话"
      placeholder="联系电话"
    />
    <van-field
      v-model="editForm.address"
      label="收货地址"
      placeholder="收货地址"
    />
  </van-dialog>
</div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'vant'
    export default {
      data() {
        return {
          default_address:'',
          list: [],
          showAdd: false,
          addForm:{
            id:'',
            name:'',
            tel:'',
            address:''
          },
          showEdit:false,
          editForm:{
            _id:'',
            id:'',
            name:'',
            tel:'',
            address:''
          }
        }
      },
      created(){
        this.getAddress();
      },
      methods: {
        onAdd() {
          this.showAdd=true;
        },
        //添加地址
        onConfirm(){
          var params={
            id: this.addForm.id,
            name: this.addForm.name,
            tel :this.addForm.tel,
            address: this.addForm.address
          }
          var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if(params.id==''){
            Toast.fail('编号不能为空')
            this.showAdd=true;
          }else if(params.name==''){
            Toast.fail('收货人不能为空')
            this.showAdd=true;
          }else if(params.tel==''){
            Toast.fail('电话不能为空')
            this.showAdd=true;
          }else if(params.address==''){
            Toast.fail('收获地址不能为空')
            this.showAdd=true;
          }else if(!reg.test(params.tel)){
            Toast.fail('电话号码格式错误')
            this.showAdd=true;
          }else{
            axios.post('/api/address/addAddress',params).then((res)=>{
              if(res.data.status==1){
                Toast.success('添加成功')
                this.getAddress();
              }else{
                Toast.fail('添加失败')
              }
            })
          }
        },
        //设置默认地址
        setDefaultAddress(item){
          //console.log(item)
          axios.post('/api/address/setDefaultAddress',{_id:item}).then((res)=>{
            if(res.data.status==1){
              Toast.success('设置默认地址成功')
            }
          })
        },
        onEdit(item) {
          this.editForm=item;
          this.showEdit=true;
        },
        //删除
        onDelete(item){
          axios.post('/api/address/deleteAddress',{_id:item}).then((res)=>{
            if(res.data.status==1){
              Toast.success('删除成功');
              this.getAddress();
            }
          })
        },
        //编辑地址
        onUpdate(){
          axios.post('/api/address/updateAddress',{...this.editForm}).then((res)=>{
            if(res.data.status==1){
              Toast.success('修改成功');
              this.showEdit=false;
              this.getAddress();
            }else{
              Toast.fail('修改失败')
            }
          })
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
