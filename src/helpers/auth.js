const helpers = {};

helpers.isAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','No autorizado, favor inicie sesion');
    res.redirect('/');
};

module.exports = helpers;

