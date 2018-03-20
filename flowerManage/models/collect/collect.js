/**
 *Create by Zhang on 2018/3/19
 */

var mongoose=require('mongoose');

var CollectSchema=new mongoose.Schema({
    goods_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Goods'
    },//商品编号
    user_id: String  //用户编号

});

var Collect=mongoose.model('Collect',CollectSchema);

module.exports=Collect;



