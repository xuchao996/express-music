// router file
const utils = require('./utils.js');
global.utils = utils

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var loginRouter = require('../routes/login');
var signupRouter = require('../routes/register');

var music = require("../routes/music");
var search = require("../routes/search_music");
var play = require("../routes/now_playing")

function router (app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/login', loginRouter);
    app.use('/register', signupRouter);
    app.use('/music', music);
    app.use('/search', search);
    app.use('/play', play);
}

module.exports = router