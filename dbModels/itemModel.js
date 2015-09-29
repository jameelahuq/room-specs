/**
 * Created by HUQ on 9/22/15.
 */
var Mongoose = require('mongoose');

var itemScheme = Mongoose.Schema({
  name: {type: String, required: true},
  quantity: {type: Number, required: true},
  cost: {type: Number, required: true},
  room: {type: Mongoose.Schema.ObjectId, ref: "Room", required: true},
  photo: String,
  description: String
  });

//itemScheme.methods.toggleAvailable = function(cb) {
//  this.isAvailable = !this.isAvailable;
//  this.save(cb);
//};

var Item = Mongoose.model("Item", itemScheme);


module.exports = Item;