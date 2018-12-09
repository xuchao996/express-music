var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

var mongoose = require("mongoose");

var app = express();

// 连接 mongo

mongoose.connect("mongodb://localhost/music",{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// 设置session
app.use(session({
  secret: 'hello_music',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 2}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use('/js', express.static(path.join(__dirname, 'node_modules')));

require("./router")(app)

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

// 密码加密
const crypto = require("crypto");
const encrypt = function (value) {
  const hash = crypto.createHash("md5");
  hash.update(value);
  return hash.digest('hex');
}
global.encrypt = encrypt

module.exports = app;
