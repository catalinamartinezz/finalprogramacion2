const productController = {
    //mostrar listado de productos
    index: function(req, res) {
       return res.render('product');
    },
    productAdd: function(req, res) {
        return res.render('productAdd');
    },
    searchResults: function(req, res) {
        return res.render('searchresults');
    }


    
};
module.exports = productController;