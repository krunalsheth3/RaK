'use strict';

angular.module('meteor101App')

.config(function($urlRouterProvider, $locationProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  //adding the vsdp Interceptor by its name
  $httpProvider.interceptors.push('racInterceptor');
   
  uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'places' // Required for SearchBox.
  });
}).run(['$rootScope', '$state', function($rootScope, $state) {
  
  $rootScope.spinnerDiameter = "100%";                     // setting the diameter for the Spinner widget
  $rootScope.spinnerClass = "ajax-loader md-warn md-hue-3" // setting the className for the Spinner widget
  $rootScope.displaySearchBox = true;                      // setting the SearchBox visibility

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    switch(error) {
      case 'AUTH_REQUIRED':
        Session.set('toState', toState.url);
        $("#loginModal").modal({backdrop: false});
        break;
      case 'FORBIDDEN':
      case 'UNAUTHORIZED':
        alert("UNAUTHORIZED");
        $state.go('main');
        break;
    }
  });
}])

/*
* Rac constants used throughout the portal
*/
.constant('racConstants', {
  'SUCCESS_CODE' : 200,
  'PERPAGEENTRY' : 12,
  'INFINITE_SCROLL_DISTANCE': 0

})

/*
* For providing a global color to the entire App
*/
.config(function($mdThemingProvider) {
  var customBlueMap =     $mdThemingProvider.extendPalette('teal', {
    'contrastDefaultColor': 'dark',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .backgroundPalette('grey')
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default').primaryPalette('grey')

})
                            
/*
* Interceptors for 
* toggle display SearchBox visibility
*/
 .factory('racInterceptor',['$q','$rootScope', '$location', 'racConstants','utilMethods', function ($q, $rootScope, $location, racConstants, utilMethods) {
    
    return {
      request: function(config) {
        if($location.path() != "/")
          $rootScope.displaySearchBox = false;
        else
          $rootScope.displaySearchBox = true;
        if(config.method){
          
        }
          
        return config;
      },
      requestError: function(config) {

      },

      response: function(response) {
        
      if(response.status == racConstants.SUCCESS_CODE && angular.isDefined(response.data)) {
        
      }
    
      return response;
      },
      responseError: function(rejection) {
        return $q.reject(rejection);
      }


    }
    
    
  }]);