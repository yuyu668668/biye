/**
 *Create by Zhang on 2018/3/13
 */

var mongoose=require('mongoose');

var OrderSchema=new mongoose.Schema({
    id: Number, //编号
    goodsInfo: [],//商品信息
    user_id: String,//用户id
    address: String, //地址
    is_pay: {       //是否已支付
      type: Boolean,
      default: false
    },
    is_send: {  //是否发货
      type: Boolean,
      default: false
    },
    is_receipt: {   //是否收货
      type: Boolean,
      default: false
    },
    create_time:String //创建时间
});

var Order=mongoose.model('Order',OrderSchema);

module.exports=Order;



