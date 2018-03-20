/**
 *Create by Zhang on 2018/3/19
 */

var express = require('express');
var collectController=require('../controller/collect/collect');

var router = express.Router();

//添加收藏
router.post('/addCollect',collectController.addCollect);

//获取用户收藏列表
router.get('/getCollect',collectController.getCollect);

//删除用户收藏信息
router.post('/deleteCollect',collectController.deleteCollect);

//获取所有收藏的商品
router.get('/getAllCollect',collectController.getAllCollect);

module.exports = router;