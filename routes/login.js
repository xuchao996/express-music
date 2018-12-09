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
  data.password = global.encrypt(data.password)
  // 数据库查询
  UserModel.find({username: data.username}, function (err, user) {
    if (err) next(err)
    // 创建用户
    console.log(user)
    if (user[0].password === data.password) {
      req.session.user = data.username
      res.status(200).json({
        errcode: 0,
        msg: '登陆成功！',
        user: req.session.user
      })
    } else {
      res.status(200).json({
        errcode: 1,
        msg: '密码或账号出错，请重新登陆！'
      })

    }
    // res.json(data.username + "is existed");
  })
})

module.exports = router;
