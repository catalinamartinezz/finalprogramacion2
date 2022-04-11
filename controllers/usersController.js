const usuario = require("../db/usuario");

const usersController = {
     profile: function(req, res) {
         return res.render('profile', {usuario: usuario.listaUsuario});
     },
     profileEdit: function(req, res) {
         return res.render('profileEdit', {usuario: usuario.listaUsuario});
     },
     register: function(req, res) {
        return res.render('register', {usuario: usuario.listaUsuario});
    },
    login: function(req, res) {
        return res.render('login', {usuario: usuario.listaUsuario});
    }
};
module.exports = usersController;