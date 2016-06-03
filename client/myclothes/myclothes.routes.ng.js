'use strict'

angular.module('meteor101App')
.config(function($stateProvider) {
  $stateProvider
  .state('myclothes-list', {
    url: '/myclothes',
    templateUrl: 'client/myclothes/myclothes-list.view.ng.html',
    controller: 'MyclothesListCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
  .state('myclothes-detail', {
    url: '/myclothes/:myclotheId',
    templateUrl: 'client/myclothes/myclothe-detail.view.ng.html',
    controller: 'MyclothesDetailCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
  .state('myclothes-edit', {
    url: '/myclothesedit/:myclotheId',
    templateUrl: 'client/myclothes/myclothe-detail.edit.ng.html',
    controller: 'MyclothesEditCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  });
});