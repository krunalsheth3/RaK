Category = new Mongo.Collection('category');

Category.allow({
  insert: function(userId, category) {
    return userId;
  },
  update: function(userId, category, fields, modifier) {
    return userId;
  },
  remove: function(userId, category) {
    return userId;
  }
});