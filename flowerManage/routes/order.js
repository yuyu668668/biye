/**
 *Create by Zhang on 2018/3/13
 */

var express = require('express');
var router = express.Router();
var orderController=require('../controller/order/order');

//添加订单
router.post('/addOrder',orderController.addOrder);

//获取全部订单
router.get('/getOrder',orderController.getOrder);

module.exports = router;
