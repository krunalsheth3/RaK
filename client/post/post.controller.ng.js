'use strict'

angular.module('meteor101App')

.controller('PostCtrl', ['$scope','$meteor', '$location', 'utilService', function($scope, $meteor, $location, utilService){

  $scope.adObject = {};
  $scope.adObject.country = "India";
  $scope.adObject.adUserEmail = Meteor.user().emails[0].address;

  $scope.max = 1;
  $scope.selectedIndex = 0;
  
  //Subscribe to the DB you wana use
  $scope.$meteorSubscribe('category');

  //Fetch the details of this Collection
  $scope.category = $scope.$meteorCollection(function() {
    return Category.find();
  });

	/*
	*	postNextTab navigates to the postNextTab in the current screen
	*/
	$scope.postNextTab = function() {
		var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
   		$scope.selectedIndex = index;
 	};

	/*
	* clickImage opens camera on the device for clicking an image
	*/
  	$scope.clickImage = function() {
  	    MeteorCameraUI.getPicture(cameraOptions, function (error, data) {
          if (error) {
              console.log('error', error);
            }
            if (data) {
              $('#preview').attr('src', data);	
              $scope.adObject.adPhoto = data;
            }
        });
  	}

	/*
	* uploadImage will open options on the device to upload a new image
	*/
  	$scope.uploadImage  = function() {

  	$('#fileInput').click();
		$('#fileInput').change(function () {
			
			var filesSelected = document.getElementById("fileInput").files;
			if (filesSelected.length > 0)
			{
			    var fileToLoad = filesSelected[0];

			    var fileReader = new FileReader();

			    fileReader.onload = function(fileLoadedEvent) {
			        var srcData = fileLoadedEvent.target.result; // <--- data: base64

			        $('#preview').attr('src', srcData);
			        $scope.adObject.adPhoto = $('#preview').attr('src');
			    };
			    fileReader.readAsDataURL(fileToLoad);
			}
		});
  	}

	
	/*
	* postAdd will submit form and create a new Post
	*/
	$scope.postAd = function() {
		var address = $("#adUserLoc").val();	
		$scope.adObject.adUserAddress = address;
		var getLatLongResp = utilService.getLatLong(address);

		getLatLongResp.then(
		      function(response) {
		         if(angular.isDefined(response) && response.length > 0) {
		         	
		         	var lat = response[0].geometry.location.lat;
	    			var long = response[0].geometry.location.lng;
	    			$scope.adObject.adUserLocation = {
	    			   		"longitude": long,
	    			   		"latitude" : lat
	    			}

	    			/*
	    			* Create a Post in the List table
	    			*/
	    			$meteor.call('createItem',$scope.adObject).then(
	    			    function(data) {
	    			      if(angular.isDefined(data)) {
	    			        $location.path('/postSuccess');	    			        
	    			      }    
	    			    },
	    			   function(err) {
	    			      alert(err.error);
	    			    }
	    			  ); 

		         } else {
		         	alert("Please enter a valid address");
		         }
		         
		      }, 
		      function(response) {
		        alert("Failed to retrieve lat long from getLatLong");
		    });
	}	

	/*
	* getCurrentLocation will get the Users current loc
	*/
  	$scope.getCurrentLocation  = function() {
  		$scope.loading = true;
  		navigator.geolocation.getCurrentPosition(onSuccessLoc, onErrorLoc, gmapOptions);
	}

	/*
	* onSuccessLoc is a success Callback method invoked after getting a location
	*/
	function onSuccessLoc(position){
		
	    var x = position.coords.latitude;
	    var y = position.coords.longitude;

	    $scope.adObject.adUserLat = x;
	    $scope.adObject.adUserLong = y;

	    var getAddressResponse = utilService.getAddress(x, y);

		getAddressResponse.then(
		      function(response) {
		         $scope.loading = false;
		         if(angular.isDefined(response)) {
		         	
		         	$("#adUserLoc").attr("value", response[0].formatted_address);
		         } else {

		         }
		         
		      }, 
		      function(response) {
		        $scope.loading = false;
		    });
	};

/*
* onErrorLoc is a failed callback method incoked after getting a location
*/
	function onErrorLoc(error) {
		$scope.loading = false;
	};
 
	$scope.map = {
	    "center": {
	        "latitude": 52.47491894326404,
	        "longitude": -1.8684210293371217
	    },
	    "zoom": 10
	}; //TODO:  set location based on users current gps location 

	$scope.marker = {
	    id: 0,
	    coords: {
	        latitude: 52.47491894326404,
	        longitude: -1.8684210293371217
	    },
	    options: { draggable: true },
	    events: {
	        dragend: function (marker, eventName, args) {

	            $scope.marker.options = {
	                draggable: true,
	                labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
	                labelAnchor: "100 0",
	                labelClass: "marker-labels"
	            };
	        }
	    }
	};

	var cameraOptions;
 	 var gmapOptions = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	if(Meteor.isCordova) {
		cameraOptions = {
  		  width: 350,
		  height: 350,
		  quality: 75,
		  sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };
	} else {
		cameraOptions = {
  		  width: 350,
		  height: 350,
		  quality: 75
        };
	}

	var events = {
	    places_changed: function (searchBox) {
	        var place = searchBox.getPlaces();
	        if (!place || place == 'undefined' || place.length == 0) {
	            console.log('no place data :(');
	            return;
	        }

	        $scope.map = {
	            "center": {
	                "latitude": place[0].geometry.location.lat(),
	                "longitude": place[0].geometry.location.lng()
	            },
	            "zoom": 18
	        };
	        $scope.marker = {
	            id: 0,
	            coords: {
	                latitude: place[0].geometry.location.lat(),
	                longitude: place[0].geometry.location.lng()
	            }
	        };
	    }
	};

	$scope.searchbox = { template: 'inputZip', events: events };

  
}])

