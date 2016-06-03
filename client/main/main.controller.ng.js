'use strict'

angular.module('meteor101App')
.controller('MainCtrl', function($scope, $meteor, racConstants) {
  var page = 10;
  $scope.sort = {
    createdAt : -1
  };
  
  $scope.scrollDist = racConstants.INFINITE_SCROLL_DISTANCE;

  $scope.mainListData = $meteor.collection(function() {
      return List.find({}, {sort:$scope.getReactively('sort')});
  });

  $scope.loadMore = function() {
    var len = $scope.mainListData.length;
    $scope.spinnerValue = "indeterminate";

    $meteor.autorun($scope, function() {
      $meteor.subscribe('mainList', {
         limit: page,
         skip: len,
         sort: $scope.getReactively('sort')
       }, $scope.getReactively('globalSearch')).then(function() {
          $scope.spinnerValue = ""; 
       });
     });

  };



    
  
  
});