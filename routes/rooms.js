/**
 * Created by HUQ on 9/23/15.
 */
var express = require('express');
var router = express.Router();
var Rooms = require('../dbModels/roomModel');

/* GET users listing. */
router.get('/', function(req, res) {
  console.log("getting rooms:");
  Rooms.find({}, function(err, Room) {
    res.send(err || Room);
  }).populate('items');

});

router.post('/', function(req, res) {
  var newRoom = new Rooms(req.body);
  newRoom.save(function(err, newRoom) {
    if (err) {
      res.status(400);
      var statusMessage = err.errors[Object.keys(err.errors)[0]].message;
      statusMessage ? res.send(statusMessage) : res.send(err);
      //}
    } else {
      res.status(200).send(newRoom);
    }
  })
});




module.exports = router;
