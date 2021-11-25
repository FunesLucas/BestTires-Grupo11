const {usuarioModel} = require("../model")
const bcryptjs = ("bcrypts");

const db = require("../database/models");
const { response } = require("express");

const usuariosController = {

    getUsuario : async (req,res,next) => {
        let id = 1
        const respuesta = await usuarioModel.getUsuario(id)
        res.send(respuesta);
    },

    profile :async (req, res, next) => {
        let id = req.session.userLogged.id
        const respuesta = await db.Usuarios.findByPk(id)
        res.render ('userProfile', {user: respuesta})
    },

    createUsuario: async (req, res, next) => {
        
       let  userToCreate = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file.filename
       }

        try {
            
            const respuesta = await usuarioModel.createUsuario(userToCreate)
            res.redirect('/')

        } catch (error) {
            console.log(`fallo consulta a la base de datos ${error.message}`)
        return []
        }
        
    },
    detalleUsuario: async (req, res, next) => {

    
        let id = req.params.id
        const respuesta = await db.Usuarios.findByPk(id)
         res.render('detalleUsuario', {user: respuesta});
         
    },


    



    editUsuario: async (req,res,next) => {

        console.log(req.body)
        
        
        try {
            
            let id = req.params.id
        const respuesta = await usuarioModel.editUsuario(id, req.body)
        
        

            //let response = await  usuarioModel.editUsuario(respuesta)
        }catch (error) {
            console.log(`fallo consulta a la base de datos ${error.message}`)
            return []
        }
        res.redirect("/userProfile")
      
    },







    loginProcces: async  (req,res) => {
        let usuarioParaLogear = await usuarioModel.findByField('email',req.body.nameUsers);
        
        if (usuarioParaLogear) {
            //let okPassword = bcryptjs.compareSync(req.body.password, usuarioParaLogear.password)
            if (req.body.password == usuarioParaLogear.password) {
                delete usuarioParaLogear.password;
                req.session.userLogged = usuarioParaLogear;
                //console.log(req.session);   <-- Para mostrar session activa
                return res.redirect('/')
            }
  
            return res.render ('login',{
              errors: {
                  email:{
                      msg: 'Las credenciales son invalidas'
                  }
              }
          })
    
        }
        return res.render ('login',{
          errors: {
              email:{
                  msg: 'No se encuentra registrado'
              }
          }
      })
      //console.log(req.session);
      }

    
}


module.exports = usuariosController


  