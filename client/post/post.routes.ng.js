'use strict'

angular.module('meteor101App')
.config(function($stateProvider) {
  $stateProvider
  .state('post', {
    url: '/post',
    templateUrl: 'client/post/post.view.ng.html',
    controller: 'PostCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
  .state('postSuccess', {
    url: '/postSuccess',
    templateUrl: 'client/post/postSuccess.view.ng.html',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
});