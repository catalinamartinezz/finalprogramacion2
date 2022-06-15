const productos = require("../db/producto")
const comentarios = require("../db/comentarios")
const db = require('../database/models');
const op = db.Sequelize.Op;
const products = db.Product;


const indexController = {
  index: function (req, res) {
   /*products.findAll({
      order: [
        ['created_at', 'DESC']
      ]
    })*/
    res.render('index', { productos: productos.listaProductos, comentarios:comentarios.listaComentarios});
  }
};
module.exports = indexController;