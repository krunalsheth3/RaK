'use strict'

angular.module('meteor101App')
.config(function($stateProvider) {
  $stateProvider
  .state('contact', {
    url: '/contact',
    templateUrl: 'client/contact/contact.view.ng.html',
    controller: 'ContactCtrl'
  });

});