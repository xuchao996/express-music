var express = require('express');
var router = express.Router();
const UserModel = require("../schemas/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'register' });
});

router.post('/', function (req, res, next) {
  // 接入数据库或者是 redis或者是 session
  let data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }
  // 密码加密
  data.password = global.encrypt(data.password)
  // 数据库查询
  UserModel.find({username: data.username}, function (err, user) {
    if (err) next(err)
    // 创建用户
    if (!user.length) {
      UserModel.create(data, function (err, user) {
        if (err) next(err)
        console.log(user)
      })
      res.json({
        errcode: 0,
        msg: "创建成功，请重新登陆",
      })
    } else {
      res.json({
        errcode: 1,
        msg: "该用户已存在",
      })
    }
  })
})

module.exports = router;
