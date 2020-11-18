//EXPORTAMOS ACCIONES
module.exports = {
    //ACCION CUANDO ESTA LOGUEADO
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    //ACCION CUANDO NO ESTA LOGUEADO
    isNotLoggedIn (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    }
};