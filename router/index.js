// router file
const utils = require('./utils.js');
global.utils = utils

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var loginRouter = require('../routes/login');
var signupRouter = require('../routes/register');

function router (app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/login', loginRouter);
    app.use('/register', signupRouter);
}

module.exports = router