'use strict'

angular.module('meteor101App')
	
.directive('toolbar', function($meteor, $location, $mdSidenav, $timeout, $rootScope, racConstants) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
    	$scope.showErrorMessage = false;

        $scope.slideMenuItems = [
            {
                link: "/",
                title: 'Home',
                icon: 'home'
            },
            {
                link: "/category",
                title: 'Categories',
                icon: 'dashboard'
            },
            {
                link: "/myclothes",
                title: 'My Clothes',
                icon: 'shopping_basket'
            },
            {
                link: "/contact",
                title: 'Help',
                icon: 'help'
            },
            {
                link: "/terms",
                title: 'Terms & Conditions',
                icon: 'error'
            }
          ];

        //Watching the showSearch variable to setfocus in the search field
        $scope.$watch('showSearch', function(value) {        
        if(value === true) { 
          $timeout(function() {
            $("#globalSearch").focus(); 
          });
        } else {
             $rootScope.globalSearch = "";
        }
      });

        /*
        *   To toggle the slide Nav in and out
        */
        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        /*
        *   Page navigation to the appropriate UI view
        */
        $scope.navigateToPage = function(link) {
            this.toggleSidenav('left');
            $location.path(link);
        }

        /*
        *  Page navigation to Just page
        */
        $scope.navigateToJustPage = function(link) {
            $location.path(link);
        }

        $scope.showLoginForm = function() {
            $("#registerModal").modal('hide');
            // $("#loginModal").modal({backdrop: false});
            $location.path(Session.get('toState'));
        }

    	$scope.submitLoginForm = function(currentUser){
    		// 1. Attempt to login.
    		Meteor.loginWithPassword(currentUser.userName, currentUser.userPassword, function(error) {
    			// 2. Handle the response
    			if(Meteor.user()) {
    				// Redirect the user to where they're loggin into. Here, Router.go uses
    				$("#loginModal").modal('hide');
                    $location.path(Session.get('toState'));
    			} else {
    				 // If no user resulted from the attempt, an error variable will be available
                	// in this callback. We can output the error to the user here.
               		$scope.showErrorMessage = true;
    			}
    		});
    	}

    	$scope.showRegistrationForm = function(newUser){
    		$("#loginModal").modal('hide');
    		$("#registerModal").modal({backdrop: false});
    	}

    	$scope.submitRegistrationForm = function(newUser) {
    		Accounts.createUser({
    			email: newUser.userName,
    			password: newUser.userPassword,
    			profile: 'user'
    		});
    		$("#registerModal").modal('hide');
            $location.path(Session.get('toState'));
    	}
        
    }
  };
});