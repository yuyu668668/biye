/**
 *Create by Zhang on 2018/1/3
 */
var express=require('express');
var goodsController=require('../controller/goods/goods');

var router=express.Router();

//获取商品列表
router.get('/',goodsController.getGoods);

//获取商品总条数
router.get('/getGoodsCount',goodsController.getGoodsCount);

//添加商品
router.post('/add',goodsController.addGoods);

//上传商品图片
router.post('/addimg',goodsController.addImg);

//修改商品信息
router.post('/updateGoods',goodsController.updateGoods);

//删除商品
router.get('/deleteGoods',goodsController.deleteGoods);

//获取回收站商品列表
router.get('/getRecycleGoods',goodsController.getRecycleGoods);

//获取回收站总条数
router.get('/getRecycleCount',goodsController.getRecycleCount);

//删除到回收站
router.get('/deleteToRecycle',goodsController.deleteToRecycle);

//从回收站还原
router.get('/resetGood',goodsController.resetGood);

module.exports=router;