const productos = require("../db/producto")
const comentarios = require ("../db/comentarios")


const indexController = {
    index: function(req, res) {
        res.render('index', { productos: productos.listaProductos, comentarios:comentarios.listaComentarios});
      }
};
module.exports = indexController;