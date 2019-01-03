var express = require("express");

var router = express.Router();

router.get('/', global.utils.checkNotLogin);

router.get('/', function (req, res, next) {
    res.render('search', {title: 'Search'});
});

module.exports = router;