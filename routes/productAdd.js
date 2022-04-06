var express = require('express');
var router = express.Router();
const productAddController = require("../controllers/productAddController");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get ('/', productAddController);

module.exports = router;