/**
 *Create by Zhang on 2018/3/8
 */

var CartModel=require('../../models/cart/cart');


var cartController={};

//获取购物车信息
cartController.getCart=function (req,res) {
    var user_id=req.cookies.userId;
    if(user_id){
        CartModel.find({user_id:user_id},function (err,doc) {
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
                        msg: '购物车为空'
                    })
                }
            }
        })
    }
}

//添加到购物车
cartController.addToCart=function (req,res) {
    var userId=req.cookies.userId;
    var params={
        user_id: userId,
        goods_id: req.body.goods_id,
        goodsName: req.body.goodsName,
        goodsImg: req.body.goodsImg,
        goodsPrice: req.body.price,
        goodsNum: req.body.goodsNum
    };
    var cartModel=new CartModel(params);
    if(userId){
        cartModel.save(function (err,doc) {
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

//根据id删除一条购物车数据
cartController.delGoodsById=function (req,res) {
    //console.log(req.query.id)
    var id=req.query.id;
    if(id){
        CartModel.remove({_id:id},function (err,doc) {
            if(err){
                throw err;
            }else{
                if(doc){
                    res.send({
                        status: 1,
                        msg: '删除成功'
                    })
                }else{
                    res.send({
                        status: 0,
                        msg: '删除失败'
                    })
                }
            }
        })
    }
}

module.exports=cartController;