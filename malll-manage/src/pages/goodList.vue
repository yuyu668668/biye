<template>
<div>
  <!--面包屑-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/goodList'}">商品列表</el-breadcrumb-item>
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
            <el-form-item label="商品名称：">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品编号：">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品价格：">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品分类：">
              <span>{{ props.row.category.cname }}</span>
            </el-form-item>
            <el-form-item label="花语：">
              <span>{{ props.row.detail }}</span>
            </el-form-item>
            <el-form-item label="库存：">
              <span>{{ props.row.amount }}</span>
            </el-form-item>
            <el-form-item label="销量：">
              <span>{{ props.row.sell }}</span>
            </el-form-item>
            <el-form-item label="商品缩略图：">
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
            @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <!--编辑对话框-->
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" :rules="rules" ref="selectTable">
        <el-form-item label="商品编号" label-width="100px" prop="id">
          <el-input v-model="selectTable.id"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px" prop="name">
          <el-input v-model="selectTable.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px" prop="desc">
          <el-input v-model="selectTable.desc"></el-input>
        </el-form-item>
        <el-form-item label="花语" label-width="100px">
          <el-input v-model="selectTable.detail"></el-input>
        </el-form-item>
        <el-form-item label="库存" label-width="100px">
          <el-input v-model="selectTable.amount"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="100px" prop="price">
          <el-input v-model="selectTable.price"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" label-width="100px" prop="category">
          <el-select v-model="selectTable.category" placeholder="请选择">
            <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="/api/goods/addimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="selectTable.images" :src="selectTable.images" style="width: 100px;height: 100px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateGoods('selectTable')">确 定</el-button>
      </div>
    </el-dialog>
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
            dialogFormVisible: false,
            selectTable: {},
            categoryList: [],
            offset: 0,
            limit: 10,
            count: 0,
            currentPage: 1,
            rules: {
              id: [
                { required: true, message: '请输入商品编号', trigger: 'blur' }
              ],
              name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              price: [
                { required: true, message: '请输入商品价格' },
                { type: 'number', message: '价格必须为数字值'}
              ],
              desc: [
                { required: true, message: '请输入商品描述', trigger: 'blur' }
              ],
              category:[
                {required: true, message: '请选择商品分类', trigger: 'blur'}
              ]
            }
          }
        },
        created(){
          this.getData();
          this.getCategory();
          this.getDataCount();
        },
        methods:{
          //获取商品信息
            async getData(){
              axios.get('api/goods',{params:{offset: this.offset,limit:this.limit}}).then((res)=>{
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
                      tableData.detail=item.detail;//花语
                      tableData.sell=item.sell;//销量
                      tableData.amount=item.amount;//库存
                      tableData.price=item.price;//商品价格
                      tableData.create_time=item.create_time;//创建时间
                      tableData.images=item.images;//商品图片
                      tableData.category=item.link_category;//商品分类名
                      this.tableData.push(tableData);
                  })
                }else{
                  //console.log(res.data.messages)
                  this.$message.error(res.data.messages)
                }
              })
            },
          //获取商品总条数
          async getDataCount(){
              axios.get('api/goods/getGoodsCount').then((res)=>{
                if(res.data.status==1){
                  this.count = res.data.count;
                  //console.log(this.count)
                }
              })
          },

          async handleEdit(index,row) {
            //console.log(row);
            this.selectTable=row;
            this.dialogFormVisible = true;
            //console.log(row)

          },

          //获取分类列表
          async getCategory(){
            axios.get('api/category').then((res)=>{
              //console.log(res.data);
              if(res.data.status==1){
                res.data.result.map((item,index)=>{
                  item.value=item._id;
                  item.label=item.cname;
                  item.index=index
                })
                this.categoryList=res.data.result;
                //console.log(this.categoryList)
              }
            })
          },

          //图片修改上传
          handleAvatarSuccess(res, file) {
            if(res.status==1){
              this.selectTable.images=res.result;
            }else{
              this.$message.error('图片修改失败');
            }
          },
          beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
          },


          //更新商品信息
          async updateGoods(formName){
            this.$refs[formName].validate((valid) => {
              if(valid){
                var params={...this.selectTable};
                //console.log(params)
                axios.post('api/goods/updateGoods',qs.stringify(params)).then((res)=>{
                  //console.log(res)
                  if(res.data.status==1){
                    this.$message.success(res.data.msg);
                    this.dialogFormVisible=false;
                    this.getData();//重新渲染数据

                  }else{
                    this.$message.error(res.data.msg);
                  }
                })
              }
            })

          },
          //删除商品
          async handleDelete(index,row){
            axios.get('api/goods/deleteToRecycle',{params:{ id: row._id}}).then((res)=>{
                if(res.data.status==1){
                  this.$message({
                    type: 'success',
                    message: '删除到回收站成功'
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
