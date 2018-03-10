/**
 *Create by Zhang on 2018/3/8
 */
var express = require('express');
var router = express.Router();
var cartController=require('../controller/cart/cart');

//获取购物车信息
router.get('/getCart',cartController.getCart);

//添加到购物车
router.post('/addToCart',cartController.addToCart);

//根据id删除一条购物车数据
router.get('/delGoodsById',cartController.delGoodsById);

module.exports = router;