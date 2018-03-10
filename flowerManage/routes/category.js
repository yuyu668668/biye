/**
 *Create by Zhang on 2018/1/2
 */
var express=require('express');
var categoryController=require('../controller/category/category');

var router=express.Router();

//获取所有分类
router.get('/',categoryController.getCategory);
//添加分类
router.post('/addCategory',categoryController.addCategory);
//修改分类
router.post('/updateCategory',categoryController.updateCategory);
//删除分类
router.get('/deleteCategory',categoryController.deleteCategory);
//根据分类id遍历分类下所有的商品
//router.get('/findGoodsByCategoryId',categoryController.findGoodsByCategoryId);

module.exports=router;