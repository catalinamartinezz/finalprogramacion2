var express = require('express');
var router = express.Router();
const loginController = require("../controllers/loginController");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get ('/', loginController);

module.exports = router;