/**
 *Create by Zhang on 2017/12/24
 */
var mongoose=require('mongoose');

var AdminSchema=new mongoose.Schema({
    username: String,   //用户名
    password:   String, //密码
    create_time:String,
    status: {
        type:Number,
        default:0  //0表示普通管理员 1表示超级管理员
    },
    avatar: {  //头像
        type: String,
        default: './public/images/avatar/default.jpg'
    }

});

var Admin=mongoose.model('Admin',AdminSchema);

module.exports=Admin;



