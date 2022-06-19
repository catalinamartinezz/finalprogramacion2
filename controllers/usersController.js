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
        return res.render('register', /{usuario: usuario.listaUsuario}/);
    },
    login: function(req, res) {
        return res.render('login', {usuario: usuario.listaUsuario});

    },
    create:function(req,res){
        if (req.session.users){
            return res.redirect('/')
        }else{
            return res.render('register')
        }
    },
    store:  function(req, res){
        //console.log("entramos")
        let errors = {}
        
        if(req.body.email == ""){
            errors.message = "El email es obligatorio";
            res.locals.errors = errors
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if(req.body.password == ""){
            errors.message = "La contraseña es obligatoria";
            res.locals.errors = errors
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if (req.body.password.length < 3){
            errors.message = "La contraseña debe contener mas de 3 caracteres"
            res.locals.errors = errors
            console.log(res.locals.errors)
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
                        username: req.body.user,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        avatar: req.file.filename
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
    }, 
    login:  function(req,res){
        users.findOne({
            where: [{email: req.body.email}]
        })
        .then(function(user){
            let errors ={};
            if(user == null){
                errors.message = "El email no esta registrado, por favor registrate. ";
                console.log(errors)
                res.locals.errors = errors
                return res.render('login')
            }else if(bcrypt.compareSync(req.body.password, user.password) == false){
                errors.message = "La contraseña es incorrecta, intentelo nuevamente. "
                res.locals.errors = errors
                return res.render('login')
            }else {
                req.session.user = user
                if(req.body.rememberme != undefined){
                    res.cookie('userId', user.id_user, { maxAge: 1000 * 60 * 5})
                }
                return res.redirect('/')
            }
        })
        .catch(error => console.log(error))

    },
    signIn: function (req,res){
        res.render ('login')
    },
    logout: function(req,res){
        req.session.destroy();
        if (req.cookies.userId !== undefined){
            res.clearCookie('userId')
        }
        return res.redirect('/')
    },
    edit: function(req,res){
        let userId = req.params.id_user;
        //controlar que solo yo puedo cambiar los datos 
        users.findByPk(userId)
            .then(function(user){
                return res.render('profileEdit', {user: user})
            })
            .catch(e =>{
                console.log(e)
            }) 
    },
    update:function(req,res){
        let user = {
            name: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        }
        if(req.file == undefined){
            user.avatar = 'avatar-1654086189266.jpg'
        }else {
            user.avatar = req.file.filename
        }
        //envio a la base de datos 
        users.update(user,{
            where: {
                id: 1 //req.session.id --> tiene que ser el usuario de sesion 
            }
        })
        .then(function(id){
            //user.id=req.session.id --> en nuestro proyecto 
            //manejar la session 
            return res.redirect('/')
        })
        .catch(e=>{console.log(e)})
    }
     
    
};
module.exports = usersController;


//locals es una variable de express accesible desde las vistas, si logras en alguna parte del codigo pasarlo, lo vas a poder usar. app,js es el puente