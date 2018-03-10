/**
 *Create by Zhang on 2018/3/5
 */
var UserModel=require('../../models/user/user');
var crypto=require('crypto');
var formidable=require('formidable');
var fs=require('fs');
var qs=require('qs')

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

//用户注册
userController.register=function (req,res) {
    console.log('注册')
    //console.log(req.cookies.userId)
}
//获取手机验证码
const SMSClient = require('@alicloud/sms-sdk');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIBdz9mBK6Y88n';
const secretAccessKey = 'LurgYTCDFYFSkfyPhY1Bl0ZhDqfDsI';
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey});

userController.getPhoneCode=function (req,res) {
    var phone=req.body.phone;
    var codes=Math.floor(Math.random()*(9999-1000))+1000;//生成随机的四位验证码
    //发送短信
    smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '鲜花网',
        TemplateCode: 'SMS_126885102',
        TemplateParam: '{"code":"6682"}'
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

module.exports=userController;