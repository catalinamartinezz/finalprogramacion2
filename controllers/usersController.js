const usuario = require("../db/usuario");

const usersController = {
     profile: function(req, res) {
         return res.render('profile', {usuario: usuario.listaUsuario});
     },
     profileEdit: function(req, res) {
         return res.render('profileEdit');
     },
     register: function(req, res) {
        return res.render('register');
    },
    login: function(req, res) {
        return res.render('login');
    }
};
module.exports = usersController;