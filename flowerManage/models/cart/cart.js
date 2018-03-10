/**
 *Create by Zhang on 2018/3/8
 */

var mongoose=require('mongoose');

var CartSchema=new mongoose.Schema({
    user_id: String,  //用户_id
    goods_id: String,     // 商品_id
    goodsName: String,    //商品名称
    goodsImg: String,     //商品图片
    goodsPrice: Number,   //商品单价
    goodsNum: Number,   //数量
    create_time:{       //创建时间
        type: Date,
        default: Date.now()
    }

});

var Cart=mongoose.model('Cart',CartSchema);

module.exports=Cart;



