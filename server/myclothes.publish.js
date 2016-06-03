'use strict'

Meteor.publish('myclothes', function(options, searchString) {
 
 	var where = {
 			'userId': this.userId
 	};

  Counts.publish(this, 'numberOfMyclothes', List.find(where), {noReady: true});
  console.log("SS log: Response from myclothes publish is: ")
  console.log(List.find(where, options).fetch());

  return List.find(where, options);
});

Meteor.methods({
  /*
  * Delete the item from DB
  */
  'removeEntry': function(itemToBeDeleted){
   	 // Make sure the user is logged in before deleting a post
    if (Meteor.userId()) {
      
      if(itemToBeDeleted.userId === Meteor.userId()) {
      	return List.remove({
      		_id: itemToBeDeleted._id
      	});
      } else {
      	throw new Meteor.Error("This user is not authorized to remove this post");
      }
    }  else {
    	throw new Meteor.Error("Not authorized to perform this operation");
    }
  }
});









