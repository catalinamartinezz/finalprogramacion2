const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({  
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/users'))
    },  

    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }    
})
let upload = multer({storage: storage})  

/* GET home page. */
router.get('/', usersController.profile);
router.get('/profileedit', usersController.profileEdit);
router.get('/register', usersController.create);
router.get('/register', usersController.register);
router.post('/register', upload.single('avatar'), usersController.store);
router.get('/login', usersController.login);
router.post('/login', usersController.signIn);
router.post('/login', usersController.storeLogin);
router.get('/logout', usersController.logout);


module.exports = router;
