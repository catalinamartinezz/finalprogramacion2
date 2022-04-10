const productController = {
    //mostrar listado de productos
    index: function(req, res) {
       return res.render('product');
    },
    productAdd: function(req, res) {
        return res.render('productAdd');
    },
    profile: function(req, res) {
        return res.render('profile');
    },
    profileEdit: function(req, res) {
        return res.render('profileEdit');
    },

    
};
module.exports = productController;