/**
 * Created by HUQ on 9/22/15.
 */
var Mongoose = require('mongoose');

var itemScheme = Mongoose.Schema({
  name: {type: String, required: true},
  quantity: {type: Number, required: true},
  cost: {type: Number, required: true},
  hasBeenPlaced: {type: Boolean, required: true, default: false},
  photo: String,
  description: String
  });

//itemScheme.methods.toggleAvailable = function(cb) {
//  this.isAvailable = !this.isAvailable;
//  this.save(cb);
//};

var Item = Mongoose.model("Item", itemScheme);


module.exports = Item;