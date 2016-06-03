// Post = new Mongo.Collection('post');

// Post.allow({
//   insert: function(userId, post) {
//   	post.userId = userId;
//   	post.createdAt = Date.now();
//     post.name_sort = post.adTitle.toLowerCase();
//     return userId;
//   },
//   update: function(userId, post, fields, modifier) {
//     return userId;
//   },
//   remove: function(userId, post) {
//     return userId;
//   }
// });