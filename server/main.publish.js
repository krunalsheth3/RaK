'use strict'

Meteor.publish('mainList', function(options, searchString) {
  if(!searchString || searchString == null)
    searchString = "";
	
  console.log("SS log: SearchString is: " + searchString);
  var where = {
    $or: [ {
        'adTitle': {
          '$regex': '.*' + (searchString || '') + '.*',
          '$options': 'i'
        }
      }, {
        'adCategory': {
          '$regex': '.*' + (searchString || '') + '.*',
          '$options': 'i'
        }
      }
    ]
    
  };

  Counts.publish(this, 'mainListCount', List.find({}), {noReady: true});
  console.log("SS log: options LIMITS ARE  ")
  console.log(options.limit + " Skip is : "+options.skip);

  return List.find(where, options);
});

