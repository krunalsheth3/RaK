'use strict'

angular.module('meteor101App')
.config(function($stateProvider) {
  $stateProvider
  .state('category-list', {
    url: '/category',
    templateUrl: 'client/category/category-list.view.ng.html',
    controller: 'CategoryListCtrl'
  })
  .state('category-detail', {
    url: '/category/:categoryType/:categoryId',
    templateUrl: 'client/category/category-detail.view.ng.html',
    controller: 'CategoryDetailCtrl'
  });
});