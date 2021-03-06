//FUNCIONA JUNTO A /lib/passport
//==========IMPORTAMOS MODULOS Y DEMAS==========
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

//CUANDO EL USUARIO SE LOGUEA
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));

//CUANDO EL USUARIO SE REGISTRA
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin',isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

//IR A PERFIL
router.get('/profile', isLoggedIn,(req, res) => {
    res.render('profile')
});

//DESLOGUEARSE
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

//EXPORT
module.exports=router;