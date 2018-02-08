/**
 *Create by Zhang on 2018/1/3
 */
var mongoose=require('mongoose');

var goodsSchema=new mongoose.Schema({
    gno : Number,  //商品编号
    name: String,   //商品名称
    price: Number,  //商品价格
    gdesc:  {
        type: String,
        default: ''
    },  //商品描述
    images: {
        type: String,
        default: ''
    },  //商品图片
    create_time: {   //创建时间
        type: Date,
        default: Date.now()
    },
    link_category:{   //文档关联
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }

});

var Goods=mongoose.model('Goods',goodsSchema);

module.exports=Goods;