<template>
  <div>
    <!--面包屑-->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/recycleList'}">回收站列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--表格-->
    <div class="table_contain">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category.cname }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item label="商品缩略图">
                <img :src="props.row.images" style="width: 80px;height:80px">
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品编号"
          prop="id">
        </el-table-column>
        <el-table-column
          align="center"
          label="商品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          align="center"
          label="描述"
          prop="desc">
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          :formatter="dateFormat"
          prop="create_time">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index,scope.row)">还原</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">彻底删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页显示-->
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import moment from 'moment'
  import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue"
  export default {
    components: {ElForm},
    data() {
      return {
        tableData:[],
        offset: 0,
        limit: 10,
        count: 0,
        currentPage: 1,
      }
    },
    created(){
      this.getData();
      this.getDataCount();
    },
    methods:{
      //获取商品信息
      async getData(){
        axios.get('api/goods/getRecycleGoods',{params:{offset: this.offset,limit:this.limit}}).then((res)=>{
          //console.log(res.data.result)
          if(res.data.status==1){
            var goods=res.data.result;
            this.tableData=[];
            goods.forEach((item,index)=>{
              const tableData={};
              tableData._id=item._id;
              tableData.id=item.gno; //商品id
              tableData.name=item.name;//商品名称
              tableData.desc=item.gdesc; //商品描述
              tableData.price=item.price;//商品价格
              tableData.create_time=item.create_time;//创建时间
              tableData.images=item.images;//商品图片
              tableData.category=item.link_category;//商品分类
              this.tableData.push(tableData);
            })
          }else{
            //console.log(res.data.messages)
            this.$message.error(res.data.messages)
          }
        })
      },
      //获取回收站商品总条数
      async getDataCount(){
        axios.get('api/goods/getRecycleCount').then((res)=>{
          if(res.data.status==1){
            this.count = res.data.count;
          }
        })
      },

      //从回收站还原
      handleEdit(index,row) {
        axios.get('api/goods/resetGood',{params:{ id: row._id}}).then((res)=>{
          if(res.data.status==1){
            this.$message({
              type: 'success',
              message: '还原成功'
            });
            this.getData();//重新渲染页面
          }else{
            this.$message({
              type: 'error',
              message: '还原失败'
            })
          }
        })

      },

      //删除商品
      async handleDelete(index,row){
        axios.get('api/goods/deleteGoods',{params:{ id: row._id}}).then((res)=>{
          if(res.data.status==1){
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getData();//重新渲染页面
          }else{
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      },
      //格式化时间
      dateFormat: function (row,column) {
        let date = row[column.property];
        return moment(date).format("YYYY-MM-DD")
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.offset = (val - 1)*this.limit;
        this.getData()
      },


    }

  }
</script>

<style scoped>
  .table_container{
    padding:50px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
