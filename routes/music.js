var express = require("express");

var router = express.Router();

const values = {
    title: 'Musics',
    recommend: "Recommend for you",
    new_release: "New release",
    top_of: "top of the song list"
}

router.get('/', global.utils.checkNotLogin);

router.get('/', function (req, res, next) {
    res.render('music', values);
});

module.exports = router;