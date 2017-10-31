var express = require('express');
var app = express();
var orderRoutes = express.Router();

var Order = require('../models/Order');
const util = require('util');

orderRoutes.route('/orders').get(function (req, res) {
  Order.find().populate('items').exec(function (err, orders){
    if(err){
      res.json(err);
    }
    else {
      res.json(orders);
    }
  });
});

orderRoutes.route('/orders').post(function (req, res) {
  console.log(util.inspect(req.body));
  var order = new Order(req.body);
  order.save().then(item => {
    res.status(200).json(order);
  });
});

orderRoutes.route('/order/:id').delete(function (req, res) {
  Order.findByIdAndRemove({_id: req.params.id}, function(err, order){
        if(err) res.json(err);
        else {
          res.json(order);
        }
  });
});
          

module.exports = orderRoutes;