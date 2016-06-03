'use strict'

angular.module('meteor101App')
.controller('ListDetailCtrl', ['$scope', '$stateParams', '$meteor', 'utilService' , function($scope, $stateParams, $meteor, utilService) {
  var self = this;
  
  /*
  * Fetch the details of that particular ID 
  */
  $meteor.call('fetchItemDetails',$stateParams.listId).then(
      function(data) {
        if(angular.isDefined(data)) {
          self.itemDetails = data;
          self.map = {
                "center": {
                    "latitude": self.itemDetails.adUserLocation.latitude,
                    "longitude": self.itemDetails.adUserLocation.longitude
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