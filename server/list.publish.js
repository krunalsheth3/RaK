'use strict'

Meteor.publish('list', function(options, searchString) {
  
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
  Counts.publish(this, 'numberOfList', List.find(where), {noReady: true});
  console.log("SS log: options LIMITS ARE  ")
  console.log(options.limit + " Skip is : "+options.skip);
  return List.find(where, options);
  
});


Meteor.methods({

  /*
  * Create a Post in the List table
  */
  'createItem': function(adObject){
      adObject.createdAt = Date.now();
      adObject.name_sort = adObject.adTitle.toLowerCase();

       if (Meteor.userId()) {
        adObject.userId = Meteor.userId();
        
        return List.insert(adObject,
          function(error, insertedItemId) {
            if(error) {
              return new Meteor.Error("Failed to post your offer");
            }
          })
       } else {
        throw new Meteor.Error("Not authorized to perform this operation");
       }
      
  },

  /*
  * Find the entries by Type, eg: saree, jacket
  */
  'findByCategoryType': function(categoryType) {
    if(categoryType){
      var listOfEntries = List.find({
          'adCategory' : categoryType
        });
      return listOfEntries;
    }
  },

  /*
  * Fetch details of the chosen item
  */
  'fetchItemDetails': function(itemId) {
      if(itemId){
        
        console.log("SS log: The response of fetchItemDetails is: " );
        console.log(itemId);

        return List.findOne({
          '_id': itemId
        });  
      }
      
    },
   
   /*
  * Fetch details of the chosen item
  */
  'test': function() {
    
        List._ensureIndex({
          adUserLocation: "2dsphere"
        });

     var itemDetails =   List.find( 
          { adUserLocation :
           { $near :
              {
                $geometry : {
                                 type : "Point" ,
                                coordinates : [ -71.271540 , 42.395295 ]
                              },
                              $maxDistance : 10000
              }
         }
      });

        return itemDetails.fetch();
      }
      
    

});

