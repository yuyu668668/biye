/**
 *Create by Zhang on 2018/3/8
 */
var express = require('express');
var router = express.Router();
var addressController=require('../controller/address/address');

//根据用户id获取用户地址列表
router.get('/getAddress',addressController.getAddress);

module.exports = router;
