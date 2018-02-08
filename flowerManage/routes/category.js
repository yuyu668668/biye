/**
 *Create by Zhang on 2018/1/2
 */
var express=require('express');
var categoryController=require('../controller/category/category');

var router=express.Router();

router.get('/',categoryController.getCategory);

module.exports=router;