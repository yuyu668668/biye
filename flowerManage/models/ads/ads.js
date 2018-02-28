/**
 *Create by Zhang on 2018/2/25
 */

var mongoose=require('mongoose');

var AdsSchema=new mongoose.Schema({
    id: Number, //编号
    link: String,//链接
    pic: String //图片

});

var Ads=mongoose.model('Ads',AdsSchema);

module.exports=Ads;



