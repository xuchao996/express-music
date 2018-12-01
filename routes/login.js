var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/', function (req, res, next) {
  // 接入数据库或者是 redis或者是 session
})

module.exports = router;
