const express = require ("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({  
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/products'))
    },  

    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }    
})
let upload = multer({storage: storage})  

router.get("/productdetail/:id?", productController.index);

router.get("/productadd", productController.productAdd);
router.post("/productadd",  upload.single('imagen'), productController.store );

router.get('/edit/:id', productController.edit);
router.post('/edit', upload.single('imagen'), productController.update);

router.get("/searchresults", productController.searchResults);
router.post('/delete/:id', productController.delete);



module.exports= router;
