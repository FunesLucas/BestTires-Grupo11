const fs = require('fs');
const path = require('path');
//let model = require('../database/products.json')


const productsController = {
    products: (req, res) => {
        res.render('products',{products: model});
    },    
    carrito: (req, res) => {
        res.render ('carrito');
    },   
    cargaProduc: (req, res) => {
        res.render ('cargaProduc'); 
    },
    store: (req, res) => {
        let objeto = {
			
            id: model.length + 1,
			ancho: req.body.detalleProduct,
			perfil: req.body.ProfileProduct,
			rodado: req.body.Rolled,
			marca: req.body.mark,
	     	modelo: req.body.model,
            precio: req.body.priceProduct,
            img: req.file.filename
        }
        model.push(objeto)
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(model,null,4),{encoding:'utf8'})

        res.redirect ('products',{products})
        

    },
    
    editProduc: (req, res) => {
        //let id = req.params.id;
		//let product = model.find(elemento => elemento.id == id)
		res.render ('editProduc'); 
        
    },
    update: (req, res) => {
        let id = req.params.id;
		model.forEach(elemento => {
			if (elemento.id == id){
				elemento.ancho = req.body.detalleProduct;
				elemento.perfil = req.body.ProfileProduct;
				elemento.rodado = req.body.Rolled;
				elemento.marca = req.body.mark;
				elemento.modelo = req.body.model;
                elemento.precio = req.body.priceProduct;
				//elemento.image: ""
			}
		});
		
		
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(model,null,4),{encoding:'utf8'})
        res.render ('products',{products:model});
        
    },

    productID: (req, res) => {
        let id = req.params.id;
		let product = model.find(elemento => elemento.id == id)
		res.render('productID', {product: product});
        
    },
    destroy : (req, res) => {
        const idBuscado = req.params.id
         model = model.filter (item => item.id != idBuscado)
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(model,null,4),{encoding:'utf8'})

        res.render ('products', {products:model});
	
		
	}
}

module.exports= productsController;


