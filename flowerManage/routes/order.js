/**
 *Create by Zhang on 2018/3/13
 */

var express = require('express');
var router = express.Router();
var orderController=require('../controller/order/order');

//添加订单
router.post('/addOrder',orderController.addOrder);

//添加未付款的订单
router.post('/addNoPayOrder',orderController.addNoPayOrder);

//获取一个用户全部订单
router.get('/getOrder',orderController.getOrder);

//获取所有订单
router.get('/getAllOrder',orderController.getAllOrder);

//获取当天的订单总量
router.post('/orderDayCount',orderController.orderDayCount);

//获取全部订单总数
router.get('/orderCount',orderController.orderCount);

//删除订单
router.post('/deleteOrder',orderController.deleteOrder);

//订单设置为发货状态
router.post('/sendOrder',orderController.sendOrder);



module.exports = router;
