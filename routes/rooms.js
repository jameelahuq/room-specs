/**
 * Created by HUQ on 9/23/15.
 */
var express = require('express');
var router = express.Router();
var Rooms = require('../dbModels/roomMpde;');

/* GET users listing. */
router.get('/', function(req, res) {
  console.log("getting rooms:");
  Rooms.find({}, function(err, Room) {
    res.send(err || Room);
  }).populate('ite,s');

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

//router.put('toggleAvailable/:mongoId', function(req, res) {
//  Friend.findById(req.params.mongoId, function (err, friend) {
//    friend.toggleAvailable(function (err, savedAnimal) {
//      res.send(savedAnimal)
//    });
//  });
//});


//
//Rooms.find({}).populate('members').exec(function (err, families) {
//
//});
//
//
////Rooms.find({}, function(err, families) {
////
////}).populate('members');
//
//Rooms.findById({animalId}, function(err, family) {
//  Friend.findById({animalId}, function(err, friend) {
//    family.members.push(friend._id);
//    friend.isAvailable = false;
//    family.save(function(err, savedFamily){
//      friend.save(function(err, savedPet) {
//        res.send();
//      })
//    })
//  })
//});




module.exports = router;
