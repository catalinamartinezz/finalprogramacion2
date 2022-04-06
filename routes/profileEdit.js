var express = require('express');
var router = express.Router();
const profileEditController = require("../controllers/profileEditController");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get ('/', profileEditController);

module.exports = router;