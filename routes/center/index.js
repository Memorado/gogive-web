var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Center = mongoose.model('Center');
var Category = mongoose.model('Category');

router.get('/:center_id', function(req, res, next) {
  Center.findOne({ _id: req.params.center_id }).populate({path: 'items', options: {sort: {'priority': -1}}}).exec(function(error, center) {
    var options = {
      path: 'items.category',
      model: 'Category'
    };
    Category.populate(center, options, function (err, center) {
      res.render('center/index', { title: center.name, center: center });
    });
  })
});

router.get('/:lang/:center_id', function(req, res, next) {
  Center.findOne({ _id: req.params.center_id }).populate({path: 'items', options: {sort: {'priority': -1}}}).exec(function(error, center) {
    var options = {
      path: 'items.category',
      model: 'Category'
    };
    Category.populate(center, options, function (err, center) {
      res.render('center/index', { title: center.name, center: center, lang: req.params.lang });
    });
  })
});

module.exports = router;
