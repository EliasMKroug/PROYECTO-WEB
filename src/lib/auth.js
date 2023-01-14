/* EXPORTA OBJETOS Y TIENEN METODOS PARA SABER SI EL USUARIO ESTA LOGUEADO O NO */
module.exports = {

    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        return  res.redirect('/signin');
    },

    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/profile')
    }
}

