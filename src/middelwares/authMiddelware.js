module.exports = (req, res, next) => {
    if (req.session.user != undefined) {
        next();
    }
    return res.redirect('/users/login');
}