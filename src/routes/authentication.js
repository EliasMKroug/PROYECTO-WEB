const express = require('express')
const router = express.Router()
const passport = require('passport')

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')

/* ACTUALIZACION DE RUTA SIGNUP */
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
})

/* AUTENTICACION DE RUTA SIGNUP*/
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

/* ACTUALIZACION RUTA DE SIGNIN*/
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})

/* AUTENTICACION DE RUTA SIGNIN */
router.post('/signin', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

/* ACTUALIZACION RUTA DE PROFILE*/
router.get('/profile',isLoggedIn, (req, res) => {
    res.render('profile')
})

/* ACTUALIZACION RUTA DE LOGOUT TERMINA CON LA RUTA DEL USUARIO EXISTENTE*/
router.get('/logout', isLoggedIn, async (req, res) => {
    req.logOut(req.user, err => {
        if(err) {
            return next(err)
        }
    })
    res.redirect('/signin')
})

module.exports = router