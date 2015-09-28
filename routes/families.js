/**
 * Created by HUQ on 9/23/15.
 */
var express = require('express');
var router = express.Router();
var Family = require('../dbModels/familyModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("getting families:");
  Family.find({}, function(err, Family) {
    res.send(err || Family);
  }).populate('members');

});

router.post('/', function(req, res) {
  var newFamily = new Family(req.body);
  newFamily.save(function(err, newFamily) {
    if (err) {
      res.status(400);
      var statusMessage = err.errors[Object.keys(err.errors)[0]].message;
      statusMessage ? res.send(statusMessage) : res.send(err);
      //}
    } else {
      res.status(200).send(newFamily);
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
//Family.find({}).populate('members').exec(function (err, families) {
//
//});
//
//
////Family.find({}, function(err, families) {
////
////}).populate('members');
//
//Family.findById({animalId}, function(err, family) {
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
