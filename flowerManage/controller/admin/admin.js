/**
 *Create by Zhang on 2017/12/25
 */
var AdminModel=require('../../models/admin/admin');

var adminController={};

//登录
adminController.login=function (req,res) {

/*
    //从数据库中查询
    var aa=AdminModel.findOne({username:username},function (err,docs) {
        if(err){
            console.log(err);
        }else{
            res.send({
                status:1,
                data:docs
            });
        }
    });*/
    var param={
        username:req.body.username,
        password:req.body.password
    }

    AdminModel.findOne(param,function (err,doc) {
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
                req.session.user=doc;
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



module.exports=adminController;