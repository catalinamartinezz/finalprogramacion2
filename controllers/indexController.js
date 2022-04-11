const productos = require("../db/producto")


const indexController = {
    index: function(req, res) {
        res.render('index', { productos: productos.listaProductos });
      }
};
module.exports = indexController;