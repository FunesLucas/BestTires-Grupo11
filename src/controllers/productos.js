
const {productosModel} = require("../model");
const db = require("../database/models");
const { Association } = require("sequelize/dist");
const {validationResult} = require ('express-validator');


const productosController = { 

    getProductos : async (req,res,next) => {
        const respuesta = await productosModel.findAll()
        //const respuesta = await productosModel.getProductos()
        res.render ('products', {products : respuesta})
        
    },

    cargaProductos: async  (req,res,next) => {
        const respuesta = await db.marcas.findAll()
        
        res.render ('cargaProduc', {marcas:respuesta});
    },

    crearProductoProcces : async (req,res,next) => {
        const respues = await db.marcas.findAll()
        const resultValidation = validationResult(req)
        
        
        if (resultValidation.errors.length > 0) {
           return res.render('cargaProduc', {
                marcas:respues,
                errors: resultValidation.mapped(),  //<---- mapped ( vuelve el Array de errores a un objeto literal)
                oldData: req.body,
            });
        }
        
        let producToCreate = {
            avatar: req.file.filename,
            ancho: req.body.ancho,
            perfil: req.body.perfil,
            rodado: req.body.rodado,
            marcas_ID: req.body.marcas,
            modelo: req.body.model,
            precio: req.body.precio
        }

        const respuesta = await productosModel.crearProductoProcces(producToCreate)
        res.redirect ('products');
       
        
    },

    detalleProducto: async (req,res,next) => {
        let id = req.params.id
        
        const respuesta = await productosModel.marcas(id)
        
        //const respuesta = await db.productos.findByPk(id)
        res.render ('productID' , {product : respuesta})
        
    },

    editProducto: async (req,res,next) => {
        let id = req.params.id
        const respuesta = await productosModel.editProducto(id)
        const response = await db.marcas.findAll()
        //const respuesta = await db.productos.findByPk(id)
        res.render ('editProduc' , {products : respuesta , marcas : response})
    },

    editProductoProccess: async (req, res, next) => {
        //console.log(req.body)
        //console.log(req.params.id)

        if (req.file !== undefined){
            try {
                let id = req.params.id
                const respuesta = await productosModel.editProductoProccess(id, req.body, req.file.filename)
            } catch (error) {
                console.log(`fallo consulta a la base de datos ${error.message}`)
                return []
            }
            res.redirect("/products")
        }

        let id = req.params.id
        const respuesta = await productosModel.editProducto(id)

        return res.render('editProduc', {
            products:respuesta,
            errors: {
                avatar:{
                    msg: "tienes que subir una imagen"
                }
            }
        })
        
    },

    delete: async (req,res,next) => {
        const id = req.params.id
        const respuesta = await productosModel.delete(id)

        res.redirect('/products')
    }
}

module.exports = productosController;