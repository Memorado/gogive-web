var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/landing', { title: 'GoGive - Connecting donators and help centers' });
});

module.exports = router;
