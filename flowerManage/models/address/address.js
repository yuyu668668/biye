/**
 *Create by Zhang on 2018/3/8
 */

var mongoose=require('mongoose');

var AddressSchema=new mongoose.Schema({
    user_id: String,  //用户_id
    id: Number,     //编号
    name: String,   //收货人姓名
    tel: String ,   //收货人电话
    address: String, //收货人地址
    is_default:{    //是否设置为默认地址
        type:Boolean,
        default: false
    }

});

var Address=mongoose.model('Address',AddressSchema);

module.exports=Address;



