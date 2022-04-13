const comentario= require("../db/comentarios");
const usuario = require("../db/usuario");
const productos = require("../db/producto")

const productController = {
    //mostrar listado de productos
    index: function(req, res) {
       return res.render('product', {comentarios:comentario.listaComentarios, productos: productos.listaProductos});
    },
    productAdd: function(req, res) {
        return res.render('productAdd',{usuario: usuario.listaUsuario});
    },
    searchResults: function(req, res) {
        return res.render('searchresults');
    }


    
};
module.exports = productController;