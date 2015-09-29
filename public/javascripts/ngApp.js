/**
 * Created by HUQ on 9/22/15.
 */
"use strict";

var ngApp = angular.module('room-spec', ['ui.router']);
console.log("ngApp is running");

ngApp.constant('constants', {
  apiUrl: 'http://localhost:3000'
});


ngApp.controller('ItemCtrl', function($scope, $http, $state, Item, Room) {
  console.log("We are in ItemCtrl");
  $scope.title = "Find and Add an Item";

  var buttonNum;


  $scope.revealButton = function (id) {
    return buttonNum == id;
  };


  //console.log($scope.selectRoom);

  $scope.selectItemToPopulate = function($event, thisItem) {
    //friendUnderConsideration = thisItem;
    console.log("populating item :", thisItem);
    //$state.go('roomInput');
    $event.stopPropagation();
  };

  $scope.roomNameMatchesItem = function (item) {
    console.log("Item:", item.room);
    console.log("Room:", $scope.roomName);
    if (!$scope.desiredRoom) {
      return true;
    } else if (item.room === $scope.desiredRoom._id) {
      return true;
    //} else if ($scope.roomName === "") {
    //  return true;
    //} else {
    //  return false;
    }
  };


  Item.showAllItems()
    .then(function(res) {
        console.log("All items loaded");
        $scope.allItems = res.data;
        //$scope.revealRooms = function($event, itemId) {
        //  console.log("opp!");
        //  $event.stopPropagation();
          Room.showAllRooms()
              .then(function(res){
                console.log("All rooms loaded");
                $scope.allRooms = res.data;
              })
              .catch(function(err) {
                console.log(err)
              });


        //  buttonNum = itemId;
        //  console.log("Button Shown!");
        //
        //};
      })
    .catch(function(error) {
      console.log(error);
    });

  $scope.addItem = function () {
    console.log("add that item!");

    Item.add($scope.item)
      .then(function(res) {
          $scope.newItem = res.data;
          $scope.item = {};
      })
      .catch(function(error){
        $scope.newItem = error;
      })
    };


  $scope.addRoom = function () {
    console.log("add that room!");

    Room.add($scope.room)
        .then(function(res) {
          $scope.newRoom = res.data;
          $scope.room = {};
        })
        .catch(function(error){
          $scope.newRoom = error;
        })
  };

  $scope.showRoom = function() {}

});





ngApp.service('Item', function($http, constants) {
  let api = constants.apiUrl;
  this.showAllItems = function(){return $http.get(api + '/items');};
  this.add = function(params) {return $http.post(api + '/items', params);};

});

ngApp.service('Room', function($http, constants) {
  let api = constants.apiUrl;
  this.showAllRooms = function(){return $http.get(api + '/rooms');};
  this.add = function(params) {return $http.post(api + '/rooms', params);};
  this.addItem = function(roomId, itemId) {return $http.put(api + '/match/' + roomId + '/' + itemId )}
});

