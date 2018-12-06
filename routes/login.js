var express = require('express');
var router = express.Router();

var UserModel = require("../schemas/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/', function (req, res, next) {
  // 接入数据库或者是 redis或者是 session
  let data = {
    username: req.body.username,
    password: req.body.password
  }
  // 密码加密
  const crypto = require("crypto");

  const hash = crypto.createHash("md5");
  
  hash.update(data.password);
  // 不可逆
  data.password = hash.digest('hex');
  // 数据库查询
  UserModel.find({username: data.username}, function (err, user) {
    if (err) next(err)
    // 创建用户
    if (!user.length) {
      UserModel.create(data, function (err, user) {
        if (err) next(err)
        console.log(user)
      })
      res.send(data.username + " is created")
    } else {
      res.send(data.username + "is existed");
    }
  })
})

module.exports = router;
