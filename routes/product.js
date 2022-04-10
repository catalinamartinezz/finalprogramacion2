const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

/* GET home page. */
router.get('/', productController.index);
router.get('/productadd', productController.productAdd);
router.get('/profile', productController.profile);
router.get('/profileedit', productController.profileEdit);

// router.get ('/', productController);

module.exports = router;
