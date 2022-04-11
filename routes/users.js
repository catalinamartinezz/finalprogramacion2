const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");

/* GET home page. */
router.get('/', usersController.profile);
router.get('/profileedit', usersController.profileEdit);
router.get('/register', usersController.register);
router.get('/login', usersController.login);


module.exports = router;
