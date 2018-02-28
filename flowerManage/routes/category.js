/**
 *Create by Zhang on 2018/1/2
 */
var express=require('express');
var categoryController=require('../controller/category/category');

var router=express.Router();

router.get('/',categoryController.getCategory);

router.post('/addCategory',categoryController.addCategory);

router.post('/updateCategory',categoryController.updateCategory);

router.get('/deleteCategory',categoryController.deleteCategory);

module.exports=router;