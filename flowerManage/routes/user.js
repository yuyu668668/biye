var express = require('express');
var router = express.Router();
var userController=require('../controller/user/user');
/* GET users listing. */

//用户的登录
router.post('/login',userController.login);

//用户注册
router.post('/register',userController.register);

//退出登录
router.post('/loginOut',userController.loginOut);

//检查是否已经登录
router.get('/checkLogin',userController.checkLogin);

//获取手机验证码
router.post('/getPhoneCode',userController.getPhoneCode);

//获取所有用户
router.get('/getUser',userController.getUser);

//删除用户
router.post('/deleteUser',userController.deleteUser);

//获取当天用户注册数量
router.post('/userDayCount',userController.userDayCount);

//获取用户总数
router.get('/userCount',userController.userCount);

//获取当前登录用户的信息
router.post('/getCurrentUser',userController.getCurrentUser);

//修改用户信息
router.post('/updateUser',userController.updateUser);

module.exports = router;
