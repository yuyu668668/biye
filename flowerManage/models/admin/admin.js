/**
 *Create by Zhang on 2017/12/24
 */
var mongoose=require('mongoose');

var AdminSchema=new mongoose.Schema({
    id: Number,
    username: String,
    password:   String,
    create_time: {
        type:Date,
        default:Date.now()
    },
  /*  status: {
        type:Number,
        default:1  //1表示普通管理员 2表示超级管理员
    }*/

});

var Admin=mongoose.model('Admin',AdminSchema);

module.exports=Admin;



