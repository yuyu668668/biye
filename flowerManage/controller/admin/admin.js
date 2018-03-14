/**
 *Create by Zhang on 2017/12/25
 */
var AdminModel=require('../../models/admin/admin');
var crypto=require('crypto');
var formidable=require('formidable');
var fs=require('fs');

var adminController={};

//密码加密
function encryption(password){
    return Md5(Md5(password) + Md5('abcd'));
}
function Md5(password){
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
}

//登录
adminController.login=function (req,res) {

     var username=req.body.username;
     var password=req.body.password;

    var newPassword=encryption(password);

    AdminModel.findOne({username:username,password:newPassword},function (err,doc) {
        if(err){
            res.send({
                status:0,
                msg:err.message
            })
        }else{
            if(!doc){
                res.send({
                    status:0,
                    msg:'用户名或密码错误'
                })
            }else{
                //保存session
                req.session.admin_id=doc._id;
                res.send({
                    status:1,
                    data:{
                        username:doc.username
                    }
                })
            }
        }
    })

}

//注册
adminController.register=function (req,res) {
    //console.log('支持的hash算法'+crypto.getHashes())
       var username= req.body.username;
       var password= req.body.password;

    //console.log(register)
    AdminModel.findOne({username:username},function (err,doc) {
        if(err){
            res.send({
                status: 0,
                msg: err.message
            })
        }
        if(doc){
            res.send({
                status: 1,
                msg: '该用户名已存在，请重新输入'
            })
        }else{
            //对密码进行加密
            var newPassword=encryption(password);
            //console.log(newPassword)

            var registerModel=new AdminModel({username:username,password:newPassword});
            registerModel.save(function (err) {
                if(err){
                    res.send({
                        status: 0,
                        msg: err.message
                    })
                }else{
                    res.send({
                        status: 2,
                        msg: '注册成功'
                    })
                }
            })
        }
    })
}

//获取用户登录信息
adminController.getAdminInfo=function (req,res) {
    var id=req.session.admin_id;
    if(!id){
        res.send({
            status: 0,
            msg: '获取管理员信息失败'
        })
        return;
    }
    AdminModel.findOne({_id:id},function (err,doc) {
        if(err){
            res.send({
                status: 0,
                msg: '获取管理员信息失败'
            })
        }else {
            res.send({
                status: 1,
                msg: doc
            })
        }
    })
}

//退出登录
adminController.signOut=function (req,res) {
    try{
        delete req.session.admin_id;
        res.send({
            status: 1,
            msg: '退出成功'
        })
    }catch (err){
        res.send({
            status: 0,
            msg: '退出失败'
        })
    }
}

//上传头像
adminController.uploadAvatar=function (req,res) {
    const form=formidable.IncomingForm();
    form.uploadDir='./public/images/avatar/';  //上传图片的保存位置
    form.parse(req,function (err,fields,files) {
        if(err){
            throw err;
        }else{
            var fullName=(new Date().getTime() + Math.ceil(Math.random()*100)).toString(16)+files.file.name;
            var repath='./public/images/avatar/'+fullName;
            fs.rename(files.file.path,repath);
            res.send({
                status:1,
                result: repath
            })
        }
    })
}

//修改个人头像
adminController.updateAvatar=function (req,res) {
    var id=req.session.admin_id;
    var avatar=req.body.avatar;
    if(!id){
        res.send({
            status: 0,
            msg: '修改头像失败'
        })
        return;
    }

    AdminModel.update({_id: id},{$set:{avatar: avatar}},function (err) {
        if(err){
            res.send({
                status: 0,
                msg: '修改头像失败'
            })
        }else{
            res.send({
                status: 1,
                msg: '修改头像成功'
            })
        }
    })

}

//修改密码
adminController.changePass=function (req,res) {
    var id=req.session.admin_id;

    if(!id){
        res.send({
            status: 0,
            msg: '修改密码错误'
        })
        return;
    }

    var password=req.body.password;

    var changePass=encryption(password);

    AdminModel.update({_id: id},{$set:{password: changePass}},function (err) {
        if(err){
            res.send({
                status: 0,
                msg: '修改密码失败'
            })
        }else{
            res.send({
                status: 1,
                msg: '修改密码成功'
            })
        }
    })

}

//检查是否是超级管理员
adminController.isSuperAdmin=function (req,res) {
    var id=req.session.admin_id;

    AdminModel.findOne({_id:id},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                if(doc.status==1){
                    res.send({
                        status: 1,
                        msg: '是超级管理员'
                    })
                }else{
                    res.send({
                        status: 0,
                        msg: '不是超级管理员，没有权限'
                    })
                }
            }
        }
    })
}

//获取所有管理员
adminController.getAllAdmin=function (req,res) {
    AdminModel.find({status: 0},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                console.log(doc)
             res.send({
                 status: 1,
                 msg: doc
             })
            }else{
                res.send({
                    status: 0,
                    msg: '管理员列表为空'
                })
            }
        }
    })
}

//删除管理员
adminController.deleteAdmin=function (req,res) {
    var _id=req.body._id;
    if(_id){
        AdminModel.remove({_id:_id},function (err) {
            if(err){
                throw err;
            }else{
                res.send({
                    status: 1,
                    msg: '删除成功'
                })
            }
        })
    }
}

module.exports=adminController;