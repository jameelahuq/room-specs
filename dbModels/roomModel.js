/**
 * Created by HUQ on 9/22/15.
 */
'use strict';

var Mongoose = require('mongoose');

var roomScheme = Mongoose.Schema({
  name: {type: String, required: true},
  items: [{type: Mongoose.Schema.ObjectId, ref: "Item"}]
});

var Room = Mongoose.model('Room', roomScheme);
module.exports = Room;



