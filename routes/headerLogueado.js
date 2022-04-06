var express = require('express');
var router = express.Router();
const headerLogueadoController = require("../controllers/headerLogueadoController");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get ('/', headerLogueadoController);

module.exports = router;