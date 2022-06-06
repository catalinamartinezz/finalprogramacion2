const usuario = require("../db/usuario");
const comentario= require("../db/comentarios");
const productos = require("../db/producto");
const bcrypt = require ('bcryptjs');
const db = require("../database/models");
const op = db.Sequelize.Op;
const users = db.User;


const usersController = {
     profile: function(req, res) {
         return res.render('profile', {usuario: usuario.listaUsuario, comentarios:comentario.listaComentarios, productos: productos.listaProductos});
     },
     profileEdit: function(req, res) {
         return res.render('profileEdit', {usuario: usuario.listaUsuario});
     },
     register: function(req, res) {
        return res.render('register', /*{usuario: usuario.listaUsuario}*/);
    },
    login: function(req, res) {
        return res.render('login', {usuario: usuario.listaUsuario});
    },
    store:  function(req, res){
        //console.log("entramos")
        let errors = {}
        if(req.body.email == ""){
            errors.message = "El email es obligatorio";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if(req.body.password == ""){
            errors.message = "La contraseña es obligatoria";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if (req.password>=3){
            errors.message = "La contraseña debe contener mas de 3 caracteres"
            return res.render('register')
        }/*else if(req.body.retypePassword == ""){
            errors.message = "La contraseña es obligatoria";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        }else if(req.password != req.retypePassword){
            errors.message = "Las contraseñas no coinciden";
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        }*/else {
            users.findOne({
                where: [{email: req.body.email}]
            })
            .then(function(user){
                if(user != null){
                    errors.message = "El email ya esta registrado por favor elija otro";
                    console.log(errors) // Guardar errors en locals
                    return res.render('register')
                }else {
                    let user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        //avatar: req.file.filename
                    }
                    users.create(user)
                        .then(user => {
                            return res.redirect('/')
                        })
                        .catch(e=>{
                            console.log(e)
                        })
                }
            }
            )
        }
    }
    
    
};
module.exports = usersController;