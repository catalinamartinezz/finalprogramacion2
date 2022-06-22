const db = require('../database/models');
const products = db.Product;
const comments = db.Comment;
let multer = require('multer');
const req = require("express/lib/request");
const op = db.Sequelize.Op;

const productController = {
    index: function(req, res) {
        //mostrar listado de productos
        let id = req.params.id
        products.findByPk(id, {
            include: [
                { association: 'comments', 
                    include: {association: 'users'}
                },
                {association: 'users'}
            ],
            order: [
                ['comments', 'created_at', 'desc']
            ],
        })
            .then(resultado => {
                if (!resultado) {
                    res.redirect('/')
                }
                return res.render('product',
                    {products: resultado,}
                );
            })
            .catch(error => {
                console.log(error)
            })
    },
    productAdd: function(req, res) {
        if (req.session.users != undefined) {
            return res.render('productAdd')
        } else {
            res.redirect('/')
        }

    },
    edit: function(req, res){
        products.findByPk(req.params.id)
            .then((resultado) => {
                if (!resultado) {
                    res.redirect('/')
                } else {
                return res.render('productEdit', {
                    product: resultado,
                    id: req.params.id,
                })}
            })
    },
    update: function(req, res){
        const id = req.params.id;
        products.findByPk(id)
            .then(resultado => {
                const productos = {
                    name_product: req.body.product,
                    image_product: "",
                    description: req.body.description,
                }
                if (req.file == undefined) {
                    productos.image_product = resultado.image_product;
                } else {
                    productos.image_product = req.file.filename;
                }
                products.update(productos, {
                    where: {
                        id_product: req.params.id
                    }
                })
                    .then(function () {
                        return res.redirect("/")
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })

    },
    searchResults: function(req, res) {
        let buscarProductos = req.query.search;
        let errors = {}
        if(buscarProductos == ""){
            errors.message = "Por favor, ingrese su busqueda";
            res.locals.errors = errors;
            return res.render('searchResults', {busqueda: errors});
        } else{
            products.findAll({
                where: {
                    [op.or]: [
                        {name_product: {[op.like]: "%" + buscarProductos + "%",}},
                        {description: {[op.like]: "%" + buscarProductos + "%",}},
                    ]
                }, 
                order: [
                    ['name_product', 'ASC']
                ], 
                include: [
                    {association: 'comments'},
                    {association: 'users'},
                ]
            })
            .then(function(busqueda){
                if(busqueda == ""){
                    errors.message = "No se encontraron productos para su busqueda";
                    res.locals.errors = errors;
                    return res.render('searchResults', {busqueda: errors})
                } else{
                    return res.render('searchResults', {busqueda: busqueda})
                }
            })
            .catch(e => console.log(e))
        }
        
    },
    store: function(req,res){
        let errors = {};
        if(req.body.product == ""){
            errors.message = "Por favor ingrese un producto";
            res.locals.errors = errors;
            return res.render('productAdd')
        } else if (req.file == undefined){
            errors.message = "La imagen del producto es obligatoria";
            res.locals.errors = errors;
            return res.render('productAdd')
        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'
        ){
            errors.message = "Ingrese una imagen de tipo png,jpg o jpeg";
            res.locals.errors = errors;
            return res.render('productAdd')
        }else if (req.body.description ==""){
            errors.message = "ingrese una descripcion del producto";
            res.locals.errors = errors;
            return res.render('productAdd')
        } else {
            let producto = {
                id_user: req.session.users.id_user,
                image_product: req.file.filename,
                name_product: req.body.product,
                description: req.body.description,
            }
            products.create(producto)
                return res.redirect('/')
        }
    },
   delete: function(req, res) {
        const id = req.params.id
 
        products.findByPk(id)
        .then(function(resultado) {
            if(req.session.users.id_user == resultado.id_user){
             comments.destroy({
                 where: [
                     {
                         id_product: id
                     }
                 ]
             })
         .then(function() {
             products.destroy({
                 where: [
                     {
                         id_product: id
                     }
                 ]})
         
         })
         .then(function(){
             return res.redirect("/")
         })
         .catch(error => {
             console.log(error)
         })
         } else{
             return res.redirect("users/login")
         }
 
        })
        .catch(error => {
         console.log(error)
     })
  
     },
   /* delete: function (req, res) {
        let id = req.params.id_product;
        products.destroy({
            where: [{
                id_product: id
            }]
        })
            .then(function(resultado) {

                return res.redirect('/');

            })
            .catch(error => {
                console.log(error);
            })
    }*/
 
};
module.exports = productController;