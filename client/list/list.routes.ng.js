'use strict'

angular.module('meteor101App')
.config(function($stateProvider) {
  $stateProvider
  .state('list-detail', {
    url: '/list/:listId',
    templateUrl: 'client/list/list-detail.view.ng.html',
    controller: 'ListDetailCtrl'
  });
});