// router file

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var loginRouter = require('../routes/login');
var signupRouter = require('../routes/signup');


function router (app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);
}

module.exports = router