const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");

/* GET home page. */
router.get('/', usersController.profile);
router.get('/profileedit', usersController.profileEdit);
router.get('/register', usersController.create);
router.get('/register', usersController.register);
router.post('/register', usersController.store);
router.get('/login', usersController.login);
router.post('/login', usersController.signIn);
router.post('/login', usersController.storeLogin);


module.exports = router;
