const express = require ("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/product/:id?", productController.index);
router.get("/productadd", productController.productAdd);
router.post("/productadd", productController.store );
router.get("/searchresults", productController.searchResults);

module.exports= router;
