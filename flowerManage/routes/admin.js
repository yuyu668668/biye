/**
 *Create by Zhang on 2017/12/24
 */
var express = require('express');
var adminController=require('../controller/admin/admin');

var router = express.Router();

router.post('/login', adminController.login);

module.exports = router;