const productos = require("../db/producto")
const comentarios = require("../db/comentarios")
const db = require('../database/models');
const op = db.Sequelize.Op;
const products = db.Product;


const indexController = {
  index: function (req, res) {
    products.findAll({
      include: [
        {association: "users"},
        {association: "comments"}
      ],
      order: [
        ['created_at', 'DESC']
      ]
    })
    .then (resultados => {
      return res.render ('index', {productos: resultados})
    })
    .catch(error => console.log(error)) 
  }
};
module.exports = indexController;