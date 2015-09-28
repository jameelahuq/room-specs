var express = require('express');
var router = express.Router();
var Item = require('../dbModels/itemModel');

/* GET users listing. */
router.get('/', function(req, res) {
  console.log("getting items:");
  Item.find({}, function(err, Item) {
    res.send(err || Item);
  });

});

router.post('/', function(req, res) {
  var newItem = new Item(req.body);
  newItem.save(function(err, newItem) {
    if (err) {
      res.status(400);
      var statusMessage = err.errors[Object.keys(err.errors)[0]].message;
      statusMessage ? res.send(statusMessage) : res.send(err);
      //}
    } else {
      res.status(200).send(newItem);
    }
  })
});





module.exports = router;




