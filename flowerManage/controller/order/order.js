/**
 *Create by Zhang on 2018/3/13
 */

var OrderModel=require('../../models/order/order');
var dtime=require('time-formater');
var GoodsModel=require('../../models/goods/goods');

var orderController={};

//添加订单,已付款
orderController.addOrder=function (req,res) {

    var id=Math.floor(Math.random()*(9999-1000))+1000;//生成随机的四位订单编号

    var user_id=req.cookies.userId;

    var orderInfo=req.body.orderInfo;
    var address=req.body.address;

    var orderModel=new OrderModel({
        user_id:user_id,
        id :id,
        address:address,
        is_pay: true,
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

    //设置销量+1和库存-1
    orderInfo.forEach(function (item) {
        //console.log(item)
        GoodsModel.update({_id: item.goods_id},{$inc:{sell:1,amount:-1}},function (err) {
            if(err){
                throw err;
            }
        })
    })

}

//添加订单，未付款
orderController.addNoPayOrder=function (req,res) {
    var id=Math.floor(Math.random()*(9999-1000))+1000;//生成随机的四位订单编号

    var user_id=req.cookies.userId;

    var orderInfo=req.body.orderInfo;
    var address=req.body.address;

    var orderModel=new OrderModel({
        user_id:user_id,
        id :id,
        address:address,
        is_pay: false,
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
                msg: '创建未付款订单成功'
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

//获取订单总数
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

//删除订单
orderController.deleteOrder=function (req,res) {
    var _id=req.body._id;
    if(_id){
        OrderModel.remove({_id:_id},function (err) {
            if(err){
                throw err;
            }else{
                res.send({
                    status: 1,
                    msg: '删除成功'
                })
            }
        })
    }else{
        res.send({
            status: 0,
            msg: '删除失败'
        })
    }
}

//订单设置为发货状态
orderController.sendOrder=function (req,res) {
    var _id=req.body._id;
    OrderModel.update({_id:_id},{$set:{is_send:true}},function (err) {
        if(err){
            throw err;
        }else{
            res.send({
                status: 1,
                msg: '已修改为发货状态'
            })
        }
    })
}

module.exports=orderController;