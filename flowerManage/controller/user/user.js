/**
 *Create by Zhang on 2018/3/5
 */
var UserModel=require('../../models/user/user');
var crypto=require('crypto');
var formidable=require('formidable');
var fs=require('fs');
var qs=require('qs')
var dtime=require('time-formater');

var userController={};

//密码加密
function encryption(password){
    return Md5(Md5(password) + Md5('abcd'));
}
function Md5(password){
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
}

//用户登录
userController.login=function (req,res) {
    //console.log('登录')
    var username=req.body.username;
    var pwd=req.body.password;
    //console.log(username+pwd)
    var password=encryption(pwd);

    UserModel.findOne({username:username,password:password},function (err,doc) {
        if(err){
            res.send({
                status: 0,
                msg: err.message
            })
        }else{
            if(!doc){
               UserModel.findOne({phone:username,password:password},function (errs,user) {
                   if(errs){
                       res.send({
                           status: 0,
                           msg: errs.message
                       })
                   }else{
                       if(!user){
                           res.send({
                               status: 0,
                               msg: '用户名或密码错误'
                           })
                       }else{
                           res.cookie('userId',user._id,{maxAge:1000*60*60});//保存cookie
                           //req.session.user=user;  //保存session
                           res.send({
                               status: 1,
                               msg: user
                           })
                       }
                   }
               })
            }else{
                res.cookie('userId',doc._id,{maxAge:1000*60*60});//设置一小时cookie过期
                //req.session.user=doc;
                res.send({
                    status: 1,
                    msg: doc
                })
            }
            }
        })

}


//获取手机验证码
const SMSClient = require('@alicloud/sms-sdk');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIBdz9mBK6Y88n';
const secretAccessKey = 'LurgYTCDFYFSkfyPhY1Bl0ZhDqfDsI';
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey});

var codes=Math.floor(Math.random()*(9999-1000))+1000;//生成随机的四位验证码

userController.getPhoneCode=function (req,res) {
    var phone=req.body.phone;

    //发送短信
    smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '鲜花网',
        TemplateCode: 'SMS_126885102',
        TemplateParam: '{"code":"2432"}'
    }).then(function (response) {
        let {Code}=response
        if (Code === 'OK') {
            //处理返回参数
            console.log(response)
        }
    }, function (err) {
        console.log(err)
    })

}

//用户注册
userController.register=function (req,res) {

    var code=req.body.params.code;//手机验证码
    var username=req.body.params.username;
    var psw=req.body.params.password;
    var password=encryption(psw);
    var phone=req.body.params.phone;
    //console.log(username)
    if(code!=='2432'){
        res.send({
            status: 3,
            msg:'验证码错误'
        })
        return;
    }
    UserModel.findOne({$or:[{username:username},{phone:phone}]},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                res.send({
                    status: 0,
                    msg:'该用户名或手机号已注册'
                })
            }else{
                var userModel=new UserModel({username:username,password:password,phone:phone,create_time:dtime().format('YYYY-MM-DD')});
                userModel.save(function (errs) {
                    if(errs){
                        throw errs;
                    }else{
                        res.send({
                            status: 1,
                            msg: '注册成功'
                        })
                    }
                })
            }
        }
    })


}

//退出登录
userController.loginOut=function (req,res) {
    try{
        if(req.cookies.userId){
            res.clearCookie('userId');//删除cookie

            res.send({
                status: 1,
                msg:'退出成功'
            })
        }else{
            res.send({
                status: 0,
                msg: '当前未登录'
            })
        }

    }catch(err){
        res.send({
            status: 0,
            msg: err
        })
    }
}

//检查用户是否已登录
userController.checkLogin=function (req,res) {
    if(req.cookies.userId){
        var id=req.cookies.userId;//获取前端的cookie
        UserModel.findById(id,function (err,doc) {
            if(err){
                throw err;
            }else{
                if(doc){
                    res.send({
                        status: 1,
                        msg: doc
                    })
                }else{
                    res.send({
                        status: 0,
                        msg: '获取用户信息失败'
                    })
                }
            }
        })
    }else{
        res.send({
            status: 0,
            msg: '当前未登录'
        })
    }
}

//获取所有用户
userController.getUser=function (req,res) {
    UserModel.find({},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                res.send({
                    status: 1,
                    msg: doc
                })
            }else{
                res.send({
                    status: 0,
                    msg: '用户列表为空'
                })
            }
        }
    })
}

//删除用户
var AddressModel=require('../../models/address/address');
var CartModel=require('../../models/cart/cart');
var OrderModel=require('../../models/order/order');
userController.deleteUser=function (req,res) {
    var _id=req.body._id;
    //删除该用户下的地址信息
    AddressModel.find({user_id:_id},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                AddressModel.remove({user_id:_id},function (errs) {
                    if(errs){
                        throw errs;
                    }
                })
            }
        }
    })

    //删除该用户下的购物车信息
    CartModel.find({user_id:_id},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                CartModel.remove({user_id:_id},function (errs) {
                    if(errs){
                        throw errs;
                    }
                })
            }
        }
    })

    //删除该用户下的订单信息
    OrderModel.find({user_id:_id},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                OrderModel.remove({user_id:_id},function (errs) {
                    if(errs){
                        throw errs;
                    }
                })
            }
        }
    })

    //删除该用户
    UserModel.remove({_id:_id},function (err) {
        if(err){
            throw err;
        }else{
            res.send({
                status: 1,
                msg:'删除用户成功'
            })
        }
    })

}

//获取当天用户注册数
userController.userDayCount=function (req,res) {
    var today=req.body.today;
    if(today){
        UserModel.count({create_time:today},function (err,doc) {
            if(err){
                throw err;
            }else{
                res.send({
                    status: 1,
                    msg: doc
                })
            }
        })
    }
}

//获取用户总数
userController.userCount=function (req,res) {
    UserModel.count({},function (err,doc) {
        if(err){
            throw err;
        }else{
            res.send({
                status: 1,
                msg: doc
            })
        }
    })
}

module.exports=userController;