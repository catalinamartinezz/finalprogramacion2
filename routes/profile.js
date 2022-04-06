var express = require('express');
var router = express.Router();
const profileController = require("../controllers/profileController");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get ('/', profileController);

module.exports = router;