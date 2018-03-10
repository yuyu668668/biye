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
    detail: {   //花语
        type: String,
        default:''
    },
    sell:{     //销量
        type: Number,
        default: 0
    },
    amount:{
        type: Number,
        default: 100
    },
    images: {
        type: String,
        default: ''
    },  //商品图片
    is_recycle: { //是在回收站,0代表不在，1代表在
        type: Number,
        default: 0
    },
    create_time: {   //创建时间
        type: Date,
        default: Date.now()
    },
    update_time: {   //更新时间
        type: Date,
        default: Date.now()
    },
    link_category:{   //文档关联
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }

});

/*goodsSchema.pre('save',function (next) {
    if(this.isNew){
        this.create_time=this.update_time=Data.now();
    }else {
        this.update_time=Data.now();
    }
    next();
})*/

var Goods=mongoose.model('Goods',goodsSchema);

module.exports=Goods;