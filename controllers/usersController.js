const bcrypt = require ('bcryptjs');
const db = require("../database/models");
const op = db.Sequelize.Op;
const users = db.User;


const usersController = {
    profile: function(req, res) {
        const id = req.params.id
        users.findByPk(id, {
                include: [ 
                    {association: 'comments',
                        include: {association: 'users'}
                    },
                    {association: 'products',
                        include: {association: 'comments'}
                    }
                ]
            })
            .then(function(resultado){
                if (resultado == null) {
                    return res.redirect('/')
                } else {
                    return res.render('profile', { resultado: resultado})
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
    edit:function(req,res){
        let userId = req.params.id;

        // Controlar que solo yo puedo cambiar los datos
        users.findByPk(userId)
            .then(function(user){
                return res.render('profileEdit', {user: user})
            })
            .catch( e => {
                console.log(e)
            })
    },
    update:function(req,res){
        let user = {
            user_name: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        }
        if(req.file == undefined){
            user.avatar = req.session.users.avatar;
        }else {
            user.avatar = req.file.filename
        }
        //envio a la base de datos 

        users.update(user,{
            where: {
                id_user: req.session.users.id_user
            }
        })
        .then(function(user){
            // Manejar la session
            return res.redirect('/')
        })
        .catch(e=>{console.log(e)})
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
        let errors = {}
        
        if(req.body.email == ""){
            errors.message = "El email es obligatorio";
            res.locals.errors = errors
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if(req.body.password == ""){
            errors.message = "La contrase??a es obligatoria";
            res.locals.errors = errors
            console.log(errors) // Guardar errors en locals
            return res.render('register')
        } else if (req.body.password.length < 3){
            errors.message = "La contrase??a debe contener mas de 3 caracteres"
            res.locals.errors = errors
            console.log(res.locals.errors)
            return res.render('register')
        }else {
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
                errors.message = "La contrase??a es incorrecta, intentelo nuevamente. "
                res.locals.errors = errors
                return res.render('login')
            }else {
                req.session.user = user
                if(req.body.recordarme != undefined){
                    res.cookie('userId', user.id_user, { maxAge: 1000 * 60 * 5})
                }
                return res.redirect('/')
            }
        })
        .catch(error => console.log(error))

    },
    signIn: function (req,res){
        res.render ('login')
        users.findOne({
            where: {email: req.body.email} //buscame el email que acaba de entrar por formulario 
        })
        .then(function(users){
            //aca obtenemos todos los datos del usuario, son estos datos los que podes usar 
            //return res.send(users) para ver que aparece 
            req.session.users= users // aca guardo users en session 

            //preguntar si el usuario tildo el checkbox
            res.cookie('userId', users.id_user, {maxAge: 1000*60*5})
            return res.redirect('/')

        })
        .catch(error => console.log(error))
    },
    logout: function(req,res){
        req.session.destroy();
        if (req.cookies.userId !== undefined){
            res.clearCookie('userId')
        }
        return res.redirect('/')
    },
};
module.exports = usersController;


//locals es una variable de express accesible desde las vistas, si logras en alguna parte del codigo pasarlo, lo vas a poder usar. app,js es el puente