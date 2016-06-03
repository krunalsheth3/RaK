'use strict'

angular.module('meteor101App')
.controller('ContactCtrl', ['$scope', '$meteor','racConstants', '$mdSidenav', '$log', function($scope, $meteor, racConstants, $mdSidenav, $log) {
    
  
  
 var test =  $('#image').cropper({
  viewMode: 3,
  dragMode: 'crop',
  aspectRatio: 4 / 3,
  cropBoxResizable: false,
  minContainerWidth: 600,
  minContainerHeight: 600,
  minCropBoxWidth: 100,
  minCropBoxHeight: 100,
  autoCropArea:0.6,
  zoom: 0.9,
  crop: function(e) {
    // Output the result data for cropping image.
    console.log(e.x);
    console.log(e.y);
    console.log(e.width);
    console.log(e.height);
    console.log(e.rotate);
    console.log(e.scaleX);
    console.log(e.scaleY);
  },
  getCropBoxData: function(obj) {
    console.log(obj);
  }
});





  }]);
  

