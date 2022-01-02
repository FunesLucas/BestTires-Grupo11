const {usuarioModel} = require("../model")
const bcryptjs = ("bcrypts");
const {validationResult} = require ('express-validator');
const db = require("../database/models");
const { response } = require("express");



const usuariosController = {

    getUsuario: async (req, res, next) => {
        const respuesta = await usuarioModel.getUsuario()
        res.send(respuesta);
    },

    profile: async (req, res, next) => {
        
        let id = req.session.userLogged.ID
        const respuesta = await db.usuarios.findByPk(id)
        
        res.render('userProfile', { user: respuesta })
    },

    createUsuario: async (req, res, next) => {
        
        
        const resultValidation = validationResult(req)
        
        if (resultValidation.errors.length > 0) {
           return res.render('register', {
                errors: resultValidation.mapped(),  //<---- mapped ( vuelve el Array de errores a un objeto literal)
                oldData: req.body,
            });
        }
        
        let usuarioExistente = await usuarioModel.findByField('email', req.body.email)
        if (usuarioExistente) {
            
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body,
            })
        }
        
        
        let userToCreate = {
            avatar: req.file.filename,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password
        }
        
        try {
            
            const respuesta = await usuarioModel.createUsuario(userToCreate)
            res.redirect('/login')
            
        } catch (error) {
            console.log(`fallo consulta a la base de datos ${error.message}`)
            return []
        }
        
        
    },

    detalleUsuario: async (req, res, next) => {
        
        

        let id = req.params.id
        //const respuesta = await db.usuarios.findByPk(id)
        const respuesta = req.session.userLogged
        res.render('detalleUsuario', {user:respuesta  });

    },

    editUsuario: async (req, res, next) => {

        if (req.file !== undefined){
            try {
                let id = req.params.id
                const respuesta = await usuarioModel.editUsuario(id, req.body, req.file.filename)
                req.session.userLogged.avatar = req.file.filename
            } catch (error) {
                console.log(`fallo consulta a la base de datos ${error.message}`)
                return []
            }
            res.redirect("/userProfile")
        }else {
            const respuesta = req.session.userLogged
        return res.render('detalleUsuario', {
            user:respuesta,
            errors: {
                avatar:{
                    msg: "tienes que subir una imagen"
                }
            }
        })
        }

        
        
         
       
    },

    loginProcces: async (req, res) => {
        let usuarioParaLogear = await usuarioModel.findByField('email', req.body.email);
        
        if (usuarioParaLogear) {
            //let okPassword = bcryptjs.compareSync(req.body.password, usuarioParaLogear.password)
            if (req.body.password == usuarioParaLogear.password) {
                delete usuarioParaLogear.password;
                req.session.userLogged = usuarioParaLogear;
                //console.log(req.session);    muestra sessin 

                if (req.body.recordame != undefined) {
                    res.cookie('recordame', usuarioParaLogear.email, { maxAge: 60000 })
                }
                //return res.redirect('/')
                return res.redirect('/')

            }

            return res.render('login', {
                errors: {
                    password: {
                        msg: 'Password incorrecto'
                    }
                }
            })


        } 
        return res.render('login', {
            errors: {
                email: {
                    msg: 'Debe ingresar un correo electronico valido'
                }
            }
        })
           

    },

    logout: (req, res) => {
        req.session.destroy()
        res.clearCookie('recordame')
        //console.log(req.session)  // <-- Para probar si se cerro el login en session.
        return res.redirect ('/')
        ;
    }
}


module.exports = usuariosController


  