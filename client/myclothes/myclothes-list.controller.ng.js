'use strict'

angular.module('meteor101App')
.controller('MyclothesListCtrl', function($scope,$rootScope, $meteor, racConstants, $mdDialog, $mdToast, $location) {
  $scope.page = 1
  $scope.perPage = racConstants.PERPAGEENTRY;
  $scope.sort = {
    createdAt : -1
  };

  $scope.myClothesData = $scope.$meteorCollection(function() {
    return List.find({}, {sort:$scope.getReactively('sort')});
  });
  $meteor.autorun($scope, function() {
    $scope.spinnerValue = "indeterminate";
    $scope.$meteorSubscribe('myclothes', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }).then(function() {
      $scope.spinnerValue = "";
      $scope.totalClothes = $scope.$meteorObject(Counts, 'numberOfMyclothes', false);
    });
  });

    
  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  /*
  * Show the details of my cloth for this Item 
  */
  $scope.showClothDetails = function(item) {
    $location.path("/list/"+item._id);
  };

  /*
  * Edit the details of my cloth for this Item 
  */
  $scope.editClothDetails = function(item) {
    $location.path("/post");
  };

  // Delete confirm dialog box
  var confirm = $mdDialog.confirm({
      clickOutsideToClose: true
  })
  .title('Confirm Delete')
  .textContent('Are you sure you want to remove this posting ?')
  .ok('Delete')
  .cancel('Cancel');

  /*
  * Delete this item from the remote DB
  */
  $scope.removeClothDetails = function(item) {
    var itemToBeDeleted = item;
    $mdDialog.show(confirm).then(function() {
      /*
      * Invoke server side removeEntry to delete post
      */
      $meteor.call('removeEntry',itemToBeDeleted).then(
          function(data) {
            if(angular.isDefined(data)) {
              showDeleteSuccessToast();  
            }    
          },
         function(error) {
            console.log(error.error);                      
          }
        ); 

    }, function() {
        console.log("Failed");
    });
  };
  
  /*
  * Show simple Toaster for successfully deleting item
  */
  function showDeleteSuccessToast() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Removed item successfully')
        .position('bottom right')
        .hideDelay(3000)
    );
  };
  
});
        





