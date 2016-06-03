'use strict'

angular.module('meteor101App')
.controller('CategoryListCtrl', function($scope, $meteor) {
  $scope.spinnerValue = "indeterminate";
   
  //Subscribe to the DB you wana use
  $scope.$meteorSubscribe('category').then(function() {
  	$scope.spinnerValue = "";
  });

  //Fetch the details of this Collection
  $scope.categoryData = $scope.$meteorCollection(function() {
    return Category.find();
  });


});
        