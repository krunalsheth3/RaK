'use strict'

angular.module('meteor101App')
.controller('MyclothesDetailCtrl',['$scope', '$stateParams', '$meteor', '$reactive', 'utilService' ,
 function($scope, $stateParams, $meteor, $reactive, utilService) {
  $reactive(this).attach($scope);
  
  /*
  * Fetch the details of that particular ID 
  */
  $meteor.call('fetchItemDetails',$stateParams.myclotheId).then(
      function(data) {
        if(angular.isDefined(data)) {
          $scope.itemDetails = data;
          $scope.map = {
                "center": {
                    "latitude": $scope.itemDetails.adUserLat,
                    "longitude": $scope.itemDetails.adUserLng
                },
                "zoom": 14
            };
        }    
      },
     function(err) {
        console.log("Error in fetchItemDetails");
      }
    ); 
}]);