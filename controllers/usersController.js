const usuario = require("../db/usuario");
const comentario= require("../db/comentarios");
const productos = require("../db/producto");

const usersController = {
     profile: function(req, res) {
         return res.render('profile', {usuario: usuario.listaUsuario, comentarios:comentario.listaComentarios, productos: productos.listaProductos});
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