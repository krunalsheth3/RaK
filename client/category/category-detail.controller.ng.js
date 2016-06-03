'use strict'

angular.module('meteor101App')
.controller('CategoryDetailCtrl', function($scope, $stateParams, $meteor, racConstants) {
 

     $scope.page = 1;
     $scope.perPage = racConstants.PERPAGEENTRY;
     $scope.sort = {
       createdAt : -1
     };
     $scope.search = $stateParams.categoryType;
     $scope.defaultSortOrder = "Recently Added";
     
     $scope.listData = $scope.$meteorCollection(function() {
       return List.find({}, {sort:$scope.getReactively('sort')});
     });
     
     $meteor.autorun($scope, function() {
      $scope.spinnerValue = "indeterminate";
       $scope.$meteorSubscribe('list', {
         limit: parseInt($scope.getReactively('perPage')),
         skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
         sort: $scope.getReactively('sort')
       }, $scope.getReactively('search')).then(function() {
         $scope.spinnerValue = "";
         $scope.listCount = $scope.$meteorObject(Counts, 'numberOfList', false);
       });
     });

    /*
    * Sort the data by Recently Added one's
    */
    $scope.sortByRecentyAdded = function() {
      $scope.sort = {createdAt : -1};
    };

     /*
    * Sort the data by finding nearest posts around your area
    */
    $scope.sortByAroundYou = function() {
      
      $meteor.call('test').then(
          function(data) {
            if(angular.isDefined(data)) {
              
            }    
          },
         function(err) {
            console.log("Error in fetchItemDetails");
          }
        ); 
     
    };

   /*
   * Sort the data by Price
   */
   $scope.sortByPrice = function(val) {
     $scope.sort = {adPrice: parseInt(val)};
    
   };

   /*
   * Sort the data by Name
   */
   $scope.sortByName = function(sortOrder) {
     if(sortOrder) {
       $scope.sort = {name_sort: parseInt(sortOrder)};
     }
   };

   /*
   * Paginate the data
   */   
    $scope.pageChanged = function(newPage) {
      this.getReactively('page');
      $scope.page = newPage;
    };


});


