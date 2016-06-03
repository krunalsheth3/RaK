List = new Mongo.Collection('list');

List.deny({
  insert: function(userId, list) {
    return true;
  },
  update: function(userId, list, fields, modifier) {
    return true;
  },
  remove: function(userId, list) {
    return true;
  }
});