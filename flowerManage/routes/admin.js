/**
 *Create by Zhang on 2017/12/24
 */
var express = require('express');
var adminController=require('../controller/admin/admin');

var router = express.Router();

//登录
router.post('/login', adminController.login);

//注册
router.post('/register',adminController.register);

//获取登录的信息
router.get('/getAdminInfo',adminController.getAdminInfo);

//退出登录
router.get('/signOut',adminController.signOut);

//上传头像
router.post('/uploadAvatar',adminController.uploadAvatar);

//修改头像
router.post('/updateAvatar',adminController.updateAvatar);

//修改密码
router.post('/changePass',adminController.changePass);

//检查是否是超级及管理员
router.get('/isSuperAdmin',adminController.isSuperAdmin);

//获取所有管理员
router.get('/getAllAdmin',adminController.getAllAdmin);

//删除管理员
router.post('/deleteAdmin',adminController.deleteAdmin);

module.exports = router;