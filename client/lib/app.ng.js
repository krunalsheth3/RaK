angular.module('meteor101App', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination',
  'uiGmapgoogle-maps',
  'ngMaterial',
  'infinite-scroll'
]).value('THROTTLE_MILLISECONDS', 250)



onReady = function() {
  angular.bootstrap(document, ['meteor101App']);
};
  
if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}