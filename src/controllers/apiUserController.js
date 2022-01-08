const db = require("../database/models");

const controller = {

    listado: async (req,res) =>{
        try {

            listadoUsuarios = [];
            
            const usuarios = await db.usuarios.findAll();
            
            usuarios.forEach((item) => {
                let lista = {
                    id: item.ID,
                    name: item.nombre,
                    email: item.email,
                    detail: `/api/users/${item.ID}`
                    }
                    return listadoUsuarios.push(lista);
            });

            res.status(200).json({
                count: usuarios.length,
                data: listadoUsuarios,
               });
        } catch (error) {
            res.status(500)
        }
       
    },

    usuarioId: async (req,res) => {
        try {
            const usuarios = await db.usuarios.findByPk(req.params.id);
      
            //Si status es "OK", devolver un json con estos datos:
            res.status(200).json({
              data: {
                id: usuarios.ID,
                name: usuarios.nombre,
                lastName: usuarios.apellido,
                email: usuarios.email,
                image: usuarios.avatar,
              }
            });
      
            //Si da error, devolver un json con las variables definidas como null:
          } catch (error) {
            res
              .status(500)
              .json({ data: null, error: error, detail: null, succes: false });
          }
        }
    }
    


module.exports = controller;