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
  UserModel.find({username: data.username}, function (err, user) {
    if (err) next(err)
    // 创建用户
    if (!user) {
      UserModel.create(data, function (err, user) {
        if (err) next(err)
        console.log(user)
      })
    } else {
      res.send(data.username + "is existed");
    }
  })
})

module.exports = router;
