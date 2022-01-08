const db = require("../database/models");

const controller = {

    listado: async (req,res) =>{
        try {

            listadoProductos = [];
            
            const productos = await db.productos.findAll({
                include: [{ association: 'marca' }]
              });
            
            productos.forEach((item) => {
                let lista = {
                    id: item.ID,
                    modelo: item.modelo,
                    marca: item.marca.nombre,
                    detail: `/api/products/${item.ID}`
                    }
                    return listadoProductos.push(lista);
            });

            res.status(200).json({
                count: productos.length,
                data: listadoProductos,
               });
        } catch (error) {
            res.status(500)
        }
       
    },

    productoiD: async (req,res) => {
        try {
            const productos = await db.productos.findByPk(req.params.id ,{
                include: [{ association: 'marca' }]
              });
      
            //Si status es "OK", devolver un json con estos datos:
            res.status(200).json({
              data: {
                id: productos.ID,
                modelo: productos.modelo,
                marca: productos.marca.nombre,
                ancho: productos.ancho,
                perfil: productos.perfil,
                rodado: productos.rodado,
                precio: productos.precio,
                image: "localhost:3000/img/"+productos.avatar,
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