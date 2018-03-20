/**
 *Create by Zhang on 2018/3/19
 */
var CollectModel=require('../../models/collect/collect');
var GoodsModel=require('../../models/goods/goods');

var collectController={};

//添加收藏
collectController.addCollect=function (req,res) {
    var user_id=req.cookies.userId;
    var goods_id=req.body.goods_id;
    //console.log('aa'+goods_id)
    if(user_id){
        var collectModel=new CollectModel({
            goods_id: goods_id,
            user_id: user_id
        });
        collectModel.save(function (err) {
            if(err){
                throw err;
            }else{
                res.send({
                    status: 1,
                    msg: '添加成功'
                })
            }
        })

    }else{
        res.send({
            status: 0,
            msg: '未登录'
        })
    }

}

//获取用户收藏列表
collectController.getCollect=function (req,res) {
    var user_id=req.cookies.userId;
    if(user_id){
        CollectModel.find({user_id:user_id}).populate('goods_id').exec(function (err,doc) {
            if(err){
                throw err;
            }else{
                if(doc.length>0){
                    res.send({
                        status: 1,
                        msg: doc
                    })
                }else {
                    res.send({
                        status: 0,
                        msg: '该用户没有收藏信息'
                    })
                }
            }
        })
    }
}

//删除用户收藏
collectController.deleteCollect=function (req,res) {
    var _id=req.body._id;
    if(_id){
        CollectModel.remove({_id:_id},function (err) {
            if(err){
                throw err;
            }else{
                res.send({
                    status: 1,
                    msg: '删除用户收藏成功'
                })
            }
        })
    }
}

//获取所有收藏信息
collectController.getAllCollect=function (req,res) {
    CollectModel.find({}).populate('goods_id').exec(function (err,doc) {
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
                    msg: '收藏信息为空'
                })
            }
        }
    })
}

module.exports=collectController;