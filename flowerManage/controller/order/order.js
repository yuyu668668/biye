/**
 *Create by Zhang on 2018/3/13
 */

var OrderModel=require('../../models/order/order');


var orderController={};

//添加订单
orderController.addOrder=function (req,res) {

    var id=Math.floor(Math.random()*(9999-1000))+1000;//生成随机的四位订单编号

    var user_id=req.cookies.userId;

    var orderInfo=req.body.orderInfo;

    var orderModel=new OrderModel({
        user_id:user_id,
        id :id,
        goodsInfo:orderInfo
    })

    //console.log(orderModel)
    orderModel.save(function (err) {
        if(err){
            throw err;
        }else{
            res.send({
                status: 1,
                msg: '创建订单成功'
            })
        }
    })

}

//获取全部订单
orderController.getOrder=function (req,res) {
    var user_id=req.cookies.userId;

    OrderModel.find({user_id:user_id},function (err,doc) {
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
                    msg: '查不到订单信息'
                })
            }
        }
    })
}

module.exports=orderController;