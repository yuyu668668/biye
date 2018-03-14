var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var session = require('express-session');

var index = require('./routes/index');
var user = require('./routes/user');
var admin =require('./routes/admin');
var category=require('./routes/category');
var goods=require('./routes/goods');
var ads=require('./routes/ads');
var address=require('./routes/address');
var cart=require('./routes/cart');
var order=require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24*60 * 60 * 1000},  //设置maxAge是1天，即1天后session和相应的cookie失效过期
    secret: 'abcdef'
}));

app.use('/', index);
app.use('/user', user);
app.use('/admin',admin);
app.use('/category',category);
app.use('/goods',goods);
app.use('/ads',ads);
app.use('/address',address);
app.use('/cart',cart);
app.use('/order',order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//连接数据库
mongoose.connect('mongodb://localhost:27017/flower',function (err) {
    if(err){
      console.log('连接数据库失败');
    }else {
      console.log('连接数据库成功');
    }
});
module.exports = app;
