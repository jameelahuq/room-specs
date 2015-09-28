/**
 * Created by HUQ on 9/22/15.
 */
var Mongoose = require('mongoose');

var friendScheme = Mongoose.Schema({
  name: {type: String, required: true},
  entryDate: {type: Date, required: true, default: Date.now()},
  species: {type: String, required: true},
  isAvailable: {type: Boolean, required: true, default: false},
  variety: {type: String},
  gender: {type: String},
  age: {type: String},
  photo: String,
  description: String
  });

friendScheme.methods.toggleAvailable = function(cb) {
  this.isAvailable = !this.isAvailable;
  this.save(cb);
};

var Friend = Mongoose.model("Friend", friendScheme);


module.exports = Friend;