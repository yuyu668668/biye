/**
 *Create by Zhang on 2018/2/25
 */
var express = require('express');
var adsController=require('../controller/ads/ads');

var router = express.Router();

//获取广告列表
router.get('/', adsController.getAds);

//上传广告图片
router.post('/uploadImg',adsController.uploadImg);

//添加广告
router.post('/addAds',adsController.addAds);

//删除广告
router.get('/deleteAds',adsController.deleteAds);

//修改
router.post('/updateAds',adsController.updateAds);

module.exports = router;