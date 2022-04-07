var express = require('express');
var router = express.Router();
const searchResultsController = require("../controllers/searchResultsController");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

//router.get ('/', searchResultsController);

module.exports = router;