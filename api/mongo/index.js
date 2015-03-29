var Q = require('q');
var MongoClient = require('mongodb').MongoClient;

var connectionUrl = process.env.MONGO_CONNECTION_URL ||
    'mongodb://localhost/asanames';

var mongoConnection = Q.ninvoke(MongoClient,
    'connect', connectionUrl)

// All return properties/methods will be promises
module.exports = {
  connection: mongoConnection,
  getTeamData: function() {
    return mongoConnection
    .then(function(db) {
      var collection = db.collection('asanamesTeamData');
      return Q.ninvoke(collection, 'findOne', {});
    });
  },
  storeTeamData: function(teamData) {
    teamData.lastModified = Date.now();
    return mongoConnection
    .then(function(db) {
      var collection = db.collection('asanamesTeamData');
      return Q.ninvoke(collection, 'update', {
      }, teamData,
      {
        upsert: true
      });
    });
  }
};
