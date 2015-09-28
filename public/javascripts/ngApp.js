/**
 * Created by HUQ on 9/22/15.
 */
"use strict";

var ngApp = angular.module('room-spec', ['ui.router']);
console.log("ngApp is running");

ngApp.constant('constants', {
  apiUrl: 'http://localhost:3000'
});

var friendUnderConsideration;

ngApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
      .state('itemInput', {
        url: '/items',
        templateUrl: 'templates/itemInput.html',
        controller: 'ItemCtrl'
      })
      .state('roomInput', {
        url: '/rooms',
        templateUrl: 'templates/roomInput.html',
        controller: "RoomCtrl"
      })

});


ngApp.controller('ItemCtrl', function($scope, $http, $state, Item) {
  $scope.title = "Find and Add an Item";

  var buttonNum;
  $scope.receiveClick = function(id) {
    buttonNum = id;
    console.log("Button Shown!");
  };

  $scope.reveal = function (id) {
    return buttonNum == id;
  };


  $scope.selectItemToPopulate = function($event, thisItem) {
    friendUnderConsideration = thisItem;
    console.log("populating item :", thisItem);
    $state.go('roomInput');
    $event.stopPropagation();

  };

  Item.showAll()
    .then(function(res) {
      console.log("All items loaded");
      $scope.allItems = res.data;
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

});


ngApp.controller('RoomCtrl', function($scope, $http, Room) {
  $scope.title = "Add a Room";
  //
  //var buttonNum;
  //
  //$scope.item = itemUnderConsideration;
  //
  //$scope.isSelectingMatch = function() {
  //  return itemUnderConsideration;
  //};
  //$scope.cancelMatch = function () {
  //  itemUnderConsideration = null;
  //};
  //
  ////TODO: we use these following two functions two times,
  ////is it possible to make a factory?
  //$scope.receiveClick = function(id) {
  //  buttonNum = id;
  //  console.log("Button Shown!");
  //};
  //
  //$scope.reveal = function (id) {
  //  return buttonNum == id;
  //};
  //
  //
  //
  //$scope.addItemToRoom = function($event, item) {
  //  console.log("Match Made!");
  //  $event.stopPropagation();
  //  console.log(item._id, itemUnderConsideration._id);
  //  if (itemUnderConsideration) {
  //    Room.match(item._id, itemUnderConsideration._id)
  //    .then(function(res) {
  //          $scope.roo = {};
  //          console.log(res.data);
  //          //TODO: get here
  //        })
  //    .catch(function(err){
  //          console.log(err);
  //        });
  //    itemUnderConsideration = null;
  //  } else
  //    $scope.noItem = "There is no item to add";
  //};
  //
  //Room.showAll()
  //    .then(function(res) {
  //      console.log("All rooms loaded");
  //      $scope.allRooms = res.data;
  //    })
  //    .catch(function(error) {
  //      console.log(error);
  //    });
  //
  //$scope.addRoom = function () {
  //  console.log("add that room!");
  //
  //  Room.add($scope.room)
  //      .then(function(res) {
  //        $scope.newRoom = res.data;
  //        $scope.room = {};
  //      })
  //      .catch(function(error){
  //        $scope.newRoom = error;
  //      })
  //};

});





ngApp.service('Item', function($http, constants) {
  let api = constants.apiUrl;
  this.showAll = function(){return $http.get(api + '/items');};
  this.add = function(params) {return $http.post(api + '/items', params);};
});

ngApp.service('Rooms', function($http, constants) {
  let api = constants.apiUrl;
  this.showAll = function(){return $http.get(api + '/rooms');};
  this.add = function(params) {return $http.post(api + '/rooms', params);};
  this.match = function(roomId, itemId) {return $http.put(api + '/match/' + roomId + '/' + itemId )}
});

