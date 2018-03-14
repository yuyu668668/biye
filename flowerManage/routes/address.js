/**
 *Create by Zhang on 2018/3/8
 */
var express = require('express');
var router = express.Router();
var addressController=require('../controller/address/address');

//根据用户id获取用户地址列表
router.get('/getAddress',addressController.getAddress);

//添加地址
router.post('/addAddress',addressController.addAddress);

//修改地址信息
router.post('/updateAddress',addressController.updateAddress);

//删除地址信息
router.post('/deleteAddress',addressController.deleteAddress);

//设置为默认地址
router.post('/setDefaultAddress',addressController.setDefaultAddress);

//获取默认地址
router.get('/getDefaultAddress',addressController.getDefaultAddress);

module.exports = router;
