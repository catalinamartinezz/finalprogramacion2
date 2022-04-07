const productController = {
    //mostrar listado de productos
    index: function(req, res) {
       return res.render('product');
      }
    
};
module.exports = productController;