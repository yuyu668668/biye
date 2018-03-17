/**
 *Create by Zhang on 2018/3/13
 */

var mongoose=require('mongoose');

var OrderSchema=new mongoose.Schema({
    id: Number, //编号
    goodsInfo: [],//商品信息
    user_id: String,//用户id
    create_time:String //创建时间
});

var Order=mongoose.model('Order',OrderSchema);

module.exports=Order;



