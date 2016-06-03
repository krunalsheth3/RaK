'use strict'

Meteor.publish('category', function() {
	var categoryData = 
			Category.find({ 
				$query: {},
				$orderby: {
			 		sex : 1 
				} 
			});

	console.log("SS log: The list of category is :");
	console.log(categoryData.fetch());
	return categoryData;
});

