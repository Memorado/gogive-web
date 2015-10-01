var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var passport = require('passport');

var Center = mongoose.model('Center');
var Item = mongoose.model('Item');
var Category = mongoose.model('Category');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/admin/user/login');
  }
}

function isAdmin(req, res, next) {
  if (req.user.admin) {
    next();
  }
  else {
    res.redirect('/admin/center/' + req.user.center + '/');
  }
}

function isOwner(req, res, next) {
  if (req.center.equals(req.params.center_id)) {
    next();
  }
  else {
    res.redirect('/admin/center/' + req.user.center + '/');
  }
}


router.get('/', isLoggedIn, isAdmin, function(req, res, next) {
  Center.find().populate('items').exec(function(err, centers) {
    res.render('admin/center/list', { title: 'Admin', items: centers, user_name: req.user.name });
  });
});

router.get('/new', isLoggedIn, function(req, res, next) {
  res.render('admin/center/edit', { 
    title: "New Center", 
    center: { 
      name: "",
      longitude: 0,
      latitude: 0,
      email: "",
      address: "",
      description: "",
      phone_number: ""
    }
  });
});

router.post('/new', isLoggedIn, function(req, res, next) {
  var center = Center({
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    email: req.body.email,
    address: req.body.address,
    description: req.body.description,
    phone_number: req.body.phone_number
  });
  center.save(function (err) {
    res.redirect('/admin/center/' + center._id + '/');
    if (err) // ...
      console.log(err);
  });
});

router.get('/:center_id', isLoggedIn, isOwner, function(req, res, next) {
  Center.findOne({ _id: req.params.center_id }).populate({path: 'items', options: {sort: {'priority': -1}}}).exec(function(error, center) {
    var options = {
      path: 'items.category',
      model: 'Category'
    };
    Category.populate(center, options, function (err, center) {
      res.render('admin/center/details', { title: center.name, center: center, show_back: req.user.admin == true });
    });
  })
});

router.get('/:center_id/edit', isLoggedIn, isOwner, function(req, res, next) {
  Center.findOne({ _id: req.params.center_id }, function(error, center) {
    Category.find({}).sort('englishName').exec(function(error, categories) {
      res.render('admin/center/edit', { title: center.name, center: center, categories: categories });
    });
  })
});

router.post('/:center_id/edit', isLoggedIn, isOwner, function(req, res, next) {
  Center.findOne({ _id: req.params.center_id }, function(error, center) {
    center.name = req.body.name;
    center.longitude = req.body.longitude;
    center.latitude = req.body.latitude;
    center.email = req.body.email;
    center.address = req.body.address;
    center.description = req.body.description;
    center.phone_number = req.body.phone_number;
    center.save(function (err) {
      res.redirect('/admin/center/' + center._id + '/');
      if (err) // ...
        console.log(err);
    });
  })
});

router.get('/:center_id/delete', isLoggedIn, isOwner, function(req, res, next) {
  Center.findOneAndRemove({ _id: req.params.center_id }, function(error, center) {
    res.redirect('/admin/center/');
  })
});

router.get('/:center_id/new', isLoggedIn, isOwner, function(req, res, next) {
  Category.find({}).sort('englishName').exec(function(error, categories) {
    res.render('admin/center/edit-item', { 
      item: {
        name: "",
        description: "",
        quantity: "",
        due_date: "",
        center: {
          _id: req.params.center_id
        }
      },
      categories: categories,
      priorities: [
        { id: 0, name: "Low Priority" },
        { id: 1, name: "Medium Priority" },
        { id: 2, name: "High Priority" }
      ],
      action_url: '/admin/center/' + req.params.center_id + '/new/'
    })
  })
});

router.post('/:center_id/new', isLoggedIn, isOwner, function(req, res, next) {
  Center.findOne({ _id: req.params.center_id }, function(error, center) {
    Category.findOne({ _id: req.body.category }, function(error, category) {
      var item = Item({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        due_date: req.body.due_date,
        center: center,
        priority: req.body.priority,
        category: category
      });
      item.save(function (err) {
        res.redirect('/admin/center/' + req.params.center_id + '/');
        if (err) // ...
          console.log(err);
      });
    });
  });
});

router.get('/:center_id/:item_id/edit', isLoggedIn, isOwner, function(req, res, next) {
  Item.findOne({ _id: req.params.item_id }).populate('center').populate('category').exec(function(error, item) {
    Category.find({}).sort('englishName').exec(function(error, categories) {
      res.render('admin/center/edit-item', { 
        item: item, 
        categories: categories, 
        action_url: '/admin/center/' + req.params.center_id + '/' + item._id + '/edit/',
        priorities: [
          { id: 0, name: "Low Priority" },
          { id: 1, name: "Medium Priority" },
          { id: 2, name: "High Priority" }
        ]
      })
    })
  });
});

router.post('/:center_id/:item_id/edit', isLoggedIn, isOwner, function(req, res, next) {
  Item.findOne({ _id: req.params.item_id }, function(error, item) {
    Category.findOne({ _id: req.body.category }, function(error, category) {
      item.name = req.body.name;
      item.description = req.body.description;
      item.quantity = req.body.quantity;
      item.due_date = req.body.due_date;
      item.category = category;
      item.priority = req.body.priority;
      item.save(function (err) {
        res.redirect('/admin/center/' + item.center + '/');
        if (err) // ...
          console.log(err);
      });
    });
  })
});

router.get('/:center_id/:item_id/delete', isLoggedIn, isOwner, function(req, res, next) {
  Item.findOneAndRemove({ _id: req.params.item_id }, function(error, center) {
    res.redirect('/admin/center/' + req.params.center_id + '/');
  })
});

module.exports = router;
