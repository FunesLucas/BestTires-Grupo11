const {usuarioModel} = require("../model")

async function userLoggedmidd(req, res, next) {

    // ++++ Ejemplo sin  cookies  +++++++

    // res.locals.isLogged = false ;

    // if(req.session.userLogged){
    //     res.locals.isLogged = true ;

    //     res.locals.userLogged = req.session.userLogged;
    // }
    try {
        res.locals.isLogged = false;

        let emailCookie = req.cookies.recordame;
        if (emailCookie) {
            let userCookie = await usuarioModel.findByField('email', emailCookie);

            if (userCookie) {
                req.session.userLogged = userCookie;
            }
        }

        if (req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }
        next();

    } catch (error) {
        
        res.send(error)
    }


}

module.exports = userLoggedmidd;