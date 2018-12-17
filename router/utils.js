// 未登陆要跳转到登录页
function checkNotLogin (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next()
}

// 如果已经登陆了，就不能跳到登陆页面，除非推出登录
function checkLogin (req, res, next) {
    if (req.session.user) {
        return res.redirect('back');
    }
    next();
}

module.exports.checkLogin = checkLogin;
module.exports.checkNotLogin = checkNotLogin;
