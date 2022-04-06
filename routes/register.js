var express = require('express');
var router = express.Router();
const registerController = require("../controllers/registerController");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get ('/', registerController);

module.exports = router;