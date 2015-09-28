/**
 * Created by HUQ on 9/24/15.
 */
var express = require('express');
var router = express.Router();
var Family = require('../dbModels/familyModel');
var Friend = require('../dbModels/friendModel');

/* GET home page. */

//console.log("yo");

router.put('/:familyId/:friendId', function(req,res) {

  Family.findById(req.params.familyId, function(err, family) {
    Friend.findById(req.params.friendId, function(err, friend) {
      if(family.members && family.members.indexOf(req.params.friendId) !== -1) {
        res.status(400).send('That friend is already a member of this family');
      } else if (!friend.isAvailable) {
        res.status(400).send('That friend is unavailable for matching');
      } else {
      console.log(req.params.friendId);
      console.log(friend);
        family.members.push(friend._id);
        friend.isAvailable = false;
        family.save(function(err, savedFamily) {
          friend.save(function(err, savedFriend) {
            res.send(savedFamily);
          });
        });
      }
    })
  });
});

module.exports = router;
