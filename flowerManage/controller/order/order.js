/**
 *Create by Zhang on 2018/3/13
 */

var OrderModel=require('../../models/order/order');
var dtime=require('time-formater');

var orderController={};

//添加订单
orderController.addOrder=function (req,res) {

    var id=Math.floor(Math.random()*(9999-1000))+1000;//生成随机的四位订单编号

    var user_id=req.cookies.userId;

    var orderInfo=req.body.orderInfo;

    var orderModel=new OrderModel({
        user_id:user_id,
        id :id,
        create_time: dtime().format('YYYY-MM-DD'),
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

//获取一个用户全部订单
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

//获取所有订单
orderController.getAllOrder=function (req,res) {
    OrderModel.find({},function (err,doc) {
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
                    msg: '找不到订单信息'
                })
            }
        }
    })
}

//获取当天订单总数
orderController.orderDayCount=function (req,res) {
    var today=req.body.today;
    if(today){
        OrderModel.count({create_time:today},function (err,doc) {
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

orderController.orderCount=function (req,res) {

    OrderModel.count({},function (err,doc) {
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

module.exports=orderController;