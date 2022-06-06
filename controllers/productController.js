const comentario= require("../db/comentarios");
const usuario = require("../db/usuario");
const productos = require("../db/producto")
const db = require('../database/models');
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
        return res.render('searchresults');
    },
    store: function(req,res){

    }
};
module.exports = productController;