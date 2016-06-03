'use strict';

angular.module('meteor101App')
.factory('utilService', ['$http', '$q', function($http, $q) {
  
  // Private API
  var utilSvc = {

  	/*
  	*   getLatLong function to get the latitude and longitude of the given addres
  	*/
  	getLatLong : function(address) {
  	  	var deferObject = deferObject || $q.defer();
  			        
        $http.get("http://maps.googleapis.com/maps/api/geocode/json?address="+address)
				.success(function(response) {
					var respObj = response.results;
					deferObject.resolve(respObj);
				})
				.error(function(response) {
					deferObject.reject(response);
				});

		return deferObject.promise;

  	},

	/*
  	*   getAddress function to convert lat ,long into Address
  	*/
  	getAddress : function(latitude, longitude) {
  		var deferObject = deferObject || $q.defer();
		        
		        $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=true'")
						.success(function(response) {
							var respObj = response.results;
							deferObject.resolve(respObj);
						})
						.error(function(response) {
							deferObject.reject(response);
						});

				return deferObject.promise;
  	}

  };

  return utilSvc;
  
}])

.factory('utilMethods', ['$log', function($log){
	var utilMethods = {
		messageCount : 0,

		/*
		*   Logger function to print console logs every where throughout the Portal
		*/
		log: function(response, isForm){

			if(angular.isObject(response) && isForm){
				$log.info("(LOG + " + this.messageCount++ + ") ");
				angular.forEach(response, function(value, key) {
					$log.info("The key is: "+ key + " and its value is: "+ value);
				})
			} else {
				$log.info("(LOG + " + this.messageCount++ + ") "+ response);
			}

			if(angular.isDefined(response.config))
				$log.info("for url : "+response.config.url);
		}

	}
	return utilMethods;
}])




