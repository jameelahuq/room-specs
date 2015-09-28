/**
 * Created by HUQ on 9/22/15.
 */
'use strict';

var Mongoose = require('mongoose');

var familyScheme = Mongoose.Schema({
  name: {type: String, required: true},
  phone: {type: String, required: true},
  address: {type: String},
  notes: {type: String},
  members: [{type: Mongoose.Schema.ObjectId, ref: "Friend"}]
});

var Family = Mongoose.model('Family', familyScheme);
module.exports = Family;



