/**
 *Create by Zhang on 2018/1/2
 */
var mongoose=require('mongoose');

var categorySchema=new mongoose.Schema({
    cno: Number, //分类编号
    cname: String, //分类名
    cdesc: String, //分类描述

});

var  Category=mongoose.model('Category',categorySchema);

module.exports=Category;