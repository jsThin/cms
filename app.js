var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejs = require("ejs");
const session = require("express-session");
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');
const config = require("./config/config");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//配置模板引擎
app.engine("html",ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

//配置第三方中间件获取post提交的数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置session的中间件
app.use(session({
  secret: 'this is session', //服务器端生成 session 的签名
  name:"jsthin", //修改session对应cookie的名称
  resave: false, //强制保存 session 即使它并没有变化
  saveUninitialized: true, //强制将未初始化的 session 存储
  cookie: { 
      maxAge:1000*60*30,
      secure: false  // true 表示只有https协议才能访问cookie  
  },
  rolling:true  //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))

//绑定全局模板变量
app.locals.adminPath=config.adminPath;

app.use('/', indexRouter);
app.use("/"+config.adminPath, adminRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
