/**
 * Created by HUQ on 9/24/15.
 */
var express = require('express');
var router = express.Router();
var Room = require('../dbModels/roomModel');
var Item = require('../dbModels/itemModel');

/* GET home page. */

//console.log("yo");

router.put('/:familyId/:friendId', function(req,res) {

  Room.findById(req.params.roomId, function(err, room) {
    Item.findById(req.params.itemId, function(err, item) {
      if(room.items && room.items.indexOf(req.params.itemId) !== -1) {
        res.status(400).send('That item is already populating this room');
      } else if (!item.isAvailable) {
        res.status(400).send('That item is unavailable for populating');
      } else {
      console.log(req.params.itemId);
      console.log(item);
        room.members.push(item._id);
        item.isAvailable = false;
        room.save(function(err, savedRoom) {
          item.save(function(err, savedItem) {
            res.send(savedRoom);
          });
        });
      }
    })
  });
});

module.exports = router;
