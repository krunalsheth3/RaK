'use strict'

angular.module('meteor101App')
.config(function($stateProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'client/main/main.view.ng.html',
    controller: 'MainCtrl'
  });  
});