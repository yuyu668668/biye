/**
 *Create by Zhang on 2018/3/4
 */

var mongoose=require('mongoose');

var UserSchema=new mongoose.Schema({
    username: String,   //用户名
    password:   String, //密码
    phone: {            //电话
        type: String,
        default:''
    },
    create_time: {     //创建时间
        type:Date,
        default:Date.now()
    },
    avatar: {  //头像
        type: String,
        default: './public/images/avatar/default.jpg'
    }

});

var User=mongoose.model('User',UserSchema);

module.exports=User;



