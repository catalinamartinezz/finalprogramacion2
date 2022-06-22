const comentario= require("../db/comentarios");
const usuario = require("../db/usuario");
const productos = require("../db/producto")
const db = require('../database/models');
const products = db.Product;
let multer = require('multer');
const req = require("express/lib/request");

const productController = {
    //mostrar listado de productos
    index: function(req, res) {
        db.Product.findAll()
            .then(data => {
                return res.render('product', { products: data}, {comments: data})
            })
            .catch(error => {
                console.log(error);
            })
    },
    productAdd: function(req, res) {
        return res.render('productAdd',{
            usuario: usuario.listaUsuario
        });
    },
    searchResults: function(req, res) {
        let buscarProductos = req.query.search;
        let errors = {}
        if(buscarProductos == "" || buscarProductos == undefined){
            errors.message = "No puede estar vacio";
            res.locals.errors = errors;
            return res.render('searchResults', {resultado: errors});
        } else{
            products.findAll({
                where: {
                    [Op.or]: [
                        {name_product: {[Op.like]: "%" + buscarProductos + "%",}},
                        {description: {[Op.like]: "%" + buscarProductos + "%",}},
                        {user: {[Op.like]: "%" + buscarProductos + "%",}},
                    ]
                }, 
                order: [
                    ['name_product', 'ASC']
                ], 
                include: [
                    {association: 'comments'},
                    {association: 'users'},
                ]
            })
            .then(function(resultado){
                if(resultado == ""){
                    errors.message = "No se encontraron resultados";
                    res.locals.errors = errors;
                    return res.render('searchResults', {resultado: errors})
                } else{
                    return res.render('searchResults', {resultado: resultado})
                }
            })
            .catch(e => console.log(e))
        }
        
    },
    store: function(req,res){
        let errors = {};
        if(req.body.product == ""){
            errors.message = "Por favor ingrese un producto";
            res.locals.errors = errors;
            return res.render('productAdd')
        } else if (req.file == undefined){
            errors.message = "La imagen del producto es obligatoria";
            res.locals.errors = errors;
            return res.render('productAdd')
        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'
        ){
            errors.message = "Ingrese una imagen de tipo png,jpg o jpeg";
            res.locals.errors = errors;
            return res.render('productAdd')
        }else if (req.body.description ==""){
            errors.message = "ingrese una descripcion del producto";
            res.locals.errors = errors;
            return res.render('productAdd')
        } else {
            let producto = {
                id_user: req.session.users.id_user,
                image_product: req.file.filename,
                name_product: req.body.product,
                description: req.body.description,
            }
            products.create(producto)
                return res.redirect('/')
        }
    }
};
module.exports = productController;