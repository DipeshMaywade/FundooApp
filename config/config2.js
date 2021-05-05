var MongoDBAdapter = require('mongo-db-instance');
var db = new MongoDBAdapter('mongodb://localhost/database');
db.connect()
  .then(function (uri) {
    console.log('Connected to ' + uri);
    return db.disconnect();
  })
  .then(function (uri) {
    console.log('Disconnected from ' + uri);
  });
