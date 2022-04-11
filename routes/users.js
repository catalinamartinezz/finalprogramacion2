const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");

/* GET home page. */
router.get('/', usersController.profile);
router.get('/profileedit', usersController.profileEdit);


module.exports = router;
