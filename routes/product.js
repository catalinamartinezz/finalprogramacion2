const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

/* GET home page. */
router.get('/:id', productController.index);
router.get('/productadd', productController.productAdd);
router.get('/searchresults', productController.searchResults);


module.exports = router;
